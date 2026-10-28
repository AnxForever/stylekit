import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { describe, expect, it } from "vitest";

type Region = { x: number; y: number; w: number; h: number; score: number };
type Track = Region & { targetX: number; targetY: number; vx?: number; vy?: number; opacity?: number; pending?: Region | null; fadingOut?: boolean };

// Exercise the exact helpers delivered in the standalone HTML, without a
// second algorithm implementation or a browser/canvas mock.
const html = readFileSync(path.resolve(__dirname, "../../../public/experiments/brand-line-cards/index.html"), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)![1];
const source = ts.createSourceFile("study.js", script, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const names = new Set(["splatSignal", "detectRegions", "matchRegions", "advanceRegions", "regionBox"]);
const declarations: string[] = [];
function collect(node: ts.Node) {
  if (ts.isFunctionDeclaration(node) && node.name && names.has(node.name.text)) declarations.push(node.getText(source));
  ts.forEachChild(node, collect);
}
collect(source);
const tracking = vm.runInNewContext(`const GRID = 60;\n${declarations.join("\n")}\n({ ${[...names].join(", ")} });`) as {
  splatSignal: (field: Float32Array, x: number, y: number, value: number) => void;
  detectRegions: (field: Float32Array, previous?: Track[]) => Region[];
  matchRegions: (previous: Track[], candidates: Region[]) => Track[];
  advanceRegions: (regions: Track[], dt: number, animate: boolean) => void;
  regionBox: (region: Track, plotX: number, plotY: number, cell: number) => { x: number; y: number; gridX: number; gridY: number; opacity: number };
};

function fieldWithBlobs(positions: [number, number][]) {
  const field = new Float32Array(3600);
  for (const [x, y] of positions) {
    for (let row = y; row < y + 9; row++) {
      for (let col = x; col < x + 9; col++) field[row * 60 + col] = 1;
    }
  }
  return field;
}

describe("live scan tracking in the standalone brand study", () => {
  it("does not invent detections for an empty field", () => {
    expect(tracking.detectRegions(new Float32Array(3600))).toEqual([]);
  });

  it("deposits a displaced segment into its new cells while preserving its signal", () => {
    const field = new Float32Array(3600);
    tracking.splatSignal(field, 10.25, 12.5, 0.8);
    expect(field[12 * 60 + 10]).toBeCloseTo(0.3);
    expect(field[12 * 60 + 11]).toBeCloseTo(0.1);
    expect(field[13 * 60 + 10]).toBeCloseTo(0.3);
    expect(field[13 * 60 + 11]).toBeCloseTo(0.1);
    expect(field.reduce((sum, value) => sum + value, 0)).toBeCloseTo(0.8);
  });

  it("redetects a moving bright region rather than retaining initialization coordinates", () => {
    const initial = tracking.matchRegions([], tracking.detectRegions(fieldWithBlobs([[10, 10], [35, 10], [22, 36]])));
    expect(initial).toHaveLength(3);
    const moved = tracking.detectRegions(fieldWithBlobs([[15, 15], [35, 10], [22, 36]]), initial);
    const changed = moved.find((region) => region.x < 25 && region.y < 25)!;
    expect(changed.x).toBeGreaterThanOrEqual(14);
    expect(changed.y).toBeGreaterThanOrEqual(14);
    expect(moved.every((region) => region.w === 9 && region.h === 9)).toBe(true);
  });

  it("keeps equally bright stable targets steady instead of randomly wandering", () => {
    const field = fieldWithBlobs([[10, 10], [35, 10], [22, 36]]);
    const previous = [{ x: 11, y: 11, targetX: 11, targetY: 11, w: 9, h: 9, score: 1 }];
    const repeated = tracking.detectRegions(field, previous);
    expect(repeated.some((region) => region.x === 11 && region.y === 11)).toBe(true);
    expect(tracking.detectRegions(field, previous)).toEqual(repeated);
  });

  it("preserves nearby target identity when brightness order changes and smooths its motion", () => {
    const previous = [
      { x: 10, y: 10, targetX: 10, targetY: 10, w: 9, h: 9, score: 1 },
      { x: 35, y: 10, targetX: 35, targetY: 10, w: 9, h: 9, score: 0.9 },
    ];
    const matched = tracking.matchRegions(previous, [
      { x: 36, y: 11, w: 9, h: 9, score: 1 },
      { x: 14, y: 12, w: 9, h: 9, score: 0.9 },
    ]);
    expect(matched[0].targetX).toBe(14);
    expect(matched[1].targetX).toBe(36);
    tracking.advanceRegions(matched, 1 / 60, true);
    expect(matched[0].x).toBeGreaterThan(10);
    expect(matched[0].x).toBeLessThan(14);
    tracking.advanceRegions(matched, 0, false);
    expect(matched[0].x).toBe(14);
    expect(matched[0].y).toBe(12);
  });

  it("fades an unrelated target out before reacquiring in the same slot", () => {
    const matched = tracking.matchRegions([{ x: 4, y: 4, targetX: 4, targetY: 4, w: 9, h: 9, score: 1 }], [{ x: 40, y: 40, w: 9, h: 9, score: 1 }]);
    expect(matched[0].x).toBe(4);
    expect(matched[0].pending?.x).toBe(40);
    let relocated = false;
    for (let index = 0; index < 60; index++) {
      const previousX = matched[0].x;
      tracking.advanceRegions(matched, 1 / 60, true);
      if (matched[0].x !== previousX) {
        relocated = true;
        expect(matched[0].opacity).toBeLessThan(0.04);
      }
    }
    expect(relocated).toBe(true);
    expect(matched[0].x).toBe(40);
    expect(matched[0].opacity).toBeGreaterThan(0.9);
  });

  it("keeps fractional rendered positions instead of rounding away the animation", () => {
    const box = tracking.regionBox({ x: 10.25, y: 12.5, targetX: 11, targetY: 13, w: 9, h: 9, score: 1 }, 29, 84, 5.5);
    expect(box.x).toBeCloseTo(85.375);
    expect(box.y).toBeCloseTo(152.75);
    expect(box.gridX).toBe(10.25);
    expect(box.gridY).toBe(12.5);
  });

  it("settles without overshoot and gives consistent motion at 30, 60 and 120Hz", () => {
    const results = [30, 60, 120].map((fps) => {
      const regions = [{ x: 10, y: 10, targetX: 14, targetY: 12, w: 9, h: 9, score: 1 }];
      let previousX = regions[0].x;
      for (let frame = 0; frame < fps / 2; frame++) {
        tracking.advanceRegions(regions, 1 / fps, true);
        expect(regions[0].x).toBeGreaterThanOrEqual(previousX);
        expect(regions[0].x).toBeLessThanOrEqual(14);
        previousX = regions[0].x;
      }
      return regions[0].x;
    });
    expect(results[0]).toBeCloseTo(results[1], 4);
    expect(results[1]).toBeCloseTo(results[2], 4);
  });
});

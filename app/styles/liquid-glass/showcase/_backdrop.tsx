import { useId } from "react";

export type GlassBackdropScene = "tide" | "ridge" | "grid";

interface GlassBackdropProps {
  scene: GlassBackdropScene;
  className?: string;
}

const tideContours = [
  "M-60 387 C 112 347 196 459 364 421 S 642 365 798 413 1074 483 1260 427",
  "M-60 402 C 108 365 201 475 366 439 S 645 383 801 429 1076 497 1260 443",
  "M-60 417 C 101 381 204 491 368 457 S 647 402 803 445 1079 514 1260 459",
  "M-60 432 C 97 397 210 507 371 474 S 650 420 806 462 1082 529 1260 476",
  "M-60 447 C 96 415 217 524 374 492 S 654 438 810 479 1086 546 1260 491",
  "M-60 462 C 102 433 221 541 378 510 S 659 458 815 497 1089 563 1260 508",
  "M-60 477 C 108 450 231 558 384 528 S 666 478 821 515 1093 580 1260 525",
  "M-60 492 C 113 467 240 575 390 546 S 672 498 827 533 1097 597 1260 542",
  "M-60 507 C 122 483 249 592 396 564 S 678 517 833 552 1102 615 1260 559",
  "M-60 522 C 128 499 257 609 402 581 S 685 537 839 570 1105 631 1260 576",
  "M-60 537 C 136 516 266 625 408 599 S 690 556 845 588 1110 647 1260 592",
  "M-60 552 C 145 532 274 641 414 616 S 697 576 851 605 1115 664 1260 609",
  "M-60 567 C 152 549 284 657 420 634 S 704 596 857 624 1120 680 1260 626",
  "M-60 582 C 162 565 294 674 426 651 S 711 615 864 641 1124 696 1260 643",
  "M-60 597 C 174 582 304 690 434 669 S 720 635 871 660 1128 712 1260 660",
  "M-60 612 C 183 599 316 706 440 686 S 726 655 878 678 1134 728 1260 676",
];

const ridgeContours = [
  "M-70 490 C 114 419 215 438 332 362 S 494 208 626 251 831 437 944 369 1102 223 1270 264",
  "M-70 500 C 114 432 218 450 336 375 S 496 224 628 265 833 448 948 380 1103 237 1270 278",
  "M-70 510 C 114 445 221 463 340 388 S 499 240 630 279 835 460 952 391 1104 251 1270 292",
  "M-70 520 C 114 458 225 476 344 401 S 502 255 632 293 838 471 956 403 1106 265 1270 306",
  "M-70 530 C 114 471 229 488 348 414 S 505 271 634 308 841 482 960 415 1107 279 1270 320",
  "M-70 540 C 114 483 232 500 352 427 S 508 286 636 322 843 494 964 427 1108 293 1270 334",
  "M-70 550 C 114 497 236 514 356 441 S 511 302 638 337 846 505 968 439 1109 307 1270 348",
  "M-70 560 C 114 511 240 528 360 454 S 514 317 641 351 849 516 972 451 1110 321 1270 362",
  "M-70 570 C 114 525 244 542 364 468 S 517 333 643 365 852 527 976 463 1111 335 1270 376",
  "M-70 580 C 114 539 248 555 368 482 S 520 348 645 379 855 539 980 476 1112 349 1270 390",
  "M-70 590 C 114 553 252 569 372 495 S 523 363 647 393 858 550 984 488 1113 363 1270 404",
  "M-70 600 C 114 567 256 582 376 509 S 526 379 649 407 861 561 988 500 1114 377 1270 418",
  "M-70 610 C 114 581 260 596 380 522 S 529 394 651 421 864 572 992 512 1115 391 1270 432",
  "M-70 620 C 114 595 264 609 384 536 S 532 410 653 435 867 583 996 525 1116 405 1270 446",
  "M-70 630 C 114 609 268 623 388 550 S 535 425 655 449 870 594 1000 537 1117 419 1270 460",
  "M-70 640 C 114 623 272 636 392 563 S 538 440 657 463 873 605 1004 549 1118 433 1270 474",
];

function TerrainLines({
  paths,
  stroke,
  opacity,
}: {
  paths: string[];
  stroke: string;
  opacity: number;
}) {
  return paths.map((d, index) => (
    <path
      key={d}
      d={d}
      fill="none"
      stroke={stroke}
      strokeOpacity={opacity + (index % 4) * 0.025}
      strokeWidth={index % 4 === 0 ? 1.35 : 0.85}
      vectorEffect="non-scaling-stroke"
    />
  ));
}

export function GlassBackdrop({ scene, className }: GlassBackdropProps) {
  const rawId = useId();
  const sceneId = `glass-field-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  if (scene === "grid") {
    const gridId = `${sceneId}-grid`;

    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 600"
      >
        <defs>
          <linearGradient id={`${sceneId}-base`} x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#EDF4F6" />
            <stop offset="0.58" stopColor="#D8E8EF" />
            <stop offset="1" stopColor="#C3DCE8" />
          </linearGradient>
          <radialGradient id={`${sceneId}-light`} cx="0" cy="0" r="1" gradientTransform="matrix(940 545 -760 1310 252 80)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <pattern id={gridId} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" stroke="#315F78" strokeOpacity="0.43" strokeWidth="1.2" />
            <path d="M24 0V48M0 24H48" stroke="#315F78" strokeOpacity="0.14" strokeWidth="0.8" />
          </pattern>
          <linearGradient id={`${sceneId}-fade`} x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#EDF4F6" stopOpacity="0.9" />
            <stop offset="0.52" stopColor="#132026" stopOpacity="0" />
            <stop offset="1" stopColor="#B3D1DE" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <path fill={`url(#${sceneId}-base)`} d="M0 0h1200v600H0z" />
        <path fill={`url(#${sceneId}-light)`} d="M0 0h1200v600H0z" />
        <path fill={`url(#${gridId})`} d="M0 0h1200v600H0z" />
        <path fill={`url(#${sceneId}-fade)`} d="M0 0h1200v600H0z" />
      </svg>
    );
  }

  const isRidge = scene === "ridge";
  const surfacePaths = isRidge ? ridgeContours : tideContours;
  const baseId = `${sceneId}-base`;
  const atmosphereId = `${sceneId}-atmosphere`;
  const waterId = `${sceneId}-surface`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 600"
    >
      <defs>
        <linearGradient id={baseId} x1="290" x2="930" y1="0" y2="610" gradientUnits="userSpaceOnUse">
          {isRidge ? (
            <>
              <stop stopColor="#27312F" />
              <stop offset="0.48" stopColor="#69776E" />
              <stop offset="1" stopColor="#A9A08A" />
            </>
          ) : (
            <>
              <stop stopColor="#18262E" />
              <stop offset="0.44" stopColor="#42565A" />
              <stop offset="1" stopColor="#97B8B4" />
            </>
          )}
        </linearGradient>
        <radialGradient id={atmosphereId} cx="0" cy="0" r="1" gradientTransform="matrix(650 310 -500 1049 627 223)" gradientUnits="userSpaceOnUse">
          <stop stopColor={isRidge ? "#D6C7A7" : "#B9D5CF"} stopOpacity="0.26" />
          <stop offset="1" stopColor={isRidge ? "#D6C7A7" : "#B9D5CF"} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={waterId} x1="574" x2="576" y1="270" y2="600" gradientUnits="userSpaceOnUse">
          {isRidge ? (
            <>
              <stop stopColor="#66766E" stopOpacity="0.08" />
              <stop offset="0.45" stopColor="#A99E87" stopOpacity="0.37" />
              <stop offset="1" stopColor="#272F30" stopOpacity="0.3" />
            </>
          ) : (
            <>
              <stop stopColor="#A6C8C5" stopOpacity="0.05" />
              <stop offset="0.42" stopColor="#6C9895" stopOpacity="0.32" />
              <stop offset="1" stopColor="#17272F" stopOpacity="0.24" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`${sceneId}-edge`} x1="0" x2="1200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#091317" stopOpacity="0.36" />
          <stop offset="0.48" stopColor="#091317" stopOpacity="0" />
          <stop offset="1" stopColor="#091317" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path fill={`url(#${baseId})`} d="M0 0h1200v600H0z" />
      <path fill={`url(#${atmosphereId})`} d="M0 0h1200v600H0z" />
      <path
        fill={`url(#${waterId})`}
        d={isRidge
          ? "M-70 430c173-64 286-57 412-126s174-149 305-107 195 171 309 117 165-151 314-116v402H-70z"
          : "M-60 385c171-40 256 73 424 34s338-58 494-6 270 70 402 19v168H-60z"}
      />
      <g>
        <TerrainLines
          paths={surfacePaths}
          stroke={isRidge ? "#F4EBD8" : "#E2F0EB"}
          opacity={isRidge ? 0.19 : 0.22}
        />
      </g>
      <path fill={`url(#${sceneId}-edge)`} d="M0 0h1200v600H0z" />
      <path
        d={isRidge ? "M0 500c180-65 302-42 431-113s173-139 299-108" : "M0 412c180-35 263 82 429 44s320-66 476-20"}
        stroke={isRidge ? "#EFE3C9" : "#D8EAE5"}
        strokeOpacity="0.38"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

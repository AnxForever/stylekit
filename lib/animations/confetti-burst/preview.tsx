"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { loadAnime, prefersReducedMotion, type AnimeAnimation } from "../anime-utils";
import { PreviewContainer } from "../previews/_shared";

const COLORS = ["#ff006e", "#fb5607", "#ffbe0b", "#8338ec", "#3a86ff", "#06d6a0"];
const PARTICLE_COUNT = 26;

interface ActiveParticle {
  animation: AnimeAnimation;
  element: HTMLSpanElement;
}

function createParticle(button: HTMLButtonElement, x: number, y: number, index: number) {
  const particle = document.createElement("span");
  const color = COLORS[index % COLORS.length];
  const isCircle = Math.random() > 0.45;

  particle.dataset.confettiParticle = "true";
  particle.className = "pointer-events-none absolute block will-change-transform";
  Object.assign(particle.style, {
    background: color,
    borderRadius: isCircle ? "50%" : "1px",
    height: "8px",
    left: `${x - 4}px`,
    top: `${y - 4}px`,
    width: "8px",
    zIndex: "10",
  });

  button.appendChild(particle);
  return particle;
}

export function ConfettiBurstPreview() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeParticlesRef = useRef<ActiveParticle[]>([]);

  useEffect(() => {
    return () => {
      activeParticlesRef.current.forEach(({ animation, element }) => {
        animation.cancel();
        element.remove();
      });
      activeParticlesRef.current = [];
    };
  }, []);

  const removeParticle = (particle: HTMLSpanElement) => {
    activeParticlesRef.current = activeParticlesRef.current.filter(
      (entry) => entry.element !== particle
    );
    particle.remove();
  };

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const originX = event.clientX - rect.left;
    const originY = event.clientY - rect.top;

    if (prefersReducedMotion()) return;

    const { animate } = await loadAnime();
    if (buttonRef.current !== button) return;

    animate(button, {
      scale: [0.97, 1],
      duration: 220,
      ease: "out(3)",
    });

    Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const angle = (Math.PI * 2 * index) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
      const velocity = 58 + Math.random() * 90;
      const particle = createParticle(button, originX, originY, index);
      const driftX = Math.cos(angle) * velocity;
      const driftY = Math.sin(angle) * velocity + 104;
      const spin = Math.random() * 720 - 360;

      const animation = animate(particle, {
        x: [0, driftX],
        y: [0, driftY],
        rotate: ["0deg", `${spin}deg`],
        scale: [1, 0.35],
        opacity: [1, 0],
        duration: 1050 + Math.random() * 220,
        delay: index * 5,
        ease: "out(3)",
        onComplete: () => removeParticle(particle),
      });

      activeParticlesRef.current.push({ animation, element: particle });
    });
  };

  return (
    <PreviewContainer bg="light">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="relative overflow-visible px-6 py-3 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors duration-150"
      >
        Click me!
      </button>
    </PreviewContainer>
  );
}

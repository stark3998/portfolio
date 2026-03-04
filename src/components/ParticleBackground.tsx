"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: 22,
          density: { enable: true, width: 1200, height: 800 },
        },
        color: {
          value: ["#0078D4", "#00BCD4", "#512BD4", "#005A9E"],
        },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.08, max: 0.18 },
          animation: {
            enable: true,
            speed: 0.4,
            startValue: "random",
            sync: false,
          },
        },
        size: {
          value: { min: 2, max: 5 },
        },
        links: {
          enable: true,
          distance: 180,
          color: "#0078D4",
          opacity: 0.07,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: {
            distance: 160,
            links: { opacity: 0.25 },
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 z-0"
    />
  );
}

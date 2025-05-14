"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Star field component with parallax effect
export function CosmicBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-[#0c0026] to-black"></div>
      <div className="stars-container absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>
      <div className="nebula-container absolute inset-0 opacity-20">
        <div className="nebula-1 absolute top-[10%] left-[20%] w-[40vw] h-[40vh] rounded-full bg-gradient-to-tr from-purple-900/30 via-indigo-600/20 to-transparent blur-3xl"></div>
        <div className="nebula-2 absolute bottom-[20%] right-[10%] w-[35vw] h-[35vh] rounded-full bg-gradient-to-bl from-indigo-900/30 via-purple-600/20 to-transparent blur-3xl"></div>
      </div>
      <div className="grid-overlay absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-10"></div>
    </div>
  );
}

// Animated constellation component
export function Constellation({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={`${className} opacity-40`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="constellation">
        {/* Stars */}
        <motion.circle
          cx="40"
          cy="30"
          r="1.5"
          fill="#fff"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.circle
          cx="70"
          cy="40"
          r="1.8"
          fill="#fff"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />
        <motion.circle
          cx="100"
          cy="20"
          r="1.2"
          fill="#fff"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <motion.circle
          cx="130"
          cy="50"
          r="1.6"
          fill="#fff"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.7,
          }}
        />
        <motion.circle
          cx="160"
          cy="30"
          r="1.4"
          fill="#fff"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 3.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1.2,
          }}
        />
        <motion.circle
          cx="60"
          cy="70"
          r="1.3"
          fill="#fff"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2.7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.3,
          }}
        />
        <motion.circle
          cx="120"
          cy="80"
          r="1.7"
          fill="#fff"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2.3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.9,
          }}
        />

        {/* Lines connecting stars */}
        <motion.line
          x1="40"
          y1="30"
          x2="70"
          y2="40"
          stroke="#a78bfa"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.line
          x1="70"
          y1="40"
          x2="100"
          y2="20"
          stroke="#a78bfa"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        <motion.line
          x1="100"
          y1="20"
          x2="130"
          y2="50"
          stroke="#a78bfa"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        />
        <motion.line
          x1="130"
          y1="50"
          x2="160"
          y2="30"
          stroke="#a78bfa"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
        <motion.line
          x1="70"
          y1="40"
          x2="60"
          y2="70"
          stroke="#a78bfa"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        <motion.line
          x1="130"
          y1="50"
          x2="120"
          y2="80"
          stroke="#a78bfa"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
      </g>
    </svg>
  );
}

// Animated cosmic orb component
export function CosmicOrb({
  className = "",
  size = 200,
  color = "purple",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  const colorMap = {
    purple: "from-purple-600/30 via-indigo-500/20 to-transparent",
    blue: "from-blue-600/30 via-indigo-500/20 to-transparent",
    pink: "from-pink-600/30 via-purple-500/20 to-transparent",
    teal: "from-teal-600/30 via-blue-500/20 to-transparent",
    amber: "from-amber-600/30 via-orange-500/20 to-transparent",
  };

  const gradientClass =
    colorMap[color as keyof typeof colorMap] || colorMap.purple;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${gradientClass} blur-xl`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-white/10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/50" />
      </motion.div>
    </div>
  );
}

// Animated cosmic ring component
export function CosmicRing({
  className = "",
  size = 200,
  color = "purple",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  const colorMap = {
    purple: "border-purple-500/30",
    blue: "border-blue-500/30",
    pink: "border-pink-500/30",
    teal: "border-teal-500/30",
    amber: "border-amber-500/30",
  };

  const borderClass =
    colorMap[color as keyof typeof colorMap] || colorMap.purple;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        className={`absolute inset-0 rounded-full border-4 ${borderClass} backdrop-blur-sm`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className={`absolute inset-2 rounded-full border-2 ${borderClass} backdrop-blur-sm`}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className={`absolute inset-4 rounded-full border ${borderClass} backdrop-blur-sm`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Animated cosmic beam component
export function CosmicBeam({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-purple-600/0"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Animated zodiac wheel component
export function ZodiacWheel({
  className = "",
  size = 300,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-purple-500/30 backdrop-blur-sm"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {/* Zodiac symbols positioned around the wheel */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 text-purple-300 flex items-center justify-center text-xs"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-${
                size / 2 - 15
              }px) rotate(-${i * 30}deg)`,
              top: "50%",
              left: "50%",
            }}
          >
            {
              [
                "♈",
                "♉",
                "♊",
                "♋",
                "♌",
                "♍",
                "♎",
                "♏",
                "♐",
                "♑",
                "♒",
                "♓",
              ][i]
            }
          </div>
        ))}
      </motion.div>

      {/* Inner rings */}
      <motion.div
        className="absolute inset-8 rounded-full border border-indigo-500/20"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 90,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-16 rounded-full border border-purple-500/10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Center point */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
}

// Animated particle flow
export function ParticleFlow({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = -Math.random() * 0.5 - 0.25;
        this.color = `rgba(${Math.floor(
          Math.random() * 100 + 155
        )}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${
          Math.random() * 0.5 + 0.2
        })`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y < 0) {
          this.y = canvas.offsetHeight;
          this.x = Math.random() * canvas.offsetWidth;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}

// Animated cosmic card with hover effects
export const CosmicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`cosmic-card group relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
      <div className="absolute inset-0 border border-purple-500/20 rounded-xl group-hover:border-purple-500/40 transition-colors duration-300"></div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});
CosmicCard.displayName = "CosmicCard";

// Logo component
export function JyotishGuruLogo({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
        />

        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* Star symbol */}
        <motion.path
          d="M50 15 L55 35 L75 35 L60 45 L65 65 L50 55 L35 65 L40 45 L25 35 L45 35 Z"
          fill="url(#logoGradient)"
          filter="url(#glow)"
          initial={{ opacity: 0.7, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Small stars */}
        <motion.circle
          cx="20"
          cy="20"
          r="2"
          fill="#c084fc"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />
        <motion.circle
          cx="80"
          cy="30"
          r="2"
          fill="#c084fc"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.2,
          }}
        />
        <motion.circle
          cx="75"
          cy="75"
          r="2"
          fill="#c084fc"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.8,
          }}
        />
        <motion.circle
          cx="25"
          cy="70"
          r="2"
          fill="#c084fc"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
}

// Module icon components with unique designs
export function KundliIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="kundliGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        {/* Outer circle */}
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#kundliGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Inner geometric pattern */}
        <motion.path
          d="M25 5 L45 25 L25 45 L5 25 Z"
          fill="none"
          stroke="url(#kundliGradient)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Center star */}
        <motion.path
          d="M25 15 L28 22 L35 22 L30 27 L32 35 L25 30 L18 35 L20 27 L15 22 L22 22 Z"
          fill="url(#kundliGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.svg>
    </div>
  );
}

export function RelationshipIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="relationshipGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>

        {/* Two intertwined hearts */}
        <motion.path
          d="M15 20 Q10 15, 15 10 Q20 5, 25 15 Q30 5, 35 10 Q40 15, 35 20 Q30 25, 25 30 Q20 25, 15 20 Z"
          fill="none"
          stroke="url(#relationshipGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Stars */}
        <motion.circle
          cx="20"
          cy="15"
          r="1.5"
          fill="#f472b6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        />
        <motion.circle
          cx="30"
          cy="15"
          r="1.5"
          fill="#f472b6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />
        <motion.circle
          cx="25"
          cy="25"
          r="1.5"
          fill="#f472b6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1.5,
          }}
        />
      </motion.svg>
    </div>
  );
}

export function CareerIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="careerGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Briefcase outline */}
        <motion.rect
          x="10"
          y="15"
          width="30"
          height="25"
          rx="2"
          fill="none"
          stroke="url(#careerGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Handle */}
        <motion.path
          d="M20 15 L20 10 L30 10 L30 15"
          fill="none"
          stroke="url(#careerGradient)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Growth chart */}
        <motion.path
          d="M15 30 L20 25 L25 28 L35 20"
          fill="none"
          stroke="url(#careerGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />

        {/* Star at peak */}
        <motion.circle
          cx="35"
          cy="20"
          r="2"
          fill="url(#careerGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        />
      </motion.svg>
    </div>
  );
}

export function CompatibilityIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="compatibilityGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Two overlapping circles */}
        <motion.circle
          cx="20"
          cy="25"
          r="15"
          fill="none"
          stroke="url(#compatibilityGradient)"
          strokeWidth="1.5"
          opacity="0.7"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.circle
          cx="30"
          cy="25"
          r="15"
          fill="none"
          stroke="url(#compatibilityGradient)"
          strokeWidth="1.5"
          opacity="0.7"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Connection line */}
        <motion.line
          x1="20"
          y1="25"
          x2="30"
          y2="25"
          stroke="url(#compatibilityGradient)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Stars */}
        <motion.circle
          cx="20"
          cy="25"
          r="2"
          fill="url(#compatibilityGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.circle
          cx="30"
          cy="25"
          r="2"
          fill="url(#compatibilityGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />
      </motion.svg>
    </div>
  );
}

export function BusinessIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="businessGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Building outline */}
        <motion.path
          d="M15 40 L15 15 L35 15 L35 40"
          fill="none"
          stroke="url(#businessGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Base */}
        <motion.line
          x1="10"
          y1="40"
          x2="40"
          y2="40"
          stroke="url(#businessGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Windows */}
        <motion.rect
          x="20"
          y="20"
          width="5"
          height="5"
          fill="url(#businessGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.rect
          x="20"
          y="30"
          width="5"
          height="5"
          fill="url(#businessGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        <motion.rect
          x="30"
          y="20"
          width="5"
          height="5"
          fill="url(#businessGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        />
        <motion.rect
          x="30"
          y="30"
          width="5"
          height="5"
          fill="url(#businessGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        />

        {/* Growth arrow */}
        <motion.path
          d="M40 30 L40 20 L30 20"
          fill="none"
          stroke="url(#businessGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        />
      </motion.svg>
    </div>
  );
}

export function GemstoneIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="gemstoneGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="gemGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Diamond shape */}
        <motion.path
          d="M25 10 L40 25 L25 40 L10 25 Z"
          fill="none"
          stroke="url(#gemstoneGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Inner facets */}
        <motion.path
          d="M25 10 L25 40 M10 25 L40 25"
          fill="none"
          stroke="url(#gemstoneGradient)"
          strokeWidth="1"
          opacity="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Center glow */}
        <motion.circle
          cx="25"
          cy="25"
          r="5"
          fill="url(#gemstoneGradient)"
          filter="url(#gemGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Sparkles */}
        <motion.path
          d="M25 15 L27 17 L25 19 L23 17 Z"
          fill="#c4b5fd"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.2,
          }}
        />
        <motion.path
          d="M35 25 L37 27 L35 29 L33 27 Z"
          fill="#c4b5fd"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.7,
          }}
        />
        <motion.path
          d="M25 35 L27 37 L25 39 L23 37 Z"
          fill="#c4b5fd"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1.2,
          }}
        />
        <motion.path
          d="M15 25 L17 27 L15 29 L13 27 Z"
          fill="#c4b5fd"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1.7,
          }}
        />
      </motion.svg>
    </div>
  );
}

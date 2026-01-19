import { motion } from "framer-motion";
import { useState } from "react";

interface ProgramLogo3DProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgramLogo3D({ src, alt, size = "md", className = "" }: ProgramLogo3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-scef-gold/40 to-scef-blue/40 blur-xl"
        animate={{
          opacity: isHovered ? 0.8 : 0.3,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Shadow layer */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-black/20"
        animate={{
          translateY: isHovered ? 8 : 4,
          translateX: isHovered ? 4 : 2,
          scale: 0.95,
        }}
        style={{ filter: "blur(8px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Main logo with 3D effect */}
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden border-2 border-scef-gold/50 shadow-lg"
        animate={{
          rotateX: isHovered ? -10 : 0,
          rotateY: isHovered ? 15 : 0,
          translateZ: isHovered ? 20 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none z-10"
          animate={{
            opacity: isHovered ? 1 : 0,
            translateX: isHovered ? "100%" : "-100%",
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Logo image */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />

        {/* Ambient light reflection */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
          animate={{
            opacity: isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Floating particles effect */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-scef-gold"
              initial={{
                opacity: 0,
                x: "50%",
                y: "50%",
              }}
              animate={{
                opacity: [0, 1, 0],
                x: `${50 + (i - 1) * 30}%`,
                y: `${-20 - i * 15}%`,
              }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

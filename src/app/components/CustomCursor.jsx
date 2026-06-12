"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    // Default cursor is kept VISIBLE so all your window drags and clicks work perfectly.

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (mousePosition.x === -100) return null;

  return (
    <>
      {/* Main solid blue dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#0ea5e9] rounded-full pointer-events-none z-[9999]"
        style={{
          transform: "translate(-50%, -50%)"
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0
        }}
      />
      
      {/* Outer hollow blue circle (delayed/spring) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#0ea5e9] rounded-full pointer-events-none z-[9998]"
        style={{
          transform: "translate(-50%, -50%)"
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(14, 165, 233, 0.1)" : "rgba(14, 165, 233, 0)",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
    </>
  );
}

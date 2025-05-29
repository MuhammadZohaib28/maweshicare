"use client";
import { motion } from "framer-motion";

export default function TechBubble({ tech, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${tech.color} px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all cursor-default`}
    >
      {tech.name}
    </motion.div>
  );
}

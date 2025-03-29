import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="/favicon.ico"
        alt="Loading..."
        className="w-16 h-16"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.8 } }}
        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.5 } }}
      />
    </motion.div>
  );
};

export default Loading;
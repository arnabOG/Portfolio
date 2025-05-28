import { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "arnab9221234@gmail.com";
  const time = useMotionValue(0);
  
  // RGB border animation with faster transition
  const borderColor = useTransform(time, [0, 1, 2, 3, 4, 5], [
    "rgb(51, 194, 204)", // aqua
    "rgb(87, 219, 150)", // mint
    "rgb(92, 51, 204)",  // royal
    "rgb(122, 87, 219)", // lavender
    "rgb(202, 47, 140)", // fuchsia
    "rgb(51, 194, 204)", // back to aqua
  ]);
  
  // Add glow effect that matches border color
  const glowColor = useTransform(time, [0, 1, 2, 3, 4, 5], [
    "rgba(51, 194, 204, 0.3)", // aqua
    "rgba(87, 219, 150, 0.3)", // mint
    "rgba(92, 51, 204, 0.3)",  // royal
    "rgba(122, 87, 219, 0.3)", // lavender
    "rgba(202, 47, 140, 0.3)", // fuchsia
    "rgba(51, 194, 204, 0.3)", // back to aqua
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      time.set((time.get() + 0.02) % 5);
    }, 20);
    return () => clearInterval(interval);
  }, [time]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative px-1 py-4 text-sm text-center rounded-full font-medium bg-primary/90 w-[12rem] cursor-pointer overflow-hidden backdrop-blur-sm"
      style={{
        boxShadow: `0 0 15px ${glowColor.get()}, 0 0 5px rgba(0,0,0,0.3)`,
        border: "2px solid",
        borderColor
      }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <img src="assets/copy-done.svg" className="w-5" alt="copy icon" />
            <span className="bg-gradient-to-r from-aqua to-mint bg-clip-text text-transparent">
              Email Copied!
            </span>
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <img src="assets/copy.svg" className="w-5" alt="copy icon" />
            <span>Copy Email Address</span>
          </motion.p>
        )}
      </AnimatePresence>
      
      {/* Add subtle background pulse effect */}
      <motion.div 
        className="absolute inset-0 rounded-full -z-10"
        animate={{ 
          boxShadow: [
            `inset 0 0 15px ${glowColor.get()}`,
            `inset 0 0 10px ${glowColor.get()}`,
            `inset 0 0 15px ${glowColor.get()}`
          ]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2
        }}
      />
    </motion.button>
  );
};

export default CopyEmailButton;
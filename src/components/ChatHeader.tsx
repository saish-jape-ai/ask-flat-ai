import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export const ChatHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10 backdrop-blur-sm bg-card/95"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-semibold text-lg text-foreground">RentMatch AI</h1>
          <p className="text-xs text-muted-foreground">Your intelligent property assistant</p>
        </div>
      </div>
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { Sparkles, Search, Home, MessageSquare } from "lucide-react";

export const WelcomeMessage = () => {
  const suggestions = [
    { icon: Home, text: "2BHK in Baner under ₹20k" },
    { icon: Search, text: "Show furnished flats in Kothrud" },
    { icon: MessageSquare, text: "3BHK near Hinjewadi" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center px-6 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg"
      >
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="text-2xl font-bold text-foreground mb-2">
        Find Your Perfect Home
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Ask in natural language and get the best matching properties instantly
      </p>

      <div className="space-y-3 w-full max-w-sm">
        <p className="text-sm text-muted-foreground font-medium mb-3">Try asking:</p>
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <suggestion.icon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-foreground text-left">{suggestion.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

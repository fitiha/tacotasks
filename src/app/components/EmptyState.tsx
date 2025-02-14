"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRunning } from "react-icons/fa";

// Dynamically importing the Lottie Player with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface EmptyStateProps {
  variant?: "default" | "search" | "archived";
  searchTerm?: string;
}

export default function EmptyState({
  variant = "default",
  searchTerm = "",
}: EmptyStateProps) {
  const animations = {
    default: "/lottie/no-task.json",
    search: "/lottie/no-search.json",
    archived: "/lottie/no-archieve.json",
  };

  const messages = {
    default: {
      title: "No Tasks Found",
      description: "Let's get started by creating your first task!",
      icon: <RocketIcon className="h-6 w-6" />,
      action: "Create New Task",
    },
    search: {
      title: "No Matching Tasks",
      description: searchTerm
        ? `No results for "${searchTerm}"`
        : "Try searching for something else",
      icon: <FaMagnifyingGlass className="h-6 w-6" />,
      action: "Clear Search",
    },
    archived: {
      title: "No Archived Tasks",
      description: "Tasks you archive will appear here",
      icon: <FaRunning className="h-6 w-6" />,
      action: "View Active Tasks",
    },
  };

  const current = messages[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-12 gap-6 text-center"
    >
      {/* Dynamically imported Player component */}
      <Player autoplay loop src={animations[variant]} className="h-64 w-64" />

      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight dark:text-gray-200">
          {current.title}
        </h3>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          {current.description}
        </p>
      </div>

      <Button
        onClick={() => {
          if (variant === "search") {
            // Dispatch clear search event
            document.dispatchEvent(new Event("clearSearch"));
          } else if (variant === "archived") {
            // Dispatch view active events
            document.dispatchEvent(new Event("viewActive"));
          } else {
            // Dispatch add task event
            document.dispatchEvent(new Event("addTask"));
          }
        }}
        className="gap-2 dark:text-gray-400"
        variant={"outline"}
      >
        {current.icon}
        {current.action}
      </Button>
    </motion.div>
  );
}
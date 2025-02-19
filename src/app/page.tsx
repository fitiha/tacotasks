"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import FloatingAddButton from "./components/FloatingAddButton";
import AddTaskModal from "./components/AddTaskModal";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import ProgressGraph from "./components/ProgressGraph";
import Confetti from "./components/Confetti";
import ParticleBackground from "./components/ParticleBackground";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import DeveloperInfoModal from "./components/DeveloperInfoModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  color: string;
  archived: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<
    "all" | "active" | "completed" | "archived"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDeveloperInfoOpen, setIsDeveloperInfoOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setIsDarkMode(storedTheme === "dark");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  const addTask = (task: Omit<Task, "id" | "completed" | "archived">) => {
    setTasks([
      ...tasks,
      { ...task, id: Date.now().toString(), completed: false, archived: false },
    ]);
  };

  //event listeners for empty state dispatching clicks
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClearSearch = () => setSearchTerm("");
      const handleAddTask = () => setIsAddModalOpen(true);
      const handleViewActive = () => setFilter("active");

      document.addEventListener("clearSearch", handleClearSearch);
      document.addEventListener("addTask", handleAddTask);
      document.addEventListener("viewActive", handleViewActive);

      return () => {
        document.removeEventListener("clearSearch", handleClearSearch);
        document.removeEventListener("addTask", handleAddTask);
        document.removeEventListener("viewActive", handleViewActive);
      };
    }
  }, []);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed;
          if (newCompleted) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
  };

  const removeTask = (id: string) => {
    setTaskToDelete(id);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const editTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const archiveTask = (id: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, archived: true } : task))
    );
  };

  const restoreTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, archived: false } : task
      )
    );
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const draggedTask = tasks[dragIndex];
    const updatedTasks = [...tasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed && !task.archived;
      if (filter === "completed") return task.completed && !task.archived;
      if (filter === "archived") return task.archived;
      return !task.archived;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } flex flex-col items-center px-4 py-8 relative z-10`}
      >
        <ParticleBackground isDarkMode={isDarkMode} />
        {showConfetti && <Confetti />}
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl mb-4`}
        >
          <div className="flex justify-between items-center mb-6">
            <Image
              src={isDarkMode ? "/taco-dark.svg" : "/taco-light.svg"}
              alt="logo"
              width={95}
              height={83}
              className="rounded-xl"
              priority
            />
            <div className="flex items-center space-x-4">
              <ThemeToggle
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsDeveloperInfoOpen(true)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <InfoIcon className="w-6 h-6" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Developer Info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterButtons filter={filter} setFilter={setFilter} />
          <ProgressGraph tasks={tasks} />
        </div>
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl overflow-y-auto`}
          style={{ maxHeight: "calc(100vh - 250px)" }}
        >
          <AnimatePresence>
            <TaskList
              tasks={filteredTasks.map((task) => ({
                ...task,
                originalIndex: tasks.findIndex((t) => t.id === task.id),
              }))}
              onToggleTask={toggleTask}
              onRemoveTask={removeTask}
              onEditTask={setEditingTask}
              onArchiveTask={archiveTask}
              onRestoreTask={restoreTask}
              moveTask={moveTask}
              filter={filter}
              searchTerm={searchTerm}
            />
          </AnimatePresence>
        </div>
        <FloatingAddButton onClick={() => setIsAddModalOpen(true)} />
        <AddTaskModal
          isOpen={isAddModalOpen || !!editingTask}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingTask(null);
          }}
          onAddTask={addTask}
          editingTask={editingTask}
          onEditTask={editTask}
        />

        <DeveloperInfoModal
          isOpen={isDeveloperInfoOpen}
          onClose={() => setIsDeveloperInfoOpen(false)}
        />

        <DeleteConfirmationModal
          isOpen={!!taskToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </motion.div>
    </DndProvider>
  );
}

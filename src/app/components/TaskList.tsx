"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useDrag, useDrop } from "react-dnd";
import { FiCheck } from "react-icons/fi";
import { LuUndo2 } from "react-icons/lu";
import { IoArchiveSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmptyState from "./EmptyState";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  color: string;
  archived: boolean;
  originalIndex: number;  
}

interface TaskItemProps {
  task: Task;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  onToggleTask: (id: string) => void;
  onRemoveTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onArchiveTask: (id: string) => void;
  onRestoreTask: (id: string) => void;
}

const TaskItem = ({
  task,
  moveTask,
  onToggleTask,
  onRemoveTask,
  onEditTask,
  onArchiveTask,
  onRestoreTask,
}: TaskItemProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<{ index: number }, unknown, { handlerId: string | null }>({
    accept: "TASK",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId() as string | null,
    }),
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = task.originalIndex;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: () => ({ index: task.originalIndex }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <motion.li
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center justify-between p-3 rounded-lg ${task.color} bg-opacity-20 dark:bg-opacity-40 cursor-move mb-2`}
    >
      <div className="flex items-center flex-grow mr-2 min-w-0">
        <button
          onClick={() => onToggleTask(task.id)}
          className={`w-5 h-5 mr-3 rounded-full border-2 flex items-center justify-center ${
            task.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-400 dark:border-gray-300"
          }`}
        >
          {task.completed && <FiCheck className="text-white" />}
        </button>
        {/* Changed this div */}
        <div className="flex flex-col min-w-0 overflow-hidden">
          <span
            className={`truncate ${
              task.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {task.title}
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {task.description}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        {/* Edit Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEditTask(task)}
              className="text-blue-500 hover:text-blue-700 focus:outline-none dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaEdit className="w-5 h-5" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        {/* Archive/Restore Button */}
        {task.archived ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRestoreTask(task.id)}
                className="text-green-500 hover:text-green-700 focus:outline-none dark:text-green-400 dark:hover:text-green-300"
              >
                <LuUndo2 className="w-5 h-5" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Restore</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onArchiveTask(task.id)}
                className="text-yellow-500 hover:text-yellow-700 focus:outline-none dark:text-yellow-400 dark:hover:text-yellow-300"
              >
                <IoArchiveSharp className="w-5 h-5" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Archive</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Delete Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemoveTask(task.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none dark:text-red-400 dark:hover:text-red-300"
            >
              <MdDelete className="w-5 h-5" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </motion.li>
  );
};

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onRemoveTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onArchiveTask: (id: string) => void;
  onRestoreTask: (id: string) => void;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
}

export default function TaskList({
  tasks,
  onToggleTask,
  onRemoveTask,
  onEditTask,
  onArchiveTask,
  onRestoreTask,
  moveTask,
  filter,
  searchTerm,
}: TaskListProps & { filter: string; searchTerm: string }) {
  const renderTask = useCallback(
    (task: Task, index: number) => {
      return (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          onToggleTask={onToggleTask}
          onRemoveTask={onRemoveTask}
          onEditTask={onEditTask}
          onArchiveTask={onArchiveTask}
          onRestoreTask={onRestoreTask}
        />
      );
    },
    [
      onToggleTask,
      onRemoveTask,
      onEditTask,
      onArchiveTask,
      onRestoreTask,
      moveTask,
    ]
  );

  const getEmptyStateVariant = () => {
    if (filter === "archived") return "archived";
    if (searchTerm) return "search";
    return "default";
  };

  return (
    <TooltipProvider>
      <ul className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task, index) => renderTask(task, index))
        ) : (
          <EmptyState
            variant={getEmptyStateVariant()}
            searchTerm={searchTerm}
          />
        )}
      </ul>
    </TooltipProvider>
  );
}

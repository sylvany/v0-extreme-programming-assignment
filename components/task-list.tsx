"use client"

import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { format, isPast, isToday, addDays, isWithinInterval } from "date-fns"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  // Sort tasks by priority (high > medium > low) and then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const priorityDiff =
      priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]

    if (priorityDiff !== 0) return priorityDiff

    // If same priority, sort by due date (tasks with due dates come first)
    if (!a.dueDate && b.dueDate) return 1
    if (a.dueDate && !b.dueDate) return -1
    if (!a.dueDate && !b.dueDate) return 0

    return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
  })

  if (sortedTasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
          <CheckCircle className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-gray-500">No tasks found</p>
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "to-do":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "done":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Personal":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "Study":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Health":
        return "bg-green-100 text-green-800 border-green-200"
      case "Finance":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "Home":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDueDateStatus = (dueDate: string | null) => {
    if (!dueDate) return null

    const date = new Date(dueDate)
    const today = new Date()

    if (isPast(date) && !isToday(date)) {
      return { color: "text-red-600", label: "Overdue", icon: <AlertTriangle className="h-3 w-3" /> }
    }
    if (isToday(date)) {
      return { color: "text-orange-600", label: "Due today", icon: <Clock className="h-3 w-3" /> }
    }
    if (isWithinInterval(date, { start: today, end: addDays(today, 2) })) {
      return { color: "text-yellow-600", label: format(date, "MMM d, yyyy"), icon: <Calendar className="h-3 w-3" /> }
    }
    return { color: "text-gray-600", label: format(date, "MMM d, yyyy"), icon: <Calendar className="h-3 w-3" /> }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="task-list">
      {sortedTasks.map((task) => {
        const dueDateStatus = task.dueDate ? getDueDateStatus(task.dueDate) : null

        return (
          <Card
            key={task.id}
            className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md border-0 card-gradient"
          >
            <CardHeader className="pb-2 relative">
              {task.priority === "high" && (
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-red-400"></div>
              )}
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-lg" data-testid={`task-title-${task.id}`}>
                  {task.title}
                </h3>
              </div>
              <div className="badge-container">
                <Badge
                  variant="outline"
                  className={`${getPriorityColor(task.priority)} border`}
                  data-testid={`task-priority-${task.id}`}
                >
                  {task.priority}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(task.status)} border`}
                  data-testid={`task-status-${task.id}`}
                >
                  {task.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${getCategoryColor(task.category)} border`}
                  data-testid={`task-category-${task.id}`}
                >
                  {task.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="py-2 flex-grow">
              <p className="text-gray-600 whitespace-pre-wrap" data-testid={`task-description-${task.id}`}>
                {task.description || "No description provided"}
              </p>

              {dueDateStatus && (
                <div className={`flex items-center gap-1 mt-3 ${dueDateStatus.color} text-sm`}>
                  {dueDateStatus.icon}
                  {dueDateStatus.label}
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2 flex justify-end gap-2 border-t border-gray-100">
              <Button
                size="sm"
                variant="outline"
                className="button-secondary"
                onClick={() => {
                  onEdit(task)
                  // Scroll to top of page for mobile users
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                data-testid={`edit-task-${task.id}`}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50 bg-white"
                onClick={() => onDelete(task.id)}
                data-testid={`delete-task-${task.id}`}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

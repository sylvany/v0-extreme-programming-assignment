"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/custom-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface TaskFormProps {
  onSubmit: (task: Task) => void
  initialData: Task | null
  onCancel: () => void
}

// Predefined categories
const categories = ["Work", "Personal", "Study", "Health", "Finance", "Home", "Other"]

export default function TaskForm({ onSubmit, initialData, onCancel }: TaskFormProps) {
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    priority: "medium",
    status: "to-do",
    category: "Work",
    dueDate: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  // Update form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setTask(initialData)
    } else {
      setTask({
        id: "",
        title: "",
        description: "",
        priority: "medium",
        status: "to-do",
        category: "Work",
        dueDate: null,
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setTask((prev) => ({
      ...prev,
      dueDate: date ? date.toISOString() : null,
    }))
    // Close the date picker after selection
    setDatePickerOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!task.title.trim()) {
      alert("Please enter a task title")
      return
    }

    setIsSubmitting(true)

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      onSubmit(task)
      setIsSubmitting(false)

      // Only show success and reset if not editing
      if (!initialData) {
        setShowSuccess(true)

        // Reset form if not editing
        setTask({
          id: "",
          title: "",
          description: "",
          priority: "medium",
          status: "to-do",
          category: "Work",
          dueDate: null,
        })

        // Hide success message after 2 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 2000)
      }
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showSuccess && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center mb-4 animate-in fade-in slide-in-from-top-5 duration-300">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Task added successfully!
        </div>
      )}

      <div>
        <Label htmlFor="title" className="block text-sm font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
          data-testid="task-title-input"
          className="bg-white"
        />
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows={3}
          data-testid="task-description-input"
          className="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </Label>
          <Select value={task.category} onValueChange={(value) => handleSelectChange("category", value)}>
            <SelectTrigger id="category" data-testid="task-category-select" className="bg-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priority" className="block text-sm font-medium mb-1">
            Priority
          </Label>
          <Select value={task.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
            <SelectTrigger id="priority" data-testid="task-priority-select" className="bg-white">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </Label>
          <Select value={task.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger id="status" data-testid="task-status-select" className="bg-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="to-do">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dueDate" className="block text-sm font-medium mb-1">
            Due Date
          </Label>
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white",
                  !task.dueDate && "text-muted-foreground",
                )}
                id="dueDate"
                data-testid="task-duedate-select"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {task.dueDate ? format(new Date(task.dueDate), "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={task.dueDate ? new Date(task.dueDate) : undefined}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" data-testid="task-submit-button" disabled={isSubmitting} className="button-primary">
          {isSubmitting ? "Saving..." : initialData ? "Update Task" : "Add Task"}
        </Button>
        {initialData && (
          <Button type="button" variant="outline" onClick={onCancel} className="button-secondary">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TaskForm from "./task-form"
import type { Task } from "@/types/task"
import { Edit } from "lucide-react"

interface TaskEditDialogProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (task: Task) => void
}

export default function TaskEditDialog({ task, open, onOpenChange, onUpdate }: TaskEditDialogProps) {
  const handleUpdate = (updatedTask: Task) => {
    onUpdate(updatedTask)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-purple-50 to-blue-50 border-0 rounded-lg">
        <DialogHeader>
          <DialogTitle className="section-title">
            <Edit className="section-icon" />
            Edit Task
          </DialogTitle>
        </DialogHeader>
        {task && <TaskForm onSubmit={handleUpdate} initialData={task} onCancel={handleCancel} />}
      </DialogContent>
    </Dialog>
  )
}

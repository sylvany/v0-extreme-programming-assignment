"use client"

import { useEffect, useState } from "react"
import TaskForm from "@/components/task-form"
import TaskList from "@/components/task-list"
import TaskEditDialog from "@/components/task-edit-dialog"
import SearchInput from "@/components/search-input"
import type { Task } from "@/types/task"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { isPast, isToday, addDays } from "date-fns"
import { CheckCircle2, Clock, ListTodo, AlertCircle, SearchIcon, CalendarIcon, TagIcon } from "lucide-react"

// Predefined categories
const categories = ["All", "Work", "Personal", "Study", "Health", "Finance", "Home", "Other"]

// Sample tasks for first-time users
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the TaskEasy project proposal for the client meeting",
    priority: "high",
    status: "in-progress",
    category: "Work",
    dueDate: addDays(new Date(), 2).toISOString(),
  },
  {
    id: "2",
    title: "Go for a run",
    description: "30 minute jog in the park",
    priority: "medium",
    status: "to-do",
    category: "Health",
    dueDate: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and vegetables",
    priority: "low",
    status: "to-do",
    category: "Home",
    dueDate: addDays(new Date(), 1).toISOString(),
  },
  {
    id: "4",
    title: "Read chapter 5",
    description: "Complete reading assignment for class",
    priority: "medium",
    status: "done",
    category: "Study",
    dueDate: addDays(new Date(), -1).toISOString(),
  },
  {
    id: "5",
    title: "Pay utility bills",
    description: "Electricity and water bills due this week",
    priority: "high",
    status: "to-do",
    category: "Finance",
    dueDate: addDays(new Date(), 3).toISOString(),
  },
  {
    id: "6",
    title: "Call mom",
    description: "Weekly check-in call",
    priority: "medium",
    status: "done",
    category: "Personal",
    dueDate: addDays(new Date(), -2).toISOString(),
  },
]

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      // Add sample tasks for first-time users
      setTasks(sampleTasks)
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now().toString() }])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
  }

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const startEditing = (task: Task) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  // Search function to filter tasks based on query
  const searchTasks = (allTasks: Task[]) => {
    if (!searchQuery.trim()) return allTasks

    const query = searchQuery.toLowerCase()
    return allTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query) ||
        task.status.toLowerCase().includes(query),
    )
  }

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === "to-do")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const doneTasks = tasks.filter((task) => task.status === "done")

  // Filter tasks by category
  const categoryFilteredTasks =
    selectedCategory === "All" ? tasks : tasks.filter((task) => task.category === selectedCategory)

  // Apply search filter on top of category filter
  const filteredTasks = searchTasks(categoryFilteredTasks)

  // Apply both category and search filters to status-specific tasks
  const filteredTodoTasks = searchTasks(
    selectedCategory === "All" ? todoTasks : todoTasks.filter((task) => task.category === selectedCategory),
  )

  const filteredInProgressTasks = searchTasks(
    selectedCategory === "All" ? inProgressTasks : inProgressTasks.filter((task) => task.category === selectedCategory),
  )

  const filteredDoneTasks = searchTasks(
    selectedCategory === "All" ? doneTasks : doneTasks.filter((task) => task.category === selectedCategory),
  )

  // Calculate overdue tasks
  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== "done" && task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)),
  )

  // Apply filters to overdue tasks
  const filteredOverdueTasks = searchTasks(
    overdueTasks.filter((task) => selectedCategory === "All" || task.category === selectedCategory),
  )

  // Calculate due today tasks
  const dueTodayTasks = tasks.filter(
    (task) => task.status !== "done" && task.dueDate && isToday(new Date(task.dueDate)),
  )

  // Apply filters to due today tasks
  const filteredDueTodayTasks = searchTasks(
    dueTodayTasks.filter((task) => selectedCategory === "All" || task.category === selectedCategory),
  )

  return (
    <main className="container mx-auto p-4 max-w-5xl">
      <div className="flex flex-col items-center mb-8 animate-float">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          TaskEasy
        </h1>
        <p className="text-gray-600 mb-6 text-center">Simple Task Management for Teams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card-container">
          <h2 className="section-title">
            <ListTodo className="section-icon" />
            Add New Task
          </h2>
          <TaskForm onSubmit={addTask} initialData={null} onCancel={() => {}} />
        </div>

        <div className="card-container">
          <h2 className="section-title">
            <CheckCircle2 className="section-icon" />
            Task Overview
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Card className="status-todo border-0 shadow-sm overflow-hidden">
              <CardContent className="p-4 flex items-center">
                <ListTodo className="h-8 w-8 mr-3 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">To Do</div>
                  <div className="text-2xl font-bold text-blue-600">{todoTasks.length}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="status-progress border-0 shadow-sm overflow-hidden">
              <CardContent className="p-4 flex items-center">
                <Clock className="h-8 w-8 mr-3 text-purple-600" />
                <div>
                  <div className="text-sm text-gray-500">In Progress</div>
                  <div className="text-2xl font-bold text-purple-600">{inProgressTasks.length}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="status-done border-0 shadow-sm overflow-hidden">
              <CardContent className="p-4 flex items-center">
                <CheckCircle2 className="h-8 w-8 mr-3 text-green-600" />
                <div>
                  <div className="text-sm text-gray-500">Completed</div>
                  <div className="text-2xl font-bold text-green-600">{doneTasks.length}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="status-overdue border-0 shadow-sm overflow-hidden">
              <CardContent className="p-4 flex items-center">
                <AlertCircle className="h-8 w-8 mr-3 text-red-600" />
                <div>
                  <div className="text-sm text-gray-500">Overdue</div>
                  <div className="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="card-container mb-8">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="section-title">
              <ListTodo className="section-icon" />
              Tasks
            </h2>

            <div className="flex items-center gap-2">
              <TagIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Filter by category:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] bg-white">
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
          </div>

          {/* Search bar */}
          <div className="w-full">
            <SearchInput onSearch={setSearchQuery} placeholder="Search by title, description, category..." />
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <SearchIcon className="h-3 w-3 mr-1" />
                {filteredTasks.length === 0
                  ? "No tasks found matching your search."
                  : `Found ${filteredTasks.length} task${filteredTasks.length === 1 ? "" : "s"} matching "${searchQuery}"`}
              </div>
            )}
          </div>
        </div>

        {filteredOverdueTasks.length > 0 && (
          <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-100">
            <Badge variant="outline" className="text-red-600 mb-2 flex items-center gap-1 bg-white">
              <AlertCircle className="h-3 w-3" />
              Overdue Tasks
            </Badge>
            <TaskList tasks={filteredOverdueTasks} onEdit={startEditing} onDelete={deleteTask} />
          </div>
        )}

        {filteredDueTodayTasks.length > 0 && (
          <div className="mb-6 bg-orange-50 p-4 rounded-lg border border-orange-100">
            <Badge variant="outline" className="text-orange-600 mb-2 flex items-center gap-1 bg-white">
              <CalendarIcon className="h-3 w-3" />
              Due Today
            </Badge>
            <TaskList tasks={filteredDueTodayTasks} onEdit={startEditing} onDelete={deleteTask} />
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 bg-white/50 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-white">
              All Tasks
            </TabsTrigger>
            <TabsTrigger value="to-do" className="data-[state=active]:bg-white">
              To Do
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-white">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="done" className="data-[state=active]:bg-white">
              Done
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <TaskList tasks={filteredTasks} onEdit={startEditing} onDelete={deleteTask} />
          </TabsContent>

          <TabsContent value="to-do">
            <TaskList tasks={filteredTodoTasks} onEdit={startEditing} onDelete={deleteTask} />
          </TabsContent>

          <TabsContent value="in-progress">
            <TaskList tasks={filteredInProgressTasks} onEdit={startEditing} onDelete={deleteTask} />
          </TabsContent>

          <TabsContent value="done">
            <TaskList tasks={filteredDoneTasks} onEdit={startEditing} onDelete={deleteTask} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Task Dialog */}
      <TaskEditDialog task={editingTask} open={dialogOpen} onOpenChange={setDialogOpen} onUpdate={updateTask} />
    </main>
  )
}

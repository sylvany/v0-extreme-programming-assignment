import { render, screen, fireEvent } from "@testing-library/react"
import TaskList from "@/components/task-list"
import type { Task } from "@/types/task"

// Mock functions
const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()

// Test data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "High Priority Task",
    description: "This is important",
    priority: "high",
    status: "to-do",
    category: "Work",
    dueDate: "2023-12-31T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Medium Priority Task",
    description: "This is somewhat important",
    priority: "medium",
    status: "in-progress",
    category: "Personal",
    dueDate: null,
  },
  {
    id: "3",
    title: "Low Priority Task",
    description: "This can wait",
    priority: "low",
    status: "done",
    category: "Study",
    dueDate: "2024-01-15T00:00:00.000Z",
  },
]

describe("TaskList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders tasks sorted by priority", () => {
    render(<TaskList tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    // Get all task titles
    const taskTitles = screen.getAllByTestId(/task-title-/)

    // Check if tasks are sorted by priority (high > medium > low)
    expect(taskTitles[0]).toHaveTextContent("High Priority Task")
    expect(taskTitles[1]).toHaveTextContent("Medium Priority Task")
    expect(taskTitles[2]).toHaveTextContent("Low Priority Task")
  })

  test('displays "No tasks found" when tasks array is empty', () => {
    render(<TaskList tasks={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    expect(screen.getByText("No tasks found")).toBeInTheDocument()
  })

  test("calls onEdit when edit button is clicked", () => {
    render(<TaskList tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    // Click the edit button for the first task
    fireEvent.click(screen.getByTestId("edit-task-1"))

    // Check if onEdit was called with the correct task
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0])
  })

  test("calls onDelete when delete button is clicked", () => {
    render(<TaskList tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    // Click the delete button for the first task
    fireEvent.click(screen.getByTestId("delete-task-1"))

    // Check if onDelete was called with the correct task id
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith("1")
  })

  test("displays task details correctly including category", () => {
    render(<TaskList tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    // Check if task details are displayed correctly
    expect(screen.getByTestId("task-title-1")).toHaveTextContent("High Priority Task")
    expect(screen.getByTestId("task-description-1")).toHaveTextContent("This is important")
    expect(screen.getByTestId("task-priority-1")).toHaveTextContent("high")
    expect(screen.getByTestId("task-status-1")).toHaveTextContent("to-do")
    expect(screen.getByTestId("task-category-1")).toHaveTextContent("Work")
  })
})

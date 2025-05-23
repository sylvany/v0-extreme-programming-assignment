import { render, screen, fireEvent } from "@testing-library/react"
import TaskEditDialog from "@/components/task-edit-dialog"
import type { Task } from "@/types/task"

// Mock functions
const mockOnUpdate = jest.fn()
const mockOnOpenChange = jest.fn()

// Test data
const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  priority: "high",
  status: "to-do",
  category: "Work",
  dueDate: "2023-12-31T00:00:00.000Z",
}

describe("TaskEditDialog Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders dialog with task data when open", () => {
    render(<TaskEditDialog task={mockTask} open={true} onOpenChange={mockOnOpenChange} onUpdate={mockOnUpdate} />)

    // Check if dialog title is rendered
    expect(screen.getByText("Edit Task")).toBeInTheDocument()

    // Check if form is populated with task data
    expect(screen.getByTestId("task-title-input")).toHaveValue("Test Task")
    expect(screen.getByTestId("task-description-input")).toHaveValue("Test Description")
  })

  test("does not render dialog content when closed", () => {
    render(<TaskEditDialog task={mockTask} open={false} onOpenChange={mockOnOpenChange} onUpdate={mockOnUpdate} />)

    // Dialog content should not be in the document
    expect(screen.queryByText("Edit Task")).not.toBeInTheDocument()
  })

  test("calls onUpdate with updated task data when form is submitted", () => {
    render(<TaskEditDialog task={mockTask} open={true} onOpenChange={mockOnOpenChange} onUpdate={mockOnUpdate} />)

    // Update the task title
    fireEvent.change(screen.getByTestId("task-title-input"), {
      target: { value: "Updated Task Title" },
    })

    // Submit the form
    fireEvent.submit(screen.getByTestId("task-submit-button"))

    // Check if onUpdate was called with updated data
    expect(mockOnUpdate).toHaveBeenCalledTimes(1)
    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        title: "Updated Task Title",
        description: "Test Description",
        priority: "high",
        status: "to-do",
        category: "Work",
      }),
    )

    // Check if dialog was closed
    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  test("calls onOpenChange when cancel button is clicked", () => {
    render(<TaskEditDialog task={mockTask} open={true} onOpenChange={mockOnOpenChange} onUpdate={mockOnUpdate} />)

    // Click the cancel button
    fireEvent.click(screen.getByText("Cancel"))

    // Check if dialog was closed
    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })
})

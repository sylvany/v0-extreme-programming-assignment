"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import TaskForm from "@/components/task-form"
import type { Task } from "@/types/task"

// Mock functions
const mockOnSubmit = jest.fn()
const mockOnCancel = jest.fn()

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

describe("TaskForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders empty form when no initial data is provided", () => {
    render(<TaskForm onSubmit={mockOnSubmit} initialData={null} onCancel={mockOnCancel} />)

    // Check if form elements are rendered with default values
    expect(screen.getByTestId("task-title-input")).toHaveValue("")
    expect(screen.getByTestId("task-description-input")).toHaveValue("")
    expect(screen.getByTestId("task-submit-button")).toHaveTextContent("Add Task")
  })

  test("renders form with initial data when editing a task", () => {
    render(<TaskForm onSubmit={mockOnSubmit} initialData={mockTask} onCancel={mockOnCancel} />)

    // Check if form elements are rendered with initial values
    expect(screen.getByTestId("task-title-input")).toHaveValue("Test Task")
    expect(screen.getByTestId("task-description-input")).toHaveValue("Test Description")
    expect(screen.getByTestId("task-submit-button")).toHaveTextContent("Update Task")
  })

  test("calls onSubmit with form data when form is submitted", () => {
    render(<TaskForm onSubmit={mockOnSubmit} initialData={null} onCancel={mockOnCancel} />)

    // Fill out the form
    fireEvent.change(screen.getByTestId("task-title-input"), { target: { value: "New Task" } })
    fireEvent.change(screen.getByTestId("task-description-input"), { target: { value: "New Description" } })

    // Submit the form
    fireEvent.submit(screen.getByTestId("task-submit-button"))

    // Check if onSubmit was called with the correct data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Task",
        description: "New Description",
        priority: "medium",
        status: "to-do",
        category: "Work",
        dueDate: null,
      }),
    )
  })

  test("calls onCancel when cancel button is clicked", () => {
    render(<TaskForm onSubmit={mockOnSubmit} initialData={mockTask} onCancel={mockOnCancel} />)

    // Click the cancel button
    fireEvent.click(screen.getByText("Cancel"))

    // Check if onCancel was called
    expect(mockOnCancel).toHaveBeenCalledTimes(1)
  })

  test("validates that title is required", () => {
    // Mock window.alert
    const alertMock = jest.spyOn(window, "alert").mockImplementation()

    render(<TaskForm onSubmit={mockOnSubmit} initialData={null} onCancel={mockOnCancel} />)

    // Submit form without title
    fireEvent.submit(screen.getByTestId("task-submit-button"))

    // Check if validation works
    expect(alertMock).toHaveBeenCalledWith("Please enter a task title")
    expect(mockOnSubmit).not.toHaveBeenCalled()

    // Restore mock
    alertMock.mockRestore()
  })
})

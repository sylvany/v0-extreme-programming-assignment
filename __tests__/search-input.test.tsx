import { render, screen, fireEvent, act } from "@testing-library/react"
import SearchInput from "@/components/search-input"

describe("SearchInput Component", () => {
  const mockOnSearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test("renders search input with default placeholder", () => {
    render(<SearchInput onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText("Search tasks...")
    expect(searchInput).toBeInTheDocument()
  })

  test("renders search input with custom placeholder", () => {
    render(<SearchInput onSearch={mockOnSearch} placeholder="Custom placeholder" />)

    const searchInput = screen.getByPlaceholderText("Custom placeholder")
    expect(searchInput).toBeInTheDocument()
  })

  test("calls onSearch with debounce when typing", () => {
    render(<SearchInput onSearch={mockOnSearch} />)

    const searchInput = screen.getByTestId("search-input")
    fireEvent.change(searchInput, { target: { value: "test query" } })

    // onSearch should not be called immediately due to debounce
    expect(mockOnSearch).not.toHaveBeenCalled()

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Now onSearch should be called
    expect(mockOnSearch).toHaveBeenCalledWith("test query")
  })

  test("clears search when clear button is clicked", () => {
    render(<SearchInput onSearch={mockOnSearch} />)

    const searchInput = screen.getByTestId("search-input")

    // Type something
    fireEvent.change(searchInput, { target: { value: "test query" } })

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Clear button should appear
    const clearButton = screen.getByLabelText("Clear search")
    fireEvent.click(clearButton)

    // Input should be cleared
    expect(searchInput).toHaveValue("")

    // Fast-forward timers again
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // onSearch should be called with empty string
    expect(mockOnSearch).toHaveBeenCalledWith("")
  })
})

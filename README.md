# TaskEasy - Task Management Application

A lightweight task management web application built using Extreme Programming (XP) practices.

## Features

### Core Task Management
- Create tasks with title, description, priority, and status
- View tasks sorted by priority
- Update and delete tasks
- Filter tasks by status (To-Do, In Progress, Done)

### Enhanced Features
- **Task Categories**: Organize tasks by categories (Work, Personal, Study, Health, Finance, Home, Other)
- **Due Dates**: Set and track deadlines for tasks
- **Task Distribution Visualization**: Visual charts showing the distribution of tasks by status and category
- **Task Statistics**: Quick overview of task counts by status
- **Overdue & Due Today Highlights**: Special sections for time-sensitive tasks
- **Mobile-Optimized Interface**: Responsive design with modal editing for better mobile experience
- **Search Functionality**: Quickly find tasks by searching through titles, descriptions, categories, and more

### Data Management
- Local storage persistence to save tasks between sessions

## Extreme Programming Practices Implemented

### 1. Pair Programming
The codebase is structured to facilitate pair programming:
- Clear component separation with well-defined responsibilities
- Consistent coding style and patterns
- Descriptive variable and function names
- Comprehensive comments explaining complex logic

### 2. Test-Driven Development (TDD)
The application includes comprehensive tests:
- Unit tests for components using Jest and React Testing Library
- Tests written before implementing features
- Test coverage for critical functionality

### 3. Continuous Integration
The project includes CI configuration:
- GitHub Actions workflow for automated testing
- Linting checks to maintain code quality
- Automated test runs on each commit

### 4. Small Releases
The application is built with incremental development in mind:
- Core functionality implemented first
- Features added incrementally
- Each feature is self-contained and testable

### 5. Refactoring
The codebase demonstrates clean code principles:
- DRY (Don't Repeat Yourself) principles applied
- Common functionality extracted into reusable hooks and utilities
- Clear separation of concerns
- Consistent naming conventions

### 6. Customer Collaboration
The application is designed with user feedback in mind:
- Intuitive UI that requires minimal training
- Clear visual indicators for task status and priority
- Helpful feedback messages
- Responsive design for all devices

### 7. Planning Game
The development process followed a planning approach:
- User stories broken down into manageable tasks
- Features prioritized based on user needs
- Estimates for implementation effort
- Iterative development cycle

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

Run tests with: `npm test`

## Built With

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- Jest and React Testing Library for testing

## Project Structure

\`\`\`
task-easy/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main application page
├── components/           # React components
│   ├── search-input.tsx  # Search functionality
│   ├── task-edit-dialog.tsx # Task editing modal
│   ├── task-form.tsx     # Task creation/editing form
│   └── task-list.tsx     # Task list display
├── types/                # TypeScript type definitions
│   └── task.ts           # Task interface
├── __tests__/            # Test files
│   ├── task-form.test.tsx
│   ├── task-list.test.tsx
│   ├── search-input.test.tsx
│   └── task-edit-dialog.test.tsx
├── .github/workflows/    # CI configuration
│   └── ci.yml            # GitHub Actions workflow
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup
└── README.md             # Project documentation

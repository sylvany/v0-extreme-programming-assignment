# 🚀 TaskEasy - Task Management Application

A **lightweight** and **responsive** task management web application built with **Extreme Programming (XP)** practices and modern web technologies.

---

## ✨ Features

### 📝 Core Task Management

* Create tasks with **title**, **description**, **priority**, and **status**
* View tasks **sorted by priority**
* **Update** and **delete** tasks
* **Filter** tasks by status: `To-Do`, `In Progress`, `Done`

### 🛠️ Enhanced Functionality

* **Task Categories**: Organize tasks (Work, Personal, Study, Health, Finance, Home, Other)
* **Due Dates**: Set and track task deadlines
* **Visual Charts**: View task distribution by status and category with interactive charts
* **Task Statistics**: Quick overview of tasks per status
* **Overdue & Due Today**: Highlights for time-sensitive tasks
* **Search Functionality**: Find tasks by keyword (title, description, category, etc.)
* **Mobile Optimized**: Responsive design with modal editing for small screens

### 💾 Data Management

* **LocalStorage Persistence**: Tasks remain saved across sessions

---

## 🧪 Extreme Programming Practices

### 👯 1. Pair Programming

* Component separation for collaborative development
* Descriptive naming & clean structure
* Detailed comments for complex logic

### 🧪 2. Test-Driven Development (TDD)

* Unit tests using **Jest** and **React Testing Library**
* Tests written **before** feature implementation
* High test coverage on core features

### 🔁 3. Continuous Integration

* **GitHub Actions** for:

  * Automated test execution
  * Linting checks
  * Quality enforcement on every commit

### 🚀 4. Small Releases

* Incremental feature rollout
* Each feature is independently testable and deployable

### 🔧 5. Refactoring

* **DRY principles** and reusable hooks
* Clear separation of concerns
* Clean, readable, and consistent code

### 🤝 6. Customer Collaboration

* Minimal learning curve
* Visual cues for task status and urgency
* Mobile-first design with intuitive feedback

### 📅 7. Planning Game

* Features based on user stories
* Estimations & prioritization for implementation
* Agile, iterative development approach

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/sylvany/v0-extreme-programming-assignment

# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

Run tests using:

```bash
npm test
```

---

## 🛠️ Built With

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [Recharts](https://recharts.org/)
* [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

---

## 📁 Project Structure

```
task-easy/
├── app/                     # Next.js app directory
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/              # UI components
│   ├── search-input.tsx     
│   ├── task-edit-dialog.tsx 
│   ├── task-form.tsx        
│   └── task-list.tsx        
├── types/                   # Type definitions
│   └── task.ts              
├── __tests__/               # Test files
│   ├── task-form.test.tsx
│   ├── task-list.test.tsx
│   ├── search-input.test.tsx
│   └── task-edit-dialog.test.tsx
├── .github/workflows/       # CI configs
│   └── ci.yml               
├── jest.config.js           
├── jest.setup.js            
└── README.md                
```

---

## 👨‍💻 Meet Our Team

We are **Team 4 Developers** committed to delivering clean, user-focused software through XP practices.

| Name             | Student ID |
| ---------------- | ---------- |
| Silvani Chayadi  | 231112945  |
| Cindy Nathania   | 231111567  |
| Gloria Apriyanti | 231111304  |

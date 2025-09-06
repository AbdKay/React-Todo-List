# React Todo List (Hooks + localStorage)

A modern Todo List application built with **React functional components** and **hooks**. It supports task creation, inline editing, completion toggling, deletion, **filtering** (All / Active / Completed), **priority levels** (Low / Medium / High), **due dates**, and seamless **persistence to localStorage**. The UI uses responsive **flex/grid** layouts and accessible controls.

https://github.com/ (create your own repo and push)

## ✨ Features
- React functional components with hooks (`useState`, `useEffect`, `useMemo`)
- Reusable components: `TodoForm`, `TodoList`, `TodoItem`
- Persist tasks to `localStorage` automatically
- Filters: **All / Active / Completed**
- Priority levels: **Low / Medium / High** (color‑coded badges)
- Due dates with **overdue highlighting**
- Inline editing with Save/Cancel
- Clear Completed
- Modern, responsive CSS (flex/grid)

## 🗂 Project Structure
```
react-todo-list/
├─ index.html
├─ package.json
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles.css
│  └─ components/
│     ├─ TodoForm.jsx
│     ├─ TodoList.jsx
│     └─ TodoItem.jsx
└─ README.md
```

## 🚀 Getting Started
> Requires Node.js 18+ (Node 20+ recommended) and npm

```bash
# 1) Install dependencies
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview production build
npm run preview
```

## 🚀 Live Demo
👉 [Try it here](https://react-todo-list-pbff.vercel.app/)

## 🧠 How It Works
- **State** of the todo list lives in `App.jsx` using `useState`.
- **Persistence**: `useEffect` loads from `localStorage` on first render and saves whenever `todos` change.
- **Filtering** happens in a `useMemo` based on the `filter` state.
- **Editing** is handled in `TodoItem` with a temporary draft state; saving calls up to `App` via `onEdit`.

## 🧩 Components
- **`TodoForm`**: Controlled inputs for task title, priority, and due date; on submit calls `onAdd`.
- **`TodoList`**: Renders a list of `TodoItem`s or an empty state.
- **`TodoItem`**: Checkbox, title, priority badge, due date, overdue flag, Edit/Delete. Inline edit UI with Save/Cancel.

## 🖌 Styling
- Single CSS file (`styles.css`) with CSS variables, subtle gradients, and rounded cards.
- Responsive grid for the form (3 columns → 1 column on narrow screens).
- Accessible labels and focus styles.

## 🛡️ Type Safety / Linting (optional)
To add ESLint & Prettier quickly:
```bash
npm i -D eslint prettier eslint-plugin-react eslint-config-prettier
```

## 📦 Export / Import Data (tips)
- Since tasks are stored in `localStorage`, you can export them by copying the JSON from DevTools:
  - `localStorage.getItem('react-todo-list:v1')`
- To import, `localStorage.setItem('react-todo-list:v1', '<your-json>')`

## 📝 License
MIT

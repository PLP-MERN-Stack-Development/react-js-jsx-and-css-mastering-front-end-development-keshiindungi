import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskManager from './components/TaskManager';
import ApiData from './components/ApiData';

// Home component with counter
const HomeWithCounter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">PLP Task Manager</h1>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg mb-4">
            Edit{' '}
            <code className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">
              src/App.jsx
            </code>{' '}
            and save to test HMR
          </p>

          <div className="flex items-center gap-4 my-4">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              -
            </button>
            <span className="text-xl font-bold">{count}</span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// App Content with theme
const AppContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <Layout onThemeToggle={toggleTheme} isDarkMode={isDarkMode}>
        <Routes>
          <Route path="/" element={<HomeWithCounter />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/api-data" element={<ApiData />} />
        </Routes>
      </Layout>
    </Router>
  );
};

// Main App
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
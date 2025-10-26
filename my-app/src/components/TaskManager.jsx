import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../context/ThemeContext';
import Card from './Card';
import Button from './Button';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const { isDarkMode } = useTheme();

  // Load initial tasks
  useEffect(() => {
    if (tasks.length === 0) {
      setTasks([
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build Task Manager', completed: false },
        { id: 3, text: 'Style with Tailwind CSS', completed: false }
      ]);
    }
  }, [tasks.length, setTasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask.trim(), 
        completed: false,
        createdAt: new Date().toISOString()
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active': return !task.completed;
      case 'completed': return task.completed;
      default: return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="text-center">
        <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your tasks efficiently
        </p>
      </Card>

      {/* Add Task Form */}
      <Card>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} disabled={!newTask.trim()}>
            Add Task
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="small"
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'outline'}
            size="small"
            onClick={() => setFilter('active')}
          >
            Active ({stats.active})
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'outline'}
            size="small"
            onClick={() => setFilter('completed')}
          >
            Completed ({stats.completed})
          </Button>
        </div>

        {stats.completed > 0 && (
          <div className="flex justify-end">
            <Button variant="danger" size="small" onClick={clearCompleted}>
              Clear Completed
            </Button>
          </div>
        )}
      </Card>

      {/* Tasks List */}
      <Card>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
              {filter === 'all' ? 'No tasks yet!' : `No ${filter} tasks`}
            </h3>
            <p className="text-gray-400 dark:text-gray-500">
              {filter === 'all' ? 'Add your first task above!' : 'Try changing the filter'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  task.completed 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                />
                <span
                  className={`flex-1 text-lg ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TaskManager;
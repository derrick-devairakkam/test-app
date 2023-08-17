import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let temp = [];
    fetch('/api/tasks')
    .then((data) => data.json())
    .then((data) => {
      data.forEach((e) => {
        temp.push({id: e._id, text: e.taskName});
      })
      setTodos(temp);
    });
  }, []);

  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const id = todoId;
    const taskName = newValue.text;

    fetch('/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, taskName })
    })
    
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = async (id) => {

    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
      
    })
    
    const removedArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removedArr);
  };

  // const completeTodo = id => {
  //   let updatedTodos = todos.map(todo => {
  //     if (todo.id === id) {
  //       todo.isComplete = !todo.isComplete;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        // completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
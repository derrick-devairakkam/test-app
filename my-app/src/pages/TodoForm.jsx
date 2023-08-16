import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.vaalue : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = element => {
        setInput(element.target.value);
    };

/** try {
 * const response = await fetch('/api/tasks', {
 * method: 'POST',
 * HEADERS: {
 *  'Content-Type': 'application/json'
 * },
 * body: JSON.stringify(formData)
 * });
 * 
 * const data = await response.json();
 * 
 * if (resonpse.ok) {
 * 
 * setInput({
 *  })}
 * }
 */
    const handleSubmit = element => {
        element.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {props.edit ? (
                <>
                    <input
                        placeholder='Please update your item'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmit} className='todo-button edit'>
                        Update 
                    </button>
                </>
            ) : (
                <>
                <input
                    placeholder='Add a task'
                    value={input}
                    onChange={handleChange}
                    name='text'
                    className='todo-input'
                    ref={inputRef}
                />
                <button onClick={handleSubmit} className='todo-button'>
                    Add todo
                </button>
            </>
            )}
        </form>
    );
};

export default TodoForm;
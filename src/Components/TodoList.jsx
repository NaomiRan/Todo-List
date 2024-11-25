import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos,setTodos]=useState([]); // state to store the list of todos with their heading and lists
  const [headingInput,setHeadingInput] = useState(''); // state to store the current input for a new headings
  const [listInputs, setListInputs] = useState({}); // state to store inputs for adding lists to a specific heading

   // Adds a new heading to the todos list if the input is not empty
  const handleAddTodo=()=>{
    if (headingInput.trim() !==0){
        setTodos([...todos,{heading:headingInput, lists:[]}]);
        setHeadingInput('');
    }
  };
  
  // Adds a new list item to a specific heading by its index
  const handleAddList = (index) => {
    if (listInputs[index] && listInputs[index].trim() !== '') {
      const newTodos = [...todos];
      newTodos[index].lists.push(listInputs[index]);
      setTodos(newTodos);
      setListInputs({ ...listInputs, [index]: '' });
    }
  };

  // Updates the input field for adding a list to a specific heading
  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value });
  };
  
  // Deletes a heading and its associated lists by its index
  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>

           {/* Input field and button to add a new heading */}
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => { setHeadingInput(e.target.value); }} // Add onChange event to update the heading
             
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button> 
        </div>
      </div>

 {/* Main container for displaying all todos */}
      <div className="todo_main">
        
        {todos.map((todo, index) => (
          <div key={index} className='todo-card'>
            <div className='heading_todo'>
              <h3>{todo.heading}</h3>
              <button className='delete-button-heading' onClick={() => {
                handleDeleteTodo(index)
              }}>Delete Heading</button> 

            </div>
          
 {/* Display the lists under the heading */}
            <ul>
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex} className='todo-inside-list' >
                  <p>{list}</p>
                </li>
              ))}
             
            </ul>

             {/* Input field and button to add a new list under the heading */}
            <div className='add_list'>
              <input
                type="text"
                className='list-input'
                placeholder='Add list'
                value={listInputs[index] || ''}
                onChange={(e) => handleListInputChange(index, e.target.value)}
              />
              <button className='add-list-button' onClick={() => { handleAddList(index) }}> Add List</button>
 
            </div>
          </div>
     
        ))}; 
      </div>
    </>
  );
};

export default TodoList;

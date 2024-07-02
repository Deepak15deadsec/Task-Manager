import React, { useState } from 'react';
import './styles.css'; // Assuming you have a CSS file for styling

function App() {
    const [todos, setTodos] = useState([{
        task: "",
        priority: "",
        assignTo: "",
        checkList: [{ isChecked: false, value: "" }],
        dueDate: "",
        currentStatus: 'Todo',
    }]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newTodos = [...todos];
        newTodos[index][name] = value;
        setTodos(newTodos);
    };

    const handleCheckListChange = (todoIndex, checkIndex, event) => {
        const { name, value, checked, type } = event.target;
        const newTodos = [...todos];
        if (type === "checkbox") {
            newTodos[todoIndex].checkList[checkIndex].isChecked = checked;
        } else {
            newTodos[todoIndex].checkList[checkIndex].value = value;
        }
        setTodos(newTodos);
    };

    const addCheckListItem = (index) => {
        const newTodos = [...todos];
        newTodos[index].checkList.push({ isChecked: false, value: "" });
        setTodos(newTodos);
    };

    return (
        <div className="App">
            {todos.map((todo, todoIndex) => (
                <div key={todoIndex} className="todo">
                    <input
                        type="text"
                        name="task"
                        value={todo.task}
                        onChange={(event) => handleInputChange(todoIndex, event)}
                        placeholder="Task"
                    />
                    <input
                        type="text"
                        name="priority"
                        value={todo.priority}
                        onChange={(event) => handleInputChange(todoIndex, event)}
                        placeholder="Priority"
                    />
                    <input
                        type="text"
                        name="assignTo"
                        value={todo.assignTo}
                        onChange={(event) => handleInputChange(todoIndex, event)}
                        placeholder="Assign To"
                    />
                    <input
                        type="date"
                        name="dueDate"
                        value={todo.dueDate}
                        onChange={(event) => handleInputChange(todoIndex, event)}
                    />
                    <div>
                        {todo.checkList.map((check, checkIndex) => (
                            <div key={checkIndex} className="checkList">
                                <input
                                    type="checkbox"
                                    name="isChecked"
                                    checked={check.isChecked}
                                    onChange={(event) => handleCheckListChange(todoIndex, checkIndex, event)}
                                    style={{ marginLeft: '10px' }}
                                />
                                <input
                                    type="text"
                                    name="value"
                                    value={check.value}
                                    onChange={(event) => handleCheckListChange(todoIndex, checkIndex, event)}
                                    placeholder="Task to be done"
                                    className="TaskInput"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={() => addCheckListItem(todoIndex)}>Add Checklist Item</button>
                    </div>
                    <input
                        type="text"
                        name="currentStatus"
                        value={todo.currentStatus}
                        onChange={(event) => handleInputChange(todoIndex, event)}
                        placeholder="Current Status"
                    />
                </div>
            ))}
        </div>
    );
}

export default App;

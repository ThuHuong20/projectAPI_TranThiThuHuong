import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Content() {
    const [inputValue, setInputValue] = useState("");
    const [inputTime, setInputTime] = useState("");
    const [results, setResults] = useState();
    const [isAdd, setIsAdd] = useState(false);
    const [isReminder, setIsReminder] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/results")
            .then(response => {
                setResults(response.data)
            })
    }, [])

    const handleSubmit = (inputValue, inputTime, isReminder) => {
        axios.post("http://localhost:3000/results", {
            "task": inputValue,
            "date": inputTime,
            "isReminder": isReminder
        })
            .then(response => {
                setResults([...results, response.data])
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleDelete = (id) => {
        axios.delete("http://localhost:3000/results/" + id)
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    alert("Deleted Successfully")
                    setResults(results.filter(result => result.id !== id))
                } else {
                    alert("Failed to delete");
                }
            })
    }
    return (
        <>
            <div className='tracker'>
                <h1>Task Tracker</h1>
                {!isAdd ? (<button className='close' onClick={() => setIsAdd(!isAdd)}>Close</button>) : (<button className='add' onClick={() => setIsAdd(!isAdd)}>Add</button>)}
            </div>
            {!isAdd ? (<form className="App">
                <div className='container-input'>
                    <div className='task'>
                        <p>Task</p>
                        <input type='text' placeholder='Add Task'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                    <div className='day-time'>
                        <p>Day & Time</p>
                        <input type='text' placeholder='Add Day & Time'
                            value={inputTime}
                            onChange={(e) => setInputTime(e.target.value)}
                        />
                    </div>
                    <div className='set-reminder'>
                        <p>Set Reminder</p>
                        <input type='checkbox' checked={isReminder} onChange={() => setIsReminder(!isReminder)} />
                    </div>
                    <div className='save-task'>
                        <button type="submit" onClick={() => {
                            if (inputValue !== "" && inputTime !== "") {
                                handleSubmit(inputValue, inputTime, isReminder)
                            } else {
                                alert("Please fill all the fields")
                            }
                        }}>Save Task</button>
                    </div>
                </div>
            </form>) : (<div></div>)}
            {results?.length > 0 ? (<div className='listTask'  >
                {results?.map((item) => (
                    <div
                        style={item.isReminder ? { borderLeft: "5px solid green" } : {}}
                        className='taskItem'
                    >
                        <div style={{ width: "90%" }}>
                            <h3>{item.task}</h3>
                            <p>{item.date}</p>
                        </div>
                        <button className='delete' onClick={() => handleDelete(item.id)}>X</button>
                    </div>
                ))}
            </div>) : (<b style={{ marginLeft: "20px" }}>No Tasks To Show</b>)}
            <div className='footer'>
                <p>MiniProject API & Asynchronous @ 2023</p>
                <Link to='/about'>About</Link>
            </div>

        </>

    )
}

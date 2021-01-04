import React, {Fragment, useState, useEffect} from 'react'

const ListTodo=()=>{
    const [todos,setTodos] = useState([])
    const getTodos = async () =>{
        try{
            const response = await fetch("http://localhost:5000/")
            const jsonData = await response.json()
            setTodos(jsonData)
        }catch(err){
            console.error(err)
        }
    }
    const deleteTodo =(id)=>{
        try{
            const response = fetch(`http://localhost:5000/${id}`,{
                method:"DELETE",
            })
            setTodos(todos.filter(todo=>todo.id!==id))
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        getTodos()
    },[])


    return(
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
                        <th scope="col">description</th>
                        <th scope="col">edit</th>
                        <th scope="col">delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo,id)=>(
                     <tr key={todo.id}>
                        <th scope="row">{id+1}</th>
                        <td>{todo.name}</td>
                        <td>{todo.description}</td>
                        <td><button className="btn btn-red">edit</button></td>
                        <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.id)}>delete</button></td>

                    </tr>   
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}
export default ListTodo; 

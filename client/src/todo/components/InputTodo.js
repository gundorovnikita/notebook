import React, {Fragment, useState} from "react"

export default function InputTodo(){
    const [description, setDescription] = useState("")
    const [name,setName] = useState("")
    const onSubmitForm = e =>{
        e.preventDefault()
        console.log('click')
        try{
            const body = {name,description}
            setName("")
            setDescription("")
            const response = fetch("http://localhost:5000/posts",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })

        }catch(err){
            console.error(err.message)
        }
    }

    return(
        <Fragment>
            <h1 className="text-center mt-5">Input todo</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} />
                <input type="text" className="form-control" value={description} onChange={e=>setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
     )
}

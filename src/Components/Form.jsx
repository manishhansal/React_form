import React from "react";
import '../App.css';

const Form = () => {

    const [form, setForm] = React.useState({
        name : "",
        age : "",
        address : "",
        department : "",
        salary : "",
        marital_state : false
    });
    const [data, setData] = React.useState([]);
    console.log(data)

    React.useEffect( () => {
        getData();
    }, []);

    const handleChange = (e) => {

        const {id, value, checked, type} = e.target; //ES6 object destructuring.
        // console.log(id, value, checked, type);

        setForm({
            ...form,
            [id]: type === "checkbox" ? checked : value
        })
    }

    const {name, age, address, department, salary, marital_state } = form;

    const getData = () => {
        fetch (`http://localhost:3007/myData`)
            .then((res) => res.json())
            .then((res) => {
                // console.log(res)
                setData(res);
            })
            .catch((res) => console.log(res))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(form);

        const payloadjson = JSON.stringify(form);

        fetch(`http://localhost:3007/myData`, {
            method: "POST",
            body: payloadjson,
            headers: {
                "content-type" : "application/json"
            }
        }).then((res) => {
            // console.log(res)
            // console.log(res.data)
            // getData();
        })
        .catch((err) => console.log(err))
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Fill The Form</h1>
                <input 
                    id="name" 
                    type="text" 
                    placeholder="Enter Name" 
                    onChange={handleChange}
                    value={name}
                    />
                <br />
                <input 
                    id="age" 
                    type="number" 
                    placeholder="Enter Age" 
                    onChange={handleChange} 
                    value={age}
                    />
                <br />
                <input 
                    id="address" 
                    placeholder="Enter Address" 
                    onChange={handleChange} 
                    value={address}
                    />
                <br />
                <label>
                    Department :
                    <select onChange={handleChange} id="department" value={department}>
                        <option value="">Select Department</option>
                        <option value="Finance">Finance</option>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </label>
                <br />
                <input 
                    id="salary" 
                    type="number" 
                    placeholder="Enter Salary" 
                    onChange={handleChange}
                    value={salary}
                    />
                <br />
                Marital State :
                <input 
                    id="marital_state" 
                    type="checkbox" 
                    onChange={handleChange} 
                    value={marital_state}
                    />
                <br />
                <input type="submit" value="SUBMIT" />
            </form>
            <hr></hr>
                   
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Department </th>
                        <th>Salary</th>
                        <th>marital state</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => {
                        return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.address}</td>
                            <td>{item.department}</td>
                            <td>{item.salary}</td>
                            <td>{item.marital_state ? "Yes" : "No"}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
    
        </div>
    )

    
}


export default Form;
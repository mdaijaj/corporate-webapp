import { useState } from "react";
import {useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AgentPage = () => {
    const [agentdata, setAgentdata] = useState();
    const navigate = useNavigate()
    let name, value;

    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setAgentdata({ ...agentdata, [name]: value })  //[] dynamic data for
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            first_name,
            last_name,
            email,
            mobile,
            password,
            role_name,
            birth_date

        } = agentdata;

        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                mobile,
                password,
                role_name,
                birth_date
            })
        }
        const res = await fetch(`/api/createuserdetails`, regInf);
        const result = await res.json()
        console.log("result", result)
        // localStorage.setItem("user", JSON.stringify(result.data))
        if (result.status === 400 || !result) {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
        else {
            toast.success('new candidate add is successfully', { autoClose: 1500 })
            // navigate('/login')
        }
    }


    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Register User</h1>            
            <div className="container" style={{ marginTop: "10px" }}>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">First Name</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='first_name'
                            placeholder="first_name" />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Last Name</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='last_name'
                            placeholder="last_name" />
                    </div>
                </div>

                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={handleInput}
                            name='email'
                            id="email"
                            placeholder="Enter email..."
                        />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Mobile Number</label>

                        <input type="number"
                            className="form-control"
                            id="mobile"
                            onChange={handleInput}
                            name='mobile'
                            placeholder="Mobile*" />
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                        <label for="formGroupExampleInput" class="form-label">Role Select *</label>
                        <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="role_name" aria-label="select example">
                            <option selected>Select Role</option>
                            <option value="Individual">Individual</option>
                            <option value="Corporate">Corporate</option>

                        </select>
                    </div>  
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Password</label>
                        <input type="password"
                            className="form-control"
                            name="password"
                            onChange={handleInput}
                            id="password"
                            placeholder="password" />
                    </div>
                </div>

                <div className="mb-2 row" style={{paddingTop: "25px"}}>
                    <div className="col-mdm-2">
                        <button className="btn btn-info" onClick={handleSubmit} style={{ margin: "auto", width: "200px", borderRadius: "25px", height: "50px"}}>Submit</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AgentPage;
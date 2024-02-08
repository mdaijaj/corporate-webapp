import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BasicDetails=()=>{
    const [agentdata, setAgentdata] = useState();
    const navigate = useNavigate()

    let name, value;
    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        console.log("agentdata", agentdata)
        setAgentdata({ ...agentdata, [name]: value })  //[] dynamic data for
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            first_name,
            last_name,
            email,
            mobile,
            role_name,
            
        } = agentdata;
        console.log("submit button calling....")

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
                role_name
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
            navigate(`/address_details/${result.data._id}`)
        }

    }
    
    
    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Basic details</h1>            
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
                    <label for="formGroupExampleInput" class="form-label">Birth Date </label>
                        <input type=""
                            className="form-control"
                            name="birth_Date"
                            onChange={handleInput}
                            id="birth_Date"
                            placeholder="date of birth" />
                    </div>
                </div>

                <div className="mb-2 row">
             <div className="col-sm-2">
                <button className="btn btn-info" onClick={handleSubmit} style={{marginRight: "25px"}}>Submit</button>
                <button className="btn btn-danger">Skip</button>
            </div>
        </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default BasicDetails;
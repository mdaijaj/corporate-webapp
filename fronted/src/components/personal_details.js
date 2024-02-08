import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const PersonalDetails=()=>{

    const [agentdata, setAgentdata] = useState();
    const navigate = useNavigate()
    const {id}=useParams()
    console.log("id.........", id)

    let name, value;
    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setAgentdata({ ...agentdata, [name]: value })  //[] dynamic data for
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            panNumber,
            vehicleNumber
        } = agentdata;

        const regInf = {
            method: "Put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                panNumber,
                vehicleNumber
            })
        }

        const res = await fetch(`/api/editUserDetails/${id}`, regInf);
        const result = await res.json()
        console.log("result", result)
        // localStorage.setItem("user", JSON.stringify(result.data))
        if (result.status === 400 || !result) {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
        else {
            toast.success(' update is successfully', { autoClose: 1500 })
            navigate(`/user_data`)
        }

    }
    
    
    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Personal Details</h1>            
            <div className="container" style={{ marginTop: "10px" }}>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">PAN Number</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='panNumber'
                            placeholder="panNumber" />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Vehicle Number</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='vehicleNumber'
                            placeholder="vehicleNumber" />
                    </div>
                </div>

                <div className="col-sm-2">
                <button className="btn btn-info" onClick={handleSubmit} style={{marginRight: "25px"}}>Submit</button>
                <button className="btn btn-danger">Skip</button>
            </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default PersonalDetails;
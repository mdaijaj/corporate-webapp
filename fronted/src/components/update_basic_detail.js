import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBasicDetails=()=>{
    const [agentdata, setAgentdata] = useState();
    const navigate = useNavigate()
    const {id}=useParams()


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
            role_name,
            password,
            panNumber,
            vehicleNumber
            
        } = agentdata;

        const regInf = {
            method: "Put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                mobile,
                role_name,
                password,
                panNumber,
                vehicleNumber
            })
        }

        const res = await fetch(`/api/editUserDetails/${id}`, regInf);
        const result = await res.json()
        // localStorage.setItem("user", JSON.stringify(result.data))
        if (result.status === 200 || result.status==201 || result) {
            toast.success('new candidate add is successfully', { autoClose: 1500 })
            navigate(`/address_details/${result.result._id}`)
        }
        else {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
    }


    const getdetails= async()=>{
        const res = await fetch(`/api/getUserDetails/${id}`);
        const result = await res.json()
        setAgentdata(result.data)
    }

    useEffect(()=>{
        getdetails()
    }, [])
    
    
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
                            value={agentdata?.first_name}
                            name='first_name'
                            placeholder="first_name" />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Last Name</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            value={agentdata?.last_name}
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
                            value={agentdata?.email}
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
                            value={agentdata?.mobile}
                            onChange={handleInput}
                            name='mobile'
                            placeholder="Mobile*" />
                    </div>
                </div>
                <div className="mb-4 row">
                    
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Password</label>
                        <input type="password"
                            className="form-control"
                            name="password"
                            onChange={handleInput}
                            value={agentdata?.password}
                            id="password"
                            placeholder="password" />

                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Birth Date </label>
                        <input type=""
                            className="form-control"
                            name="birth_Date"
                            onChange={handleInput}
                            value={agentdata?.birthdate}
                            id="birth_Date"
                            placeholder="date of birth" />
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">PAN Number</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            value={agentdata?.panNumber}
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
                            value={agentdata?.vehicleNumber}
                            name='vehicleNumber'
                            placeholder="vehicleNumber" />
                    </div>
                    <div className="col-6 sm-4">
                        <label for="formGroupExampleInput" class="form-label">Role Select *</label>
                        <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="role_name" aria-label="select example">
                            <option selected>{agentdata?.role_name}</option>
                            <option value="Individual">Individual</option>
                            <option value="Corporate">Corporate</option>
                        </select>
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

export default UpdateBasicDetails;
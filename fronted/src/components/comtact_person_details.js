import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ContactPersonDetails=()=>{
    const [agentdata, setAgentdata] = useState();
    const navigate = useNavigate()
    const {id}=useParams()
    console.log("id.........", id)

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
            contactPersonName,
            contactPersonMobileNumber,
            contactPersonEmail,
            designation
        } = agentdata;

        const regInf = {
            method: "Put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contactPersonName,
                contactPersonMobileNumber,
                contactPersonEmail,
                designation
            })
        }

        const res = await fetch(`/api/editCompanyDetails/${id}`, regInf);
        const result = await res.json()
        console.log("result", result)
        // localStorage.setItem("user", JSON.stringify(result.data))
        if (result.status === 400 || !result) {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
        else {
            toast.success(' update is successfully', { autoClose: 1000 })
            navigate('/company_list')
        }

    }


    const getdetails= async()=>{
        const res = await fetch(`/api/getCompanyDetails/${id}`);
        const result = await res.json()
        console.log("result", result)
        setAgentdata(result.data)
    }

    useEffect(()=>{
        getdetails()
    }, [])
    
    
    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Contact Person Details</h1>            
            <div className="container" style={{ marginTop: "10px" }}>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Contact Person Name</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            value={agentdata?.contactPersonName}
                            onChange={handleInput}
                            name='contactPersonName'
                            placeholder="contactPersonName" />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Contact Person Mobile Number</label>
                        <input type="number"
                            className="form-control"
                            id="inputName"
                            value={agentdata?.contactPersonMobileNumber}
                            onChange={handleInput}
                            name='contactPersonMobileNumber'
                            placeholder="contactPersonMobileNumber" />
                    </div>
                </div>

                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Contact Person Email</label>
                        <input
                            type="text"
                            className="form-control"
                            value={agentdata?.contactPersonEmail}
                            onChange={handleInput}
                            name='contactPersonEmail'
                            id="contactPersonEmail"
                            placeholder="Enter contactPersonEmail..."
                        />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Designation</label>
                        <input type="text"
                            className="form-control"
                            value={agentdata?.designation}
                            id="designation"
                            onChange={handleInput}
                            name='designation'
                            placeholder="designation*" />
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

export default ContactPersonDetails;
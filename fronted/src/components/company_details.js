import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyDetails=()=>{
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
            companyNumber,
            companyTIN,
            companyType
            
        } = agentdata;
        console.log("submit button calling....")

        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                companyNumber,
                companyTIN,
                companyType
            })
        }

        const res = await fetch(`/api/createCompanyDetails`, regInf);
        const result = await res.json()
        console.log("result", result)
        // localStorage.setItem("user", JSON.stringify(result.data))
        if (result.status === 400 || !result) {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
        else {
            toast.success('new candidate add is successfully', { autoClose: 1500 })
            navigate(`/company_address_details/${result.data._id}`)
        }

    }
    
    
    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Company Details</h1>            
            <div className="container" style={{ marginTop: "10px" }}>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Company Number</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='companyNumber'
                            placeholder="companyNumber" />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Company TIN </label>
                        <input type="text"
                            className="form-control"
                            id="inputName"Company Type 
                            onChange={handleInput}
                            name='companyTIN'
                            placeholder="companyTIN" />
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                        <label for="formGroupExampleInput" class="form-label">Company Type </label>
                        <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="companyType" aria-label="select example">
                            <option selected>companyType</option>
                            <option value="SME">SME</option>
                            <option value="MME">MME</option>
                            <option value="LLP">LLP</option>
                            <option value="Startup">Startup</option>
                            <option value="Private">Private</option>
                            <option value="Public">Public</option>
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

export default CompanyDetails;
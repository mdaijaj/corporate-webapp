import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AddressDetails=()=>{

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
            addressline1,
            addressline2,
            district,
            city,
            state,
            pincode
        } = agentdata;

        const regInf = {
            method: "Put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                addressline1,
                addressline2,
                district,
                city,
                state,
                pincode
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
            navigate(`/personal_details/${result.result._id}`)
        }

    }

    const getdetails= async()=>{
        const res = await fetch(`/api/getUserDetails/${id}`);
        const result = await res.json()
        console.log("result", result)
        setAgentdata(result.data)
    }

    useEffect(()=>{
        getdetails()
    }, [])

    
    
    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Address Details</h1>            
            <div className="container" style={{ marginTop: "10px" }}>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Address Line 1</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            value={agentdata?.addressline1}
                            onChange={handleInput}
                            name='addressline1'
                            placeholder="addressline1" />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Address Line 2</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            value={agentdata?.addressline2}
                            name='addressline2'
                            placeholder="addressline2" />
                    </div>
                </div>

                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Disctrict</label>
                        <input
                            type="text"
                            className="form-control"
                            value={agentdata?.district}
                            onChange={handleInput}
                            name='district'
                            id="district"
                            placeholder="Enter district..."
                        />
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">City</label>

                        <input type="text"
                            className="form-control"
                            id="city"
                            onChange={handleInput}
                            value={agentdata?.city}
                            name='city'
                            placeholder="city*" />
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                        <label for="formGroupExampleInput" class="form-label">State</label>
                        <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="state" aria-label="select example">
                            <option selected>{agentdata?.state}</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Mahrastra">Mahrastra</option>
                            <option value="Karnatak">Karnatak</option>
                            <option value="MP">MP</option>
                            <option value="UP">UP</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Bihar">Bihar</option>

                        </select>
                    </div>  
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Pincode </label>
                        <input type="number"
                            className="form-control"
                            name="pincode"
                            value={agentdata?.pincode}
                            onChange={handleInput}
                            id="pincode"
                            placeholder="Pincode" />
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

export default AddressDetails;
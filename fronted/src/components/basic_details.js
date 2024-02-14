import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const BasicDetails=()=>{
    let initial={ 
        first_name: "",
        last_name:"",
        email: "",
        mobile:"",
        role_name: "",
        password: ""
    }
    const [agentdata, setAgentdata] = useState(initial);
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    let name, value;
    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        console.log("krrrrrrr...", value)
        setAgentdata({ ...agentdata, [name]: value })  //[] dynamic data for
    }


    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.first_name) {
          errors.first_name = "Username is required!";
        }
        if(!values.role_name){
            errors.role_name = "role_name is required!";
        }
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if(!values.mobile){
            errors.mobile = "mobile is required!";
        }else if(values.mobile.length!=10){
            errors.mobile = "This should be correct mobile number!";
        }
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            first_name,
            last_name,
            email,
            mobile,
            role_name,
            password
        } = agentdata;

        setFormErrors(validate(agentdata));
        setIsSubmit(true);

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
                role_name,
                password
            })
        }


        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const res = await fetch(`/api/createuserdetails`, regInf);
            const result = await res.json()
            console.log("result", result)
            // localStorage.setItem("user", JSON.stringify(result.data))
            if (result.data) {
                toast.success('new candidate add is successfully', { autoClose: 1500 })
                navigate(`/address_details/${result.data._id}`)
            }else{
                toast.info('server error', { autoClose: 1500 })
            }
        }
        else {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
    }

    let parObj={
        color: "red",
        fontSize: "15px"
      }
    
    
    return (

        <>
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
                        <p style={parObj}>{formErrors.first_name}</p>

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
                        <p style={parObj}>{formErrors.email}</p>
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Mobile Number</label>

                        <input type="number"
                            className="form-control"
                            id="mobile"
                            onChange={handleInput}
                            name='mobile'
                            placeholder="Mobile*" />
                            <p style={parObj}>{formErrors.mobile}</p>

                    </div>
                </div>
                <div className="mb-4 row">
                    
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Password</label>
                        <input type="password"
                            className="form-control"
                            name="password"
                            onChange={handleInput}
                            id="password"
                            placeholder="password" />
                            <p style={parObj}>{formErrors.password}</p>
                    </div>
                    <div className="col-sm-4">
                    <label for="formGroupExampleInput" class="form-label">Birth Date </label>
                    <input type="Date" 
                        className="form-control" 
                        id="birth_Date" 
                        onChange={handleInput}
                        name='birth_Date'
                        placeholder="birth_Date.." />
                 </div>
                    <div className="col-6 sm-4">
                        <label for="formGroupExampleInput" class="form-label">Role Select *</label>
                        <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="role_name" aria-label="select example">
                            <option selected>Select Role</option>
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
        </>
      
    )
}

export default BasicDetails;
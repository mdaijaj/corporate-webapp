import { useEffect, useState } from 'react';
import '../App.css'
import Loader from './loader'
import axios from 'axios';

const CompanyDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userdata, setUserdata]=useState([])


    const allUserList = async () => {
      const response = await axios.get('/api/getCompanyDetailslist');
      let filterData = await response.data.data
      setUserdata(filterData)
    }
  
   

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        allUserList()
    }, [])


    return (
        <>
            <div class="container">
                <div>
                    {isLoading ? <Loader /> : <div>Your content here</div>}
                </div>
        {console.log("userdata", userdata)}
                <div class="row">
                    {userdata?.map((menu, index) => (
                        <div class="col-md-4" style={{ padding: "15px" }}>
                            <div class="card">
                                <div class="card-block">
                                    <h4 class="card-title">{menu.contactPersonName}</h4>
                                    <p class="card-text">contactPersonEmail : {menu.contactPersonEmail}</p>
                                    <p class="card-text">companyNumber : {menu.companyNumber}</p>
                                    <p class="card-text">mobile : {menu.mobile}</p>
                                    <p class="card-text">contactPersonMobileNumber : {menu.contactPersonMobileNumber}</p>
                                    <p class="card-text">companyTIN : {menu.companyTIN}</p>
                                    <p class="card-text">companyType : {menu.companyType}</p>
                                    <p class="card-text">designation : {menu.designation}</p>

                                    <a href="#" class="btn btn-primary">About</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default CompanyDetails;
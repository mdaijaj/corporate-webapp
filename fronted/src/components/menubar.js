import Errorpage from './error';
import {Route, Routes} from 'react-router-dom';
import HomePage from './home'
import Userdata from './table';
import AgentDetails from './agent_data';
import AddUser from './add_users'
import UpdateUser from './edit_user';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './login'
import BasicDetails from './basic_details'
import AddressDetails from './address_details'
import PersonalDetails from "./personal_details"
import Header from './header';
import CompanyDetails from './company_details';
import CompanyAddressDetails from './company_address_details';
import ContactPersonDetails from './comtact_person_details';



const Routing=()=>{
  const [userdata, setUserdata]=useState([])


  const allUserList = async () => {
    const response = await axios.get('/api/getuserList');
    let filterData = await response.data.data
    setUserdata(filterData)
  }

  
  useEffect(()=>{
    allUserList()
  }, [])


  return(
    <>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />  
          <Route path="/user_data" element={<Userdata/>} />
          <Route path="/agent_data" element={<AgentDetails data={userdata}/>} />  
          <Route path="/reports" element={<Userdata/>} />
          <Route path="/add_user" element={<AddUser/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user_details_update/:id" element={<UpdateUser/>} />
          <Route path="/basic_details" element={<BasicDetails/>} />
          <Route path="/address_details/:id" element={<AddressDetails/>} />     
          <Route path="/personal_details/:id" element={<PersonalDetails/>} />          


          <Route path="/company_address_details/:id" element={<CompanyAddressDetails/>} />     
          <Route path="/contact_person_details/:id" element={<ContactPersonDetails/>} />          

          <Route path="/headers" element={<Header/>} />        
          <Route path="/company_details" element={<CompanyDetails/>} />            
          <Route path="/*" element={<Errorpage/>} />

        </Routes>
    </>
    )
}


export default Routing;
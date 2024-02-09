import Errorpage from './error';
import {Route, Routes} from 'react-router-dom';
import HomePage from './home'
import Userdata from './table';
import CompanyList from './company_data';
import AddUser from './add_users'
import Login from './login'
import BasicDetails from './basic_details'
import AddressDetails from './address_details'
import PersonalDetails from "./personal_details"
import CompanyDetails from './company_details';
import CompanyAddressDetails from './company_address_details';
import CompanyAddressDetailsList from './company_address_list';
import ContactPersonDetails from './comtact_person_details';
import AddressDetailsList from './address_details_list';
import ContactPersonList from './contact_person_list';
import UpdateBasicDetails from './update_basic_detail'



const Routing=()=>{



  return(
    <>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />  
          <Route path="/user_data" element={<Userdata/>} />
          <Route path="/add_user" element={<AddUser/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user_details_update/:id" element={<UpdateBasicDetails/>} />
          <Route path="/basic_details" element={<BasicDetails/>} />
          <Route path="/address_details/:id" element={<AddressDetails/>} />     
          <Route path="/personal_details/:id" element={<PersonalDetails/>} />          
          <Route path="/address_details" element={<AddressDetailsList/>} />   
          <Route path="/personal_details" element={<AddressDetailsList/>} />          


          <Route path="/company_list" element={<CompanyList/>} />  
          <Route path="/company_address_details/:id" element={<CompanyAddressDetails/>} />  
          <Route path="/company_address_details" element={<CompanyAddressDetailsList/>} />   
          <Route path="/contact_person_details" element={<ContactPersonList/>} />          
          <Route path="/contact_person_details/:id" element={<ContactPersonDetails/>} />          
          <Route path="/company_details" element={<CompanyDetails/>} />            
          <Route path="/*" element={<Errorpage/>} />

        </Routes>
    </>
    )
}


export default Routing;
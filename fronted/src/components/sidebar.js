import React, { useEffect, useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useFetcher } from 'react-router-dom';
import Routing from './menubar';
import {allMenu, allModuleList} from  '../data_store'


const Sidebar = ({isLogin}) => {
  const [showdata, setShowdata]= useState([])

  // const userDetails= (userdata)=>{
  
  //   if(userdata){
  //     const filterdata= allModuleList.filter((item)=> item.role==userdata.role_name)
  //     setShowdata(filterdata)
  //   }
 
  // }
  


  useEffect(()=>{

    let data= JSON.parse(localStorage.getItem('user'))
    if(data){
      const filterdata= allModuleList.filter((item)=> item.role==data.role_name)
      setShowdata(filterdata)
    }
  
    // userDetails(data)
  }, [isLogin])
  
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          X CORPORATE
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            {/* {console.log("showdata", showdata)} */}

            {showdata[0]?.modules?.map((menu, index) => (
              <NavLink exact to={menu.path} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon={menu.icon}>{menu.module_name}</CDBSidebarMenuItem>
              </NavLink>
            ))}

          </CDBSidebarMenu> 
        </CDBSidebarContent>
      </CDBSidebar>

      {/* manage routing */}
      <Routing/>
    </div>
  );
}; 

export default Sidebar;
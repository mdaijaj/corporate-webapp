import React, { useEffect, useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Routing from './menubar';
import {allMenu, allModuleList} from  '../data_store'


const Sidebar = ({isLogin}) => {
  const [showdata, setShowdata]= useState([])

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
            {showdata[0]?.modules?.map((menu, index) => (
              <NavLink exact to={menu.path} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon={menu.icon}>{menu.module_name}</CDBSidebarMenuItem>
              </NavLink>
            ))}

          </CDBSidebarMenu> 
        </CDBSidebarContent>
      </CDBSidebar>
      <Routing/>
    </div>
  );
}; 

export default Sidebar;
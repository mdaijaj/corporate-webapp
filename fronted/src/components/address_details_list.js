
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddressDetailsList = () => {
    const [achievementList, setAchievementList] = useState([])
    const [open, setOpen] = useState(false);
    const [achievedetail, setAchievedetail] = useState('');


    //pagination functionality
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 5;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = achievementList.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(achievementList.length / recordPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1)



    const [query, setQuery] = useState("");
    const [results, setResults] = useState(records);
    const navigate = useNavigate()


    const handleOpen = async (id) => {
        const response = await axios.get(`/api/getUserDetails/${id}`)
        setOpen(true);
        let result = await response.data.data
        setAchievedetail(result)
    }

    const handleClose = () => setOpen(false);

    const UserList = async () => {
        const response = await axios.get('/api/getuserList');
        let filterData = await response.data.data
        setAchievementList(filterData)
    }

    const deleteAchievement = async (id) => {
        await fetch(`/api/deleteUserDetails/${id}`);
        toast.warning('delete successfully', { autoClose: 2000 })
        UserList()
    }

    const updateAchievementDetails = async (itemId) => {
        console.log("aaaa", itemId)
        navigate(`/address_details/:${itemId}`)
    }



    //pagination
    const previousPage = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const changeCurPage = (id) => {
        setCurrentPage(id)
    }

    const nextPage = () => {
        if (currentPage != nPage) {
            setCurrentPage(currentPage + 1)
        }
    }


    //search feature
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setQuery(searchTerm);
        
        const filteredResults = records.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
    };



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'scroll',
        width: 400,
        height: "auto",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    let newobj = {
        paddingTop: "25px", 
        textAlign: "right", 
        borderRadius: "50px", 
        height: "60px"
    }


    useEffect(() => {
        UserList()
    }, [])


    return (
        <>

            <div className="container">

                {/* search features */}
                <div style={{ newobj }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={handleSearch}
                    />
                </div>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#Id</th>
                            <th scope="col">AddressLine1</th>
                            <th scope="col">AddressLine2</th>
                            <th scope="col">District</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Pincode</th>
                            <th scope="col">PAN Number</th>
                            <th scope="col">Vehicle Number</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {console.log("records...", records)}
                    <tbody>
                        {
                            results.length>0?results.map((item, index) => {
                                {console.log("kkkkkkkkkkkkk", item)}
                                return (
                                    <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                            <td>{item.addressline1}</td>
                                            <td>{item.addressline2}</td>
                                            <td>{item.district}</td>
                                            <td>{item.city}</td>
                                            <td>{item.state}</td>
                                            <td>{item.pincode}</td>
                                            <td>{item.state}</td>
                                        <td >
                                            <Link className="btn btn-outline-primary mr-2" style={{ margin: "5px" }} onClick={() => updateAchievementDetails(item._id)}><i class="fas fa-user-edit"></i>
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </Link>
                                            <Link className="btn btn-danger mr-2" style={{ margin: "5px" }} onClick={() => deleteAchievement(item._id)}><i class="fas fa-trash"></i>
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </Link>
                                            <Link className="btn btn-primary mr-2" style={{ margin: "5px" }} onClick={() => handleOpen(item._id)} ><i class="bi bi-eye-fill"></i>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }):
                                records?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.addressline1}</td>
                                            <td>{item.addressline2}</td>
                                            <td>{item.district}</td>
                                            <td>{item.city}</td>
                                            <td>{item.state}</td>
                                            <td>{item.pincode}</td>
                                            <td>{item.state}</td>
                                            <td >
                                                <Link className="btn btn-outline-primary mr-2" style={{ margin: "5px" }} onClick={() => updateAchievementDetails(item._id)} to={`/address_details/${item._id}`}><i class="fas fa-user-edit"></i>
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                </Link>
                                                <Link className="btn btn-danger mr-2" style={{ margin: "5px" }} onClick={() => deleteAchievement(item._id)}><i class="fas fa-trash"></i>
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </Link>
                                                <Link className="btn btn-primary mr-2" style={{ margin: "5px" }} onClick={() => handleOpen(item._id)} ><i class="bi bi-eye-fill"></i>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
                <ToastContainer />

            {/* paggination */}
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={previousPage}> Prev </a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={
                                    `page-item${currentPage == n ? 'active' : ""}`} key={i}>
                                    <a href="#" className="page-item" onClick={() => changeCurPage(n)}> {n} </a>
                                </li>
                            ))
                        }
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={nextPage}> Next </a>
                        </li>

                    </ul>
                </nav>
            </div>



            {/* model open here... */}
            {/* <Button onClick={}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ backgroundColor: "blue" }}>Achievement Details</Typography>
                    <Typography id="modal-modal-description">
                        {`
                        Id       :  ${achievedetail._id} 
                        first_name     :  ${achievedetail.first_name}
                        last_name    :  ${achievedetail.last_name}
                        mobile :  ${achievedetail.mobile}
                        panNumber   :  ${achievedetail.panNumber}
                        pincode     :  ${achievedetail.pincode}
                        role_name    :  ${achievedetail.role_name}
                        addressline1 :  ${achievedetail.addressline1}
                        addressline2   :  ${achievedetail.addressline2}
                        district     :  ${achievedetail.district}
                        city    :  ${achievedetail.city}
                        state :  ${achievedetail.state}
                        status   :  ${achievedetail.status}
                        `}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default AddressDetailsList;
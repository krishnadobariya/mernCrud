import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Optional for custom styles
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../actions/userActions";

const ListPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    console.log("userData",userData)
    const getData = userData?.getUser?.data;

    useEffect(()=>{
      dispatch(getUser());
    },[dispatch])

    const handleDeleteClick = (id)=>{
       if (id) {
        console.log("idididid",id);
        
            dispatch(deleteUser(id));
          }
    }

    const handleAddClick = () => {
      navigate("/add-user"); // Navigate to the /add-user route
    };
    const handleEditClick = (id) => {
      navigate(`/edit-user/${id}`);
    };
    
  return (
    <>
     <button className="open-modal-button right-align" onClick={handleAddClick}>
        Add
      </button>
    <div className="table-container">
      <Table striped bordered hover className="full-screen-table" style={{marginTop:"100px"}}>
        <thead>
          <tr>
            {/* <th>index no.</th> */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {getData?.map((row) => (
          <tr key={row.id}>
            {/* <td>{row.id}</td> */}
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.email}</td>
            <td>{row.mobileNo}</td>
            <td>
              <button className="action-button" onClick={() => handleEditClick(row._id)}>Edit</button>
              <button className="action-button delete" onClick={() => handleDeleteClick(row._id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
    </>
    
  );
};

export default ListPage;

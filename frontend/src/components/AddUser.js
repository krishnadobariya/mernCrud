import React, { useState } from "react";
import "../App.css"; // Assuming you have an external CSS file
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("user",user)
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobileNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const payload ={
        firstName:values?.firstName,
        lastName : values?.lastName,
        email:values?.email,
        mobileNo:values?.mobileNo
      }
      dispatch(addUser(payload)).then(()=>{
        navigate("/");
      })
    },
  });

  return (
    <div className="app-container">
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <h2 style={{ textAlign: "center", marginBottom: "50px" }}>User Form</h2>
        <div className="form-group">
          <label className="label-form">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Your First Name"
            className="form-input"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error text-danger">{formik.errors.firstName}</div>
          )}
        </div>
        <div className="form-group">
          <label className="label-form">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Your Last Name"
            className="form-input"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error text-danger">{formik.errors.lastName}</div>
          )}
        </div>
        <div className="form-group">
          <label className="label-form">
            Email Id <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter Your Email Id"
            className="form-input"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error text-danger">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label className="label-form">
            Mobile No. <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Your Mobile No."
            className="form-input"
            name="mobileNo"
            value={formik.values.mobileNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobileNo && formik.errors.mobileNo && (
            <div className="error text-danger">{formik.errors.mobileNo}</div>
          )}
        </div>
        <div className="button-group">
          <button type="submit" className="signup-button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;

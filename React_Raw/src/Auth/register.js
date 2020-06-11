import React from "react";
import { Formik} from "formik";
import { Button,Form,Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as yup from "yup";
import "../css/common.css";
import {bindActionCreators } from "redux";
import {connect} from "react-redux";
import * as BaseAction from "../Actions/BaseAction";

// const validate = values =>{
//     var errors = {};
//     if(!values.name){
//         errors.name = "Name is Required"
//     }else if(values.name.length > 15){
//         errors.name = "Maximum 15 characters allowd"
//     }else if(values.name.length < 3){
//         errors.name = "minimum 3 characters allowd"
//     }
//     return errors
// }


class Register extends React.Component {
    constructor(){
        super();
        this.state={
            Register:true,
            Login: false
        }
    }
    render(){
        return(
            <Formik
            initialValues = {
                {name: "",
                email: "",
                password: "",
                confirmpassword: "",}
            }
            validationSchema = {yup.object({
                name: yup.string()
                    .required("Name is Required")
                    .strict()
                    .trim()
                    .min(3, " minimum 3 characters required")
                    .max(15, "Maximum 15 characters allowded"),
                email: yup.string()
                    .email()
                    .required("Email is required"),
                password: yup.string()
                    .required("password is required")
                    .min(5, "Minimum 5 letters required")
                    .max(15, "Maximum 15 letters required"),
                confirmpassword: yup.string()
                    .oneOf([yup.ref("password"),null],"Confirm password must be same as password")
                    .required("Confirm Password is required"),
            })}
            onSubmit={(inputData)=>this.props.registerAction(inputData)}
            render={
                ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
             <div className = "regcon">
                 {this.props.Error ? <Alert variant="danger">
                            {this.props.Error}
                        </Alert> : null}
                        <div className="jumbotron border_radius_25">
                            <h2> Registration</h2>
                            <Form autoComplete="off" onSubmit = {handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <div>
                                        <Form.Label className="fload_left">Name: </Form.Label>
                                        <Form.Control  type={"text"} name={"name"} onChange = {handleChange} value = {values.name}
                                        />
                                        {errors.name ? 
                                            <div className = "text-danger">
                                                {errors.name}
                                            </div>
                                        : null}
                                    </div>

                                    <div>
                                        <Form.Label className="fload_left">Email: </Form.Label>
                                        <Form.Control  type={"text"}  name={"email"} onChange = {handleChange} value = {values.email}/>
                                        {errors.email? 
                                            <div className = "text-danger">
                                                {errors.email}
                                            </div>
                                        : null}
                                    </div>
                                    
                                    <div>
                                        <Form.Label className="fload_left">Password: </Form.Label>
                                        <Form.Control  type={"text"} name={"password"} onChange = {handleChange} value = {values.password}/>
                                        {errors.password ? 
                                            <div className = "text-danger">
                                                {errors.password}
                                            </div>
                                        : null}
                                    </div>

                                    <div>
                                        <Form.Label className="fload_left">Comfirm Password: </Form.Label>
                                        <Form.Control  type={"password"} name={"confirmpassword"} onChange = {handleChange} value = {values.confirmpassword}/>
                                        {errors.confirmpassword ? 
                                            <div className = "text-danger">
                                                {errors.confirmpassword}
                                            </div>
                                        : null}
                                    </div>
                                </Form.Group>


                                <Button variant="primary" type="submit" className="link">
                                    Submit
                                </Button>

                                <div className="link">
                                    <a
                                    href= "login">
                                    if already registered
                                    </a>
                                </div>
                            </Form>
                        </div>
                        {this.props.redirectToLogin ? this.props.history.push({ pathname: "/login"}) : null}
                    </div>
                    )
                }
                />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        redirectToLogin: state && state.redirectToLogin ? state.redirectToLogin  : false,
        Error: state && state.err ? state.err : "",

    }
}

const mapDispatchToProps = (dispatch) =>({
    ...bindActionCreators(BaseAction, dispatch)
})

export default connect (mapStateToProps, mapDispatchToProps)(Register)
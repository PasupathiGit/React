import React from "react";
import {useFormik, Formik} from "formik";
import { Button,Form,Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from "axios"
import * as yup from "yup";
import {bindActionCreators } from "redux";
import {connect} from "react-redux";
import * as BaseAction from "../Actions/BaseAction";


class Login extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }

    componentDidUpdate = () => {    
        // document.title = `You clicked ${this.state.count} times`;  
        // this.props.redirectToHome ? this.props.history.push({ pathname: "/home"}) : null    
    }


    render(){
        return(
            <Formik
            initialValues = {
                {email: "",
                password: "",}
            }
    
            validationSchema = {yup.object({
                email: yup.string()
                    .email()
                    .required("Email is required"),
                password: yup.string()
                    .required("password is required")
                    .min(5, "Minimum 5 letters required")
                    .max(15, "Maximum 15 letters required"),
            })} 
    
            onSubmit={(inputData) => {
                this.props.loginAction(inputData)
            }}
            render={
                ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                    <div className = "regcon">
                        {this.props.Error ? <Alert variant="danger">
                            {this.props.Error}
                        </Alert> : null}
                        {this.props.success ? <Alert variant="success">
                            {this.props.success}
                        </Alert> : null}
                            <div className="jumbotron border_radius_25">
                                <h2> Login</h2>
                                <Form autoComplete="off" onSubmit = {handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">

                                        <div>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control 
                                            type="text" 
                                            name="email"
                                            onChange = {handleChange}
                                            value = {values.email}
                                            />
                                                {errors.email?
                                                <div className = "text-danger">
                                                    {errors.email}
                                                </div>
                                                : null}
                                        </div>
                                        
                                        <div>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                            type="text" 
                                            name="password"
                                            onChange = {handleChange}
                                            value = {values.password}
                                            />
                                                {errors.password ? 
                                                <div className = "text-danger">
                                                    {errors.password}
                                                </div>
                                                : null}
                                        </div>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                    <div className="link">
                                        <a
                                        href= "#"
                                        onClick = {()=>{
                                            window.location.href = "register"
                                        }}
                                        >
                                        registration
                                        </a>
                                    </div>
                                </Form>
                            </div>
                            {this.props.redirectToHome ? this.props.history.push({ pathname: "/home"}) : null}
                        </div>
                )
            }
        />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Error: state && state.err ? state.err : "",
        redirectToHome: state && state.redirectToHome ? true : false,
        success: state && state.success ? state.success : "",
    }
}

const mapDispatchToProps = (dispatch) =>({
    ...bindActionCreators(BaseAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login) 
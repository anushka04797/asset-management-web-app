import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// reactstrap components
import { Link, Redirect } from "react-router-dom";

import {
    Button,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col, Form, FormText, FormFeedback,
} from "reactstrap";
import './Login.css';
import showPwdImg from '../../assets/icons/pass-show.svg';
import hidePwdImg from '../../assets/icons/hide-pass.svg';
import { TOKEN } from 'config';
import { PUBLIC_API } from 'config';
import { USER_ID } from 'config';
import { useDispatch } from 'react-redux';
import { fetchUserDetailsThunk } from 'store/slices/authSlice';
import { useSnackbar } from "notistack";
import { LinearProgress } from "@mui/material";
import { setAuthData } from 'store/slices/authSlice';

const Login = () => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    let history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('bwdb-admin')
    const [password, setPassword] = useState('Dhaka!027#')
    const [submitted,setSubmitted]=useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const login = () => {
        setSubmitted(true)
        // sessionStorage.setItem(TOKEN,'1234')
        // sessionStorage.setItem(USER_ID,'1234')
        // history.push({pathname:'/admin/dashboard',state:{from:'login'}})
        
        PUBLIC_API.post('auth/login/',{usr_email:email,password:password}).then((res)=>{
            setSubmitted(false)
            console.log(res)
            sessionStorage.setItem(TOKEN,res.data.token)
            sessionStorage.setItem(USER_ID,res.data.user_data.id)
            dispatch(setAuthData(res.data.user_data))
            history.push({pathname:'/admin/dashboard',state:{from:'login'}})
        }).catch(err=>{
            setSubmitted(false)
            console.log(err.response.data)
            if(err?.response?.data?.message){
                enqueueSnackbar(err.response.data.message,{variant:"warning"})
            }
        })
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          login()
        }
      }
    return (
        <>
            <div className="container">
                <Row className="add-padding justify-content-md-center">
                    <div className="col-lg-6 col-sm-12">
                        <div className="add-padding">
                            <h2 className='login-header'>Sign in</h2>
                            <Form className="form-signin">
                                <FormGroup>
                                    <Label className="form-input-1-label">Username</Label>
                                    <Input
                                        type="text"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="example@example.com"
                                        // valid={this.state.validate.emailState === "has-success"}
                                        // invalid={this.state.validate.emailState === "has-danger"}
                                        value={email || ''}
                                        className="form-input-1-field"
                                        onChange={(e) => 
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <FormFeedback>
                                        Uh oh!Looks like there is an issue with your email/username.Please input
                                        a correct one.
                                    </FormFeedback>
                                    <FormFeedback valid>
                                        That's a tasty looking email you've got there.
                                    </FormFeedback>
                                    <FormText>Your username is most likely your email or username.</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword" className="form-input-1-label" >Password</Label>
                                    <div className="password-container">
                                        <Input
                                            type={isRevealPwd ? "text" : "password"}
                                            name="password"
                                            id="examplePassword"
                                            placeholder="********"
                                            value={password || ''}
                                            className="form-input-1-field"
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <img className="pwd-container-img"
                                            title={isRevealPwd ? "Hide password" : "Show password"}
                                            src={isRevealPwd ? hidePwdImg : showPwdImg}
                                            onClick={() => setIsRevealPwd(prevState => !prevState)}
                                        />
                                    </div>
                                </FormGroup>
                                <h6 className="forgot-pass"> <Link className="forgot-link" to="/">Forgot Password</Link></h6>
                                <div className="submit-button-holder">
                                    {/* <Button className="signin-button" type='button' onClick={login}>Submit</Button> */}
                                    {submitted?<LinearProgress/>:<Button className="signin-button" type='button' onClick={login}>Submit</Button>}
                                </div>
                                {/* <h6 className="register-prompt">Don’t have an account? <Link className="register-link"> Register</Link></h6> */}
                            </Form>

                        </div>

                    </div>
                    {/**Img */}
                    {/* <div className="col-lg-5 offset-lg-1 mobile-view">
                        <div className="add-padding-img">
                            <img src={require("assets/img/fish-float.svg").default} alt="Image"
                                className="img-bg" />
                        </div>
                    </div> */}

                </Row>

            </div >
        </>
    )
}

export default Login

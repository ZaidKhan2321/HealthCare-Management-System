import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

import { register } from '../Redux/actions/User.js'

const Signup = ()=>{
    const [name, setName] = useState("") ;
    const [email, setEmail] = useState("") ;
    const [password, setPassword] = useState("") ;
    const [role, setRole] = useState("") ;
    const [confirmPassword, setConfirmPassword] = useState("") ;
    const [pwdMatch, setPwdMatch] = useState(true) ;
    const [message, setMessage] = useState("") ;

    const dispatch = useDispatch() ;
    const {loading, userInfo, error} = useSelector((state)=>state.userRegister) ;
    const navigate = useNavigate() ;
    
    useEffect(() => {
        if(userInfo) {
            if(userInfo.role === 2) { // Patient role
                navigate('/create-patient-profile')
            }else if(userInfo.role === 1){ // Doctor role
                navigate('/create-doctor-profile')
            } else {
                navigate('/')
            }
        }
    }, [userInfo, navigate])
  

    useEffect(()=>{
        setPwdMatch(password === "" || (password === confirmPassword && confirmPassword !== "")) ; 
    }, [password, confirmPassword]) ;

    const submitHandler = (e)=>{
        e.preventDefault() ;
        if(password.length !== 0 && pwdMatch){
            dispatch(register(name, email, password, role)) ;
        }else{
            setMessage("Password is not correctly filled") ;
            setTimeout(()=>{
                setMessage("") ;
            }, 5000) ;
        }
    }

    const showError = ()=>(
        <div
            className="alert alert-danger"
            style={{display: error ? "block" : "none"}}
        >
            {error}
        </div>
    ) ;

    const showLoading = () =>loading && (
        <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </div>
    );

    const signUpForm = ()=>(
        <form onSubmit={submitHandler}>
        <div className="form-row">
            <div className="col-md-12">
            <div className="form-group">
                <label className="small mb-1" htmlFor="inputFirstName">Enter Name</label>
                <input
                    className="form-control py-4"
                    id="inputFirstName"
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            </div>
        </div>
        <div className="form-group">
            <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
            <input
                className="form-control py-4"
                type="email"
                aria-describedby="emailHelp"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group form-control py-4">
            <div id="roleSelectionInput">
                <label className="small mb-1 " htmlFor="inputRole" >Role</label>
                <select
                    id="inputRole"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                <option value="">Select Role</option>
                <option value="DOCTOR">Doctor</option>
                <option value="PATIENT">Patient</option>
                <option value="ADMIN">Admin</option>
                </select>
            </div>
        </div>
        <div className="form-row">
            <div className="col-md-6">
            <div className="form-group">
                <label className="small mb-1" htmlFor="inputPassword">Password</label>
                <input
                    className="form-control py-4"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
                <label className="small mb-1" htmlFor="inputConfirmPassword">Confirm Password</label>
                <input
                    className="form-control py-4"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                        border: pwdMatch? "2px solid lightgreen" : "2px solid red"
                    }}
                />
                {!pwdMatch && (
                    <div>
                        <sub><sub>⚠ Passwords do not match</sub></sub>
                    </div>
                )}
            </div>
            </div>
        </div>
        <div className="form-group mt-4 mb-0">
            <button className="btn btn-primary btn-block">Create Account</button>
        </div>
        </form>
    ) ;

    return (
        <>
            {" "}
            {showLoading()}
            {showError()}
            {(message.length !== 0) && (
                <div className="alert alert-danger">{message}</div>
            )}
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header">
                                <h3 className="text-center font-weight-light my-4">
                                    Create Account
                                </h3>
                                </div>
                                <div className="card-body">{signUpForm()}</div>
                                <div className="card-footer text-center">
                                <div className="small">
                                    <Link to={"/signin"}>Have an account? Go to login</Link>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; HMS 2025</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    ) ;
} ;

export default Signup ;
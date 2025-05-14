import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Redux/actions/User.js'

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const { loading, userInfo, error } = useSelector((state) => state.userLogin)
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo) navigate('/')
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (email && password) {
            dispatch(login(email, password))
        } else {
            setMessage("Please fill in all fields")
            setTimeout(() => setMessage(""), 5000)
        }
    }

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "block" : "none" }}
        >
            {error}
        </div>
    )

    const showLoading = () => loading && (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )

    const signInForm = () => (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                <input
                    className="form-control py-4"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="small mb-1" htmlFor="inputPassword">Password</label>
                <input
                    className="form-control py-4"
                    id="inputPassword"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group mt-4 mb-0">
                <button className="btn btn-primary btn-block">Sign In</button>
            </div>
        </form>
    )

    return (
        <>
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
                                                Sign In
                                            </h3>
                                        </div>
                                        <div className="card-body">{signInForm()}</div>
                                        <div className="card-footer text-center">
                                            <div className="small">
                                                <Link to={"/signup"}>Don't have an account? Create one</Link>
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
    )
}

export default Signin

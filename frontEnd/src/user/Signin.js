import React, { useState,useEffect } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../actions/userActions';


const Signin = () => {
    const [values, setValues] = useState({
        email: "ryan@gmail.com",
        password: "rrrrrr9",
        error: "",
        loading: false,
        redirectToReferrer: false
    });
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    // const { userInfo } = userLogin
    console.log("o signin", userLogin)
    if(userLogin.data){
        console.log('true')
        console.log(userLogin.data)
        
    }
    useEffect(() => {
        if(userLogin.data || userLogin.error){
        if (userLogin.error) {
            setValues({ ...values, error:"Wrong Password or Email!!!", loading: false });
        } else {
            authenticate(userLogin.data.data, () => {
                setValues({
                    ...values,
                    redirectToReferrer: true
                });
            });
        }
    }
    }, [userLogin.data || userLogin.error])

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        // signin({ email, password }).then(data => {
        //     console.log('signin page', data)
        //     if (data.error) {
        //         setValues({ ...values, error: data.error, loading: false });
        //     } else {
        //         console.log("object",data)
        //         authenticate(data, () => {
        //             setValues({
        //                 ...values,
        //                 redirectToReferrer: true
        //             });
        //         });
        //     }
        // });
        dispatch(login({email,password}))
        
            

        

        
     
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;

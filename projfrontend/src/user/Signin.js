import React, { useState } from "react"
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"

import {signin, authenticate, isAuthenticated} from "../auth/helper"

const Signin = () => {

    const [values, setValues] = useState({
        email: "a@ameya.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false,  //if user is successfully signin in, then we need to redirect him to his user page or dashboard, etc
    });

    const {email, password, error, loading, didRedirect} = values;
    const {user} = isAuthenticated(); //Because we are returning a whole bunch of data in the json format, so we only need user

    const handleChange = name => event => { //here event is onChange event
        setValues({...values, error: false, [name]: event.target.value}) //...values means bring up whatever there is inside values //[name], here name gets destructured
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: false})
        signin({email, password})
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error, loading: false})
                }
                else{
                    authenticate(data, () => {  //authenticate takes 2 arguments: data and next. Whenever ther is next, we can specify a callback
                        setValues ({
                            ...values, 
                            didRedirect: true,
                            email: "",
                            password: "",
                            loading: "", 
                            error: "",
                        })
                    })
                }
            })
            .catch(console.log("signin request failed"))
    }

    const performRedirect = () => {

        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }

        if(isAuthenticated){
            //return <Redirect to="/" />;
            return <Link to="/" />;
        }
    };

    const loadingMessage = () => {
        return(
           loading && ( //If loading is true and the component is true(which always will be coz its a component), then show the component
               <div className="alert alert-info">
                   <h2>Loading...</h2>
               </div>
           )
        )
    }


    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{display: error ? "" : "none"}}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }



    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>

                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input onChange={handleChange("email")} value={email} className="form-control" type="email" /> 
                        </div>

                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input onChange={handleChange("password")} value={password} className="form-control" type="password" /> 
                        </div>

                        <button onClick={onSubmit} className=" btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Sign in Page" description="A page for user to sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;
import React, {useState} from "react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import {signup} from "../auth/helper"

const Signup = () => {

    const[values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const {name, email, password, error, success} = values //destructuring of values


    const handleChange = name => event => { //here event is onChange event
        setValues({...values, error: false, [name]: event.target.value}) //...values means bring up whatever there is inside values //[name], here name gets destructured
    }

    const onSubmit = event => { //here event is onClick event
        event.preventDefault(); //prevents the default action that happens on submit, so that we can write our own action or method
        setValues({...values, error: false});
        signup({name, email, password}) // this method is coming from src/auth/helper/index.js
            .then(data => {
                if (data && data.error){
                    setValues({...values, error: data.error, success: false});
                }
                else{  //set the values back to default if there was no error, i.e success
                    setValues({
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    });
                }
            })
            .catch(console.log("Error in signup"));
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handleChange("name")} type="text" value={name}/> {/* only name coz we have desturcted it from value.name */}
                        </div>

                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email}/> 
                        </div>

                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type="password" value={password}/> 
                        </div>

                        {/* method without paranthesis means wait for an event to happen and then run it */}
                        <button onClick={onSubmit} className=" btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                        style={{display: success ? "" : "none"}}
                    >
                        New account was created successfully. Please {" "} <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
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


    return (
        <Base title="Sign up Page" description="A page for user to sign up!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()} {/* method with paranthesis means run it right now */}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup;
import React, {Fragment} from "react"
import { Link, withRouter } from "react-router-dom"

import {signout, isAuthenticated} from "../auth/helper"

const currentTab = (history, path) => { //Will need to pass history to Menu() as a prop
    if(history.location.pathname === path){  //path is coming from Link
        return {color: "#2ecc72"};
    }
    else{
        return {color: "#FFFFFF"};
    }
}

const Menu = ({history}) => (  //No return keyword needed because of the round paranthesis
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab(history, "/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
                        U. Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                        A. Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment> {/* Fragments are a way to add multiple components in one component. Just like <div>, but doesnt take its own line */}
                    <li className="nav-item">
                        <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
                            Signup
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">
                            Signin
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" onClick={() => {
                        signout(() => {
                            history.push("/")
                        })
                    }}>
                        Signout
                    </span>
                 </li>
            )}
        </ul>
    </div>
)

export default withRouter(Menu); //withRouter() will automaticalyy handle the proper routes from the Routes.js
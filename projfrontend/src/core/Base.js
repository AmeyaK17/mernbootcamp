import React from "react"
import Menu from "./Menu"

const Base = ({  //This is to make our code reusable
    title = "My title",
    description = "My description",
    className = "bg-dark text-white p-4",
    children
}) => {  //when using {}, return keyword is compulsory. instead can aslo write Base = () => (<div></div>). Same thing.

 
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            
            
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <button className="btn btn-warning btn-lg">Contact Me</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An Amazing <span className="text-white">MERN</span> Bootcamp
                    </span>
                </div>
            </footer>
            
        </div>
    )
}

export default Base;
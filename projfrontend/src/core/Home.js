import React from "react";
import "../styles.css";
import {API} from "../backend"
import Base from "./Base"

export default function Home() {
    console.log("API IS", API) // connecting backend to frontend
    return (
        //whatever will be inside <Base> will be children
        <Base title="Home Page" description="Welcome to the T-Shirt store!">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
            </div>
        </Base>
    );
}


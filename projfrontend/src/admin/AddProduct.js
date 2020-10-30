import React from "react";
import Base from "../core/Base"
import {Link} from "react-router-dom"

const AddProduct = () => {
    return (
        <Base
            title="Add a product here!"
            description=" Welcome to product creation section"
            className="container bg-info p-4"    
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    <h1>Hi</h1>
                </div>
            </div>
        </Base>
    )
}

export default AddProduct;
import React, {useState, useEffect} from "react";
import "../styles.css";
import {API} from "../backend"
import Base from "./Base"
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";



export default function Home() {
    console.log("API IS", API) // connecting backend to frontend

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getAllProducts().then(data => {
            if(data?.error){
                setError(data?.error)
            }
            else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, [])
    
    return (
        //whatever will be inside <Base> will be children
        <Base title="Home Page" description="Welcome to the T-Shirt store!">
            <div className="row text-center">
                <h1 className="text-white">All of tshirts</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div className="col-4 mb-4">
                                <Card product={product}/>
                            </div>
                        )
                    })}
                </div> 
            </div>
        </Base>
    );
}


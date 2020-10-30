import React, {useState, useEffect} from "react";
import "../styles.css";
import {API} from "../backend"
import Base from "./Base"
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";



const Cart = () => {

    const [products, setProducts] = useState([]);

    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]); //at nay point in application, if anything updates, then forcefully reload the page

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) => (
                    <Card 
                        key={index}
                        product={product}
                        addToCart={false}
                        removeFromCart={true}
                        setReload={setReload} //SO now we are passing the reload info from Cart to Card, where it will actually be used
                        reload={reload}
                    />
                ))}
            </div>
        )
    }

    const loadACheckout = () => {
        return (
            <div>
                <h2>This section for checkout</h2>
            </div>
        )
    }
    
    return (
        //whatever will be inside <Base> will be children
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadACheckout()}</div>
            </div>
        </Base>
    );
}

export default Cart;
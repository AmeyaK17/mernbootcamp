const { API } = require("../../backend");

//category calls
export const createCategory =(userId, token, category) => {
    return fetch (`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(respone => {
        return respone.json()
    })
    .catch(err => console.log(err));
};

//get all categeories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
    .then(respone => {
        return respone.json()
    })
    .catch(err => console.log(err))
}

//product calls
//create product
export const createProduct = (userId, token, product) => {
    return fetch (`${API}/product/create/${userId}` , {
        method: "POST",
        headers : {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(respone => {
        return respone.json()
    })
    .catch(err => console.log(err))
}

//get all products 
export const getProducts = () => {
    return fetch (`${API}/products`, {
        method: "GET",
    })
    .then(respone => {
        return respone.json()
    })
    .catch(err => console.log(err))
}

//delete a product
export const deleteProduct = (userId, token, productId) => {
    return fetch (`${API}/product/${productId}/${userId}` , {
        method: "DELETE",
        headers : {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(respone => {
        return respone.json()
    })
    .catch(err => console.log(err))
}

//get a product
export const getAProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
    .then(respone => {
        return respone.json()
    })
    .catch(err => console.log(err))
}

//update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch (`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers : {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product  //new product passed to the backend for updation
    })
    .then(respone => {
        return respone.json()
    })
    .catch(err => console.log(err))
}
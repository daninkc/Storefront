import axios from "axios";

const BASE_URL = `https://delicious-tan-adjustment.glitch.me/api`
const getHeaders = () => {
    const headers = {
        'admin': localStorage.getItem('mode') === 'admin' ? 'true' : 'false',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    console.log(headers)
    return headers
}

export const getProducts = () => axios.get(`${BASE_URL}/products`, { headers: getHeaders() })
export const generateNewCart = () => axios.post(`${BASE_URL}/cart`, { headers: getHeaders() })
export const addProductToCart = (cartId, data) => axios.post(`${BASE_URL}/cart/${cartId}/products`, data, { headers: getHeaders() }) 
export const getProductsInCart = (cartId) => axios.get(`${BASE_URL}/cart/${cartId}/products`, { headers: getHeaders() })
export const getProductById = (productId) => axios.get(`${BASE_URL}/products/${productId}`, { headers: getHeaders() })
export const editProduct = (productId, data) => axios.put(`${BASE_URL}/products/${productId}`, data, { headers: getHeaders() })
export const deleteProductById = (productId) => axios.delete(`${BASE_URL}/products/${productId}`, { headers: getHeaders() })
export const createProduct = (data) => axios.post(`${BASE_URL}/products`, data, { headers: getHeaders() })
export const deleteProductFromCart = (cartId, productId) => axios.delete(`${BASE_URL}/cart/${cartId}/products/${productId}`, { headers: getHeaders() }) 

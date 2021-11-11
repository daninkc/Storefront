import { useEffect, useState, useContext } from 'react';
import CartProductPill from '../components/CartProductPill';
import { getProductsInCart } from '../helpers/api'
import { Link } from 'react-router-dom';
import { globalContext } from "../context/GlobalStore"

const Cart = () => {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [success, setSuccess] = useState(false)
    const { dispatch } = useContext(globalContext);

    async function getProducts() {
        try {
            const cartId = localStorage.getItem('cartId')
            const { data } = await getProductsInCart(cartId);
            setProducts(data)    
            let sum = 0;
            data.forEach(element => {
                const price = parseFloat(element.price)
                sum += price;
            });
            setTotal(sum)
        } catch (error) {
            console.log(error)
        }
    }

    function resetAll() {
        localStorage.removeItem('cartId')
        dispatch({ type: 'RESET_PRODUCTS' });
        setSuccess(true)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="h-full bg-transparent">
        <div className="py-12">
            <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
                <div className="md:flex ">
                    <div className="w-full p-4 px-5 py-5">
                        <div className="md:grid gap-2 ">
                            { !success &&
                            <div className="col-span-2 p-5">
                                <h1 className="text-xl font-medium ">Shopping Cart</h1>
                                {
                                    products.map((item, key) => {
                                        return(
                                            <CartProductPill key={key} name={item.name} id={item.id}
                                            price={parseInt(item.price).toFixed(2)} 
                                            imageUrl={item.imageUrl}
                                            code={item.code}
                                            />
                                        )
                                    })
                                }
                                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                                    <div className="flex items-center"> <i className="fa fa-arrow-left text-sm pr-2"></i> 
                                    <Link to={{pathname: "/"}} 
                                    className="text-md font-medium text-blue-400">Continue Shopping</Link>
                                    </div>
                                    <div className="flex justify-center items-center"> 
                                    <span className="text-sm font-medium text-gray-400 mr-1 mt-1">Subtotal:</span> 
                                    <span className="text-lg font-bold text-gray-800 ">{total.toFixed(2)}</span> </div>
                                    </div>
                                <div className="w-full flex justify-center">
                                <button className="mt-5 h-12 w-3/6 bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
                                onClick={() => resetAll()}
                                >
                                    Check Out
                                    </button>
                                </div>
                            </div>
                            }
                            { success &&
                            <div className="flex flex-col space-y-4">
                                <h4 className="text-xl font-semibold">Congratulations!</h4>
                                <p>You just bought a lot of stuff.</p>
                                <Link to={{pathname: "/"}} className="text-blue-500">Keep buying more</Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Cart;
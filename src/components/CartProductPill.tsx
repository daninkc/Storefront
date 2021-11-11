import { useState } from "react"
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { deleteProductFromCart, getProductsInCart } from "../helpers/api"

interface CartProductPillProps {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    code: string;
}

const CartProductPill: React.FC<CartProductPillProps> = ({ id, name, price, imageUrl, code }) => {
    const [productsInCart, setProductsInCart] = useState([]);

    //delete product from cart
    async function removeItem(id: string) {
        console.log(id)
        try {
            const cartId = localStorage.getItem('cartId')
            const { data } = await deleteProductFromCart(cartId, id)
            console.log(data)
            if (data) {
                //Tengo que hacer un nuevo fetch pues glitch
                //Traigo los productos del carrito y si hay, los mapeo
                try {
                    const { data } = await getProductsInCart(cartId)
                    setProductsInCart(data)                       
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {productsInCart.length === 0 &&
                <div id={id} className="flex justify-between items-center mt-6 pt-6">
                    <div className="flex items-center">
                        <img src={imageUrl} width="60" className="rounded-full mr-6" />
                        <div className="flex flex-col ml-3"> <span className="md:text-md font-medium">{name}</span>
                            <span className="text-xs font-light text-gray-400">#{code}</span> </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="pr-8 "> <span className="text-md font-medium">${price}</span> </div>
                        <div>
                            <button type="button" onClick={() => removeItem(id)}>
                                <IoIosRemoveCircleOutline size="25" />
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                
            }
        </>
    )
}
export default CartProductPill;
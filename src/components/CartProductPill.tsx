import { useState } from "react"
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { deleteProductFromCart } from "../helpers/api"

interface CartProductPillProps {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    code: string;
}

const CartProductPill: React.FC<CartProductPillProps> = ({ id, name, price, imageUrl, code }) => {
    const [visible, setVisible] = useState('flex')

    async function removeItem(id: string) {
        try {
            const cartId = localStorage.getItem('cartId')
            const { data } = await deleteProductFromCart(cartId, id)
            if (data) {
                setVisible('hidden')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
                <div id={id} className={`${visible} justify-between items-center mt-6 pt-6`}>
                    <div className="flex items-center">
                        <img alt={name} src={imageUrl} width="60" className="rounded-full mr-6" />
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
    )
}
export default CartProductPill;
import { useContext, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { addProductToCart } from "../helpers/api";
import { globalContext } from "../context/GlobalStore";
import { BsCartPlus } from "react-icons/bs";

interface AddBtnProps {
    id: string;
}

const AddButton: React.FC<AddBtnProps> = ({ id }) => {
    const [popup, setPopup] = useState('hidden')
    const { dispatch } = useContext(globalContext);

    async function addProduct(id: string) {
        try {
            const cartId = localStorage.getItem('cartId')
            console.log(cartId)
            console.log(id)
            const { data } = await addProductToCart(cartId, {
                productId: (parseInt(id))
            });
            if(data) {
                console.log(data)
            sendToGlobal(data.products.length)
            setPopup('block')
            setTimeout(() => {setPopup('hidden')}, 3000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function sendToGlobal(productQuantity: number) {
        dispatch({ type: 'SET_QUANTITY', payload: productQuantity });
    }

    return (
        <>
            <div id="addedSuccessfully" className={`${popup} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="p-5 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="flex items-center justify-center">
                            <BsCartPlus size="20" className="mr-4" /> <p className="text-dark pt-1">Product added!</p>
                        </div>
                    </div>

                </div>
            </div>
            <button type="button" onClick={() => addProduct(`${id}`)}>
                <IoIosAddCircleOutline size="25" color="#3E4756" />
            </button>
        </>
    )
}
export default AddButton;
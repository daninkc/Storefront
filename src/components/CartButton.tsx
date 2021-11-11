import { useContext } from "react";
import { IoMdCart } from "react-icons/io"
import { globalContext } from "../context/GlobalStore";

const CartButton = () => {
    const { globalState } = useContext(globalContext);

    console.log(globalState)
    
    return (
        <button type="button" className="ml-6 flex">
            <IoMdCart size="30" color="#3E4756" />
            {globalState.productQuantity}
        </button>
    )
}
export default CartButton;
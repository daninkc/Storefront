import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai"
import DeleteProductPopup from "./DeleteProductPopup";

interface DeleteBtnProps {
    id: string;
}

const DeleteButton: React.FC<DeleteBtnProps> = ({ id }) => {
    const [visibleModal, setVisibleModal] = useState(false)

    const handleModal = () => {
        visibleModal ? setVisibleModal(false) : setVisibleModal(true)
    }

    return (
        <>
        <DeleteProductPopup id={id} show={visibleModal} handler={handleModal} />
        <button id={id} type="button" className="deleteBtn pb-0.5" onClick={handleModal}>
            <AiOutlineDelete size="25" color="#3E4756" />
        </button>
        </>
    )
}
export default DeleteButton;
import { useEffect, useState } from "react"
import { FiEdit3 } from "react-icons/fi"
import { getProductById } from "../helpers/api"
import EditProductPopup from './EditProductPopup'

interface EditBtnProps {
    id: string;
}

const EditButton: React.FC<EditBtnProps> = ({ id }) => {
    const [visibleModal, setVisibleModal] = useState(false)
    const [productData, setProductData] = useState({
        id: -1,
        name: '',
        price: '',
        imageUrl: '',
        stock: 0,
        description: '',
        code: ''
    })

    const handleModal = async () => {
        try {
            const { data } = await getProductById(id)
            console.log('Nueva data:', data)
            setProductData(data[0])
        } catch (error) {
            console.log(error)
        }
        visibleModal ? setVisibleModal(false) : setVisibleModal(true)
    }

    return (
        <>
        <EditProductPopup show={visibleModal} handler={handleModal} productToEdit={productData} />
        <button id={id} type="button" className="editBtn mx-2" onClick={handleModal}>
            <FiEdit3 size="25" color="#3E4756" />
        </button>
        </>
    )
}
export default EditButton;
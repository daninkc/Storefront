import { useEffect, useState } from 'react';
import { editProduct } from "../helpers/api";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface EditProductPopupProps {
    show: boolean;
    handler: Function;
    productToEdit: {
        id: number;
        name: string;
        price: string;
        imageUrl: string;
        stock: number;
        description: string;
        code: string;
    }
}

const EditProductPopup: React.FC<EditProductPopupProps> = ({ show, handler, productToEdit }) => {
    const [newName, setNewName] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newStock, setNewStock] = useState(0)
    const [newDescription, setNewDescription] = useState('')
    const [newCode, setNewCode] = useState('')
    const [id, setId] = useState(-1)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setNewName(productToEdit.name)
        setNewPrice(productToEdit.price)
        setNewImage(productToEdit.imageUrl)
        setNewStock(productToEdit.stock)
        setNewDescription(productToEdit.description)
        setNewCode(productToEdit.code)
        setId(productToEdit.id)
    }, [productToEdit])

    function hideModal() {
        handler()
        if (success) {
            window.location.reload()
        }
    }

    function resetFields() {
        setNewName(productToEdit.name)
        setNewPrice(productToEdit.price)
        setNewImage(productToEdit.imageUrl)
        setNewStock(productToEdit.stock)
        setNewDescription(productToEdit.description)
        setNewCode(productToEdit.code)
    }

    async function edit() {
        const item = {
            name: newName,
            price: newPrice,
            imageUrl: newImage,
            stock: newStock,
            description: newDescription,
            code: newCode,
        }
        try {
            const itemToCompare = Object.assign({...item})
            itemToCompare.id = id;
            if (JSON.stringify(itemToCompare) === JSON.stringify(productToEdit)) {
                setError('You need to make changes to edit the product.')
            } else {
            const { data } = await editProduct(id, item);
                if (data) {
                    setSuccess(true)
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }

    const Error = () => {
        return (
        <>
        {error && <div className="w-full pt-4 text-center text-red-600">{error}</div>}
        </>
        )
    }

    return (
        show ?
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 ml-1 sm:text-left w-full">
                                    <div className="flex items-center justify-between pb-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Edit product
                                        </h3>
                                        <button onClick={() => hideModal()}><AiOutlineCloseCircle size="20" /></button>
                                    </div>
                                    <div className="mt-2 w-full">
                                        {!success &&
                                            <form className="text-sm text-gray-500 w-full space-y-2">
                                                <input
                                                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 
                                            px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                    id="inline-full-name" type="text" placeholder="Product name"
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    onFocus={() => setError('')}
                                                />
                                                <input
                                                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 
                                            px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                    id="inline-full-price" type="text" placeholder="Product name"
                                                    value={newPrice}
                                                    onChange={(e) => setNewPrice(e.target.value)}
                                                    onFocus={() => setError('')}
                                                />
                                                <input
                                                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 
                                            px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                    id="inline-full-image" type="text" placeholder="Product name"
                                                    value={newImage}
                                                    onChange={(e) => setNewImage(e.target.value)}
                                                    onFocus={() => setError('')}
                                                />
                                                <input
                                                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 
                                            px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                    id="inline-full-stock" type="text" placeholder="Product name"
                                                    value={newStock}
                                                    onChange={(e) => setNewStock(+e.target.value)}
                                                    onFocus={() => setError('')}
                                                />
                                                <input
                                                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 
                                            px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                    id="inline-full-desc" type="text" placeholder="Product name"
                                                    value={newDescription}
                                                    onChange={(e) => setNewDescription(e.target.value)}
                                                    onFocus={() => setError('')}
                                                />
                                                <input
                                                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 
                                            px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                    id="inline-full-code" type="text" placeholder="Product name"
                                                    value={newCode}
                                                    onChange={(e) => setNewCode(e.target.value)}
                                                    onFocus={() => setError('')}
                                                />
                                            </form>
                                        }
                                    </div>
                                </div>
                            </div>
                            <Error />
                        </div>
                        {!success &&

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="w-full inline-flex 
                            justify-center rounded-md border 
                            border-transparent shadow-sm px-4 py-2 
                            bg-dark text-base font-medium text-highlight hover:bg-gray-900 focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => edit()}
                                >
                                    Edit
                                </button>
                                <button onClick={() => resetFields()} type="button" className="w-full inline-flex 
                            justify-center rounded-md border 
                            border-transparent shadow-sm px-4 py-2 
                            bg-gray-300 text-base font-medium text-dark hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Reset
                                </button>
                                <button type="button" style={{ color: 'gray' }} onClick={() => hideModal()} className="mt-3 w-full
         inline-flex justify-center rounded-md border border-gray-300 
         shadow-sm px-4 py-2 bg-white text-base font-medium
          hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>

                            </div>
                        }
                        {
                            success &&
                            <div className=" px-8 pb-16">
                                <p className="text-sm text-gray-500">
                                    Your product was edited successfully!
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div> : null
    )
}
export default EditProductPopup;
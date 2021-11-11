import AddButton from "./AddButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

interface ProductPillProps {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
}

const ProductPill: React.FC<ProductPillProps> = ({ id, name, price, imageUrl }) => {
    return (
        <div id={id} className="group">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                 <img src={imageUrl}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    className="w-full h-full object-center object-contain group-hover:opacity-75 max-h-96" />
            </div>
            <div className="flex mt-4 justify-between px-2">
                <div className="flex-col">
                    <h3 className="text-sm text-gray-700">
                        {name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                        ${price}
                    </p>
                </div>
                <div className="flex items-center">
                    <DeleteButton id={id} />
                    <EditButton id={id} />
                    <AddButton id={id} />
                </div>
            </div>
        </div>
    )
}
export default ProductPill;
import { useEffect, useState } from "react";
import ProductPill from "../components/ProductPill";
import { getProducts } from "../helpers/api";

const Products = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  async function getProductList() {
    try {
      const { data } = await getProducts();
      setProducts(data)

    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    getProductList()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {
        !error &&
        products.map((item) => {
          return (
          <ProductPill key={item.id} name={item.name} id={item.id}
          price={item.price} 
          imageUrl={item.imageUrl} />
          )
        })
      }
      {
        error &&
        <span>There was an error when loading the page. Please retry.</span>
      }
    </div>
  )
}
export default Products;
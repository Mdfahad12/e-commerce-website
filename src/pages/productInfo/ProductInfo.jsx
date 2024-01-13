import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';

function ProductInfo() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const getProductData = async () => {
    // Simulating data fetching. Replace this with your actual data fetching logic.
    try {
      // Assuming you have some API endpoint to fetch product details
      const response = await fetch(`http://localhost:8000/api/addProduct/products/${params.id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const productData = await response.json();
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product data:', error);
      toast.error('Error fetching product data');
    }
  };

  useEffect(() => {
    getProductData();
  }, [params.productId]);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {product && (
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded"
                src={product.image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.name}
                </h1>
                <div className="flex mb-4">
                  {/* ... Rest of your code for reviews */}
                </div>
                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                  {product.description}
                </p>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => addCart(product)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add To Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    {/* ... SVG icon */}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="text-center mt-8">
  <h2 className="text-2xl font-bold mb-4">Product Specification</h2>
  <table className="w-3/4 mx-auto border-collapse border border-gray-300 bg-white shadow-md">
    <tbody>
      <TableRow title="Fabric" value={product?.fabric} />
      <TableRow title="Origin" value={product?.origin} />
      <TableRow title="Blouse Type" value={product?.blouseType} />
      <TableRow title="Blouse Color" value={product?.blouseColor} />
      <TableRow title="Blouse Dimension" value={product?.blouseDimension} />
      <TableRow title="Colour" value={product?.colour} />
      <TableRow title="Loom" value={product?.loom} />
      <TableRow title="Zari" value={product?.zari} />
      <TableRow title="Saree Dimension" value={product?.sareeDimension} />
      <TableRow title="Wash Care" value={product?.washCare} />
      <TableRow title="Craft" value={product?.craft} />
    </tbody>
  </table>
</div>
      </section>
    </Layout>
  );
}

const TableRow = ({ title, value }) => {
    // Render the row only if value is present
    if (!value) return null;
  
    return (
      <tr className="border-b border-gray-300">
        <td className="py-2 px-4 font-medium text-gray-600">{title}</td>
        <td className="py-2 px-4 text-gray-800">{value}</td>
      </tr>
    );
  };
export default ProductInfo;

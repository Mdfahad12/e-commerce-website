import React, { useContext, useEffect } from 'react';
import Filter from '../../components/filter/Filter';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function AllProducts() {
  const context = useContext(myContext);
  const { mode, product, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {product
              .filter((obj) => obj.name.toLowerCase().includes(searchkey))
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .filter((obj) => obj?.price?.toString().includes(filterPrice))
              .map((item, index) => {
                const { name, price, image, _id } = item;
                return (
                  <div key={index} onClick={() => (window.location.href = `/productinfo/${_id}`)} className="p-4 md:w-1/4 drop-shadow-lg">
                    <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                      <div className="flex justify-center cursor-pointer">
                        <img className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={image} alt="product" />
                      </div>
                      <div className="p-5 border-t-2">
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mr-2"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Pride Of Indian Silk House
                      </h2>
                      <h1
                        className="title-font text-lg font-semibold text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {name}
                      </h1>
                        <p
                        className="leading-relaxed text-lg font-bold flex items-center"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <span className="text-pink-500 mr-1">₹</span>
                        {price}
                      </p>
                        <div className="flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => addCart(item)}
                          className="focus:outline-none text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-300 focus:ring-4 focus:ring-purple-300 font-semibold rounded-lg text-sm py-2 px-4"
                        >
                          Add To Cart
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AllProducts;

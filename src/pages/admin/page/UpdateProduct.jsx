import React, { useContext } from 'react';
import myContext from '../../../context/data/myContext';

function UpdateProduct() {
  const context = useContext(myContext);
  const { products, setProducts, updateProduct } = context;

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='bg-gray-800 px-10 py-10 rounded-xl '>
          <div>
            <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
          </div>
          <div>
            <input
              type='text'
              value={products.name}
              onChange={(e) => setProducts({ ...products, name: e.target.value })}
              name='name'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product name'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.price}
              onChange={(e) => setProducts({ ...products, price: e.target.value })}
              name='price'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product price'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.image}
              onChange={(e) => setProducts({ ...products, image: e.target.value })}
              name='image'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product image URL'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.category}
              onChange={(e) => setProducts({ ...products, category: e.target.value })}
              name='category'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product category'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.fabric}
              onChange={(e) => setProducts({ ...products, fabric: e.target.value })}
              name='fabric'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product fabric'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.origin}
              onChange={(e) => setProducts({ ...products, origin: e.target.value })}
              name='origin'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product origin'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.blouseType}
              onChange={(e) => setProducts({ ...products, blouseType: e.target.value })}
              name='blouseType'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product blouse type'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.blouseColor}
              onChange={(e) => setProducts({ ...products, blouseColor: e.target.value })}
              name='blouseColor'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product blouse color'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.blouseDimension}
              onChange={(e) => setProducts({ ...products, blouseDimension: e.target.value })}
              name='blouseDimension'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product blouse dimension'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.colour}
              onChange={(e) => setProducts({ ...products, colour: e.target.value })}
              name='colour'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product colour'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.loom}
              onChange={(e) => setProducts({ ...products, loom: e.target.value })}
              name='loom'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product loom'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.zari}
              onChange={(e) => setProducts({ ...products, zari: e.target.value })}
              name='zari'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product zari'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.sareeDimension}
              onChange={(e) => setProducts({ ...products, sareeDimension: e.target.value })}
              name='sareeDimension'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product saree dimension'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.washCare}
              onChange={(e) => setProducts({ ...products, washCare: e.target.value })}
              name='washCare'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product wash care'
            />
          </div>
          <div>
            <input
              type='text'
              value={products.craft}
              onChange={(e) => setProducts({ ...products, craft: e.target.value })}
              name='craft'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              placeholder='Product craft'
            />
          </div>
          <div className='flex justify-center mb-3'>
            <button
              onClick={updateProduct}
              className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;

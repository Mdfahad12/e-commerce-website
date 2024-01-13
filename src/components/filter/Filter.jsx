import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Filter() {
  const context = useContext(myContext);
  const {
    mode,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    product,
    setFilteredProducts,
  } = context;

  const handleResetFilter = () => {
    setFilterType('');
    setFilterPrice('');
    setFilteredProducts(product);
  };

  return (
    <div>
      <div className="container mx-auto px-4 mt-5">
        <div
          className="p-5 rounded-lg bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 drop-shadow-xl border border-gray-200"
          style={{
            color: 'white',
          }}
        >
          <div className="relative">
            <div className="absolute flex items-center ml-2 h-full mt-0">
              <svg
                className="w-4 h-4 fill-current text-white"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
              </svg>
            </div>
            <input
              type="text"
              name="searchkey"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              id="searchkey"
              placeholder="Search here"
              className="px-10 py-2 w-full rounded-md bg-opacity-75 bg-white text-white-800 border-transparent outline-0 text-lg "
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Filters</p>
            <button
              onClick={handleResetFilter}
              className="px-4 py-2 bg-white hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            >
              Reset Filter
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-white text-gray-800 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              >
                <option value="">All</option>
                {product.map((item, index) => (
                  <option key={index} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-white text-gray-800 border-transparent outline-0  focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              >
                <option value="">All</option>
                {product.map((item, index) => (
                  <option key={index} value={item.price}>
                    {item.price}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

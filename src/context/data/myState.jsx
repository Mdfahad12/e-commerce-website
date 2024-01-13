import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { toast } from "react-toastify";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    name: null,
    price: null,
    image: null,
    category: null,
    fabric: null,
    origin: null,
    blouseType: null,
    blouseColor: null,
    blouseDimension: null,
    colour: null,
    loom: null,
    zari: null,
    sareeDimension: null,
    washCare: null,
    craft: null,
    description: null,
  });
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  console.log(products, "product");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const addProduct = async () => {
    if (
      !products.name ||
      !products.price ||
      !products.image ||
      !products.category ||
      !products.description
    ) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/addProduct/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products),
        }
      );

      if (response.ok) {
        toast.success("Product added successfully");
        setProducts({
          name: null,
          price: null,
          image: null,
          category: null,
          description: null,
        });
        getProductData();
      } else {
        toast.error("Failed to add product");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getProductData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/addProduct/products"
      );
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const edithandle = (item) => {
    setProducts(item);
  };

  const updateProduct = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/addProduct/products/${products._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: products.name,
            price: products.price,
            image: products.image,
            category: products.category,
            description: products.description,
            fabric: products.fabric,
            origin: products.origin,
            blouseType: products.blouseType,
            blouseColor: products.blouseColor,
            blouseDimension: products.blouseDimension,
            colour: products.colour,
            loom: products.loom,
            zari: products.zari,
            sareeDimension: products.sareeDimension,
            washCare: products.washCare,
            craft: products.craft,
          }),
        }
      );

      if (response.ok) {
        toast.success("Product updated successfully");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 800);
        getProductData();
      } else {
        toast.error("Failed to update product");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    console.log(item, "item");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/addProduct/products/${item._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Product deleted successfully");
        getProductData();
      } else {
        toast.error("Failed to delete product");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getOrderData = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/order");
      const data = await response.json();
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getUserData = async () => {
    console.log(user, "user");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/auth/users");
      const data = await response.json();

      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;

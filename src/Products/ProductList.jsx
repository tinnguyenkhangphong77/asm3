import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showPopup, setProducts } from "../store/actions";
import Popup from "./Popup";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    // Hàm này sẽ chạy khi component được mount
    const fetchData = async () => {
      try {
        // Fetch dữ liệu từ API
        const response = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
        );

        // Chuyển đổi response thành dữ liệu JSON và dispatch đến Redux store
        const result = await response.json();
        dispatch(setProducts(result));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Gọi hàm fetchData
    fetchData();
  }, [dispatch]);

  // Hàm xử lý khi hình ảnh sản phẩm được click
  const handleImageClick = (productData) => {
    dispatch(showPopup(productData));
  };

  // Render danh sách sản phẩm
  return (
    <>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.product}>
            <img
              className={styles["img-product"]}
              src={product.img1}
              alt={product.name}
              onClick={() => handleImageClick(product)}
            />

            <h6>{product.name}</h6>
            <p>{Number(product.price).toLocaleString()}VNĐ</p>
          </div>
        ))}
      </div>
      <Popup />
    </>
  );
};

export default ProductList;

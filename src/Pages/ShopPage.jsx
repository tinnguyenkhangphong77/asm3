import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import styles from "./ShopPage.module.css";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //gọi API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
        );
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);
  //tìm kiếm sản phẩm theo category
  const filterProducts = (category) => {
    const filtered =
      //neu catrgory = All, hien thi tat ca san pham, nguoc laii hien hien san pham theo category
      category === "All"
        ? products
        : products.filter(
            (product) => product.category.toLowerCase() === category
          );
    setSelectedProduct(category);
    setFilteredProducts(filtered);
  };
  console.log(filteredProducts);
  return (
    <>
      <div className={styles["banner-shop"]}>
        <Banner />
      </div>
      <div className={styles.header}>
        <h4>DANH MỤC</h4>
        <input placeholder="Nhập tìm kiếm ở đây" />
        <select>
          <option>Sắp xếp mặc định</option>
        </select>
      </div>
      <div className={styles["product-catagory"]}>
        <div className={styles.catagory}>
          <ul>
            <h4
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              APPLE
            </h4>
            <li>
              <Link
                to={"/shop"}
                style={{
                  color:
                    selectedProduct === null || selectedProduct === "All"
                      ? "red"
                      : "black",
                }}
                onClick={() => filterProducts("All")}
              >
                All
              </Link>
            </li>
          </ul>
          <ul>
            <h4>IPHONE & MAC</h4>
            {["iphone", "ipod", "macbook"].map((category) => (
              <li key={category}>
                <a
                  onClick={() => filterProducts(category)}
                  style={{
                    color: selectedProduct === category ? "red" : "black",
                  }}
                  href="#"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <ul>
            <h4>WIRELESS</h4>
            {["airpod", "watch"].map((category) => (
              <li key={category}>
                <a
                  onClick={() => filterProducts(category)}
                  style={{
                    color: selectedProduct === category ? "red" : "black",
                  }}
                  href="#"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <ul>
            <h4>OTHER</h4>
            {["mouse", "keyboard", "Other"].map((category) => (
              <li key={category}>
                <a
                  onClick={() => filterProducts(category)}
                  style={{
                    color: selectedProduct === category ? "red" : "black",
                  }}
                  href="#"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.productsContainer}>
          {filteredProducts && filteredProducts.length === 0 ? (
            <p style={{ textAlign: "center", color: "red" }}>
              {" "}
              không có sản phẩm
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.product}>
                <Link to={`/detail/${product._id.$oid}`}>
                  <img
                    className={styles["img-product"]}
                    src={product.img1}
                    alt={product.name}
                  />
                  <h6 style={{ marginTop: "5px" }}>{product.name}</h6>
                  <p>{Number(product.price).toLocaleString()}VNĐ</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ShopPage;

import React from "react";
// import { useSelector } from "react-redux";
import banner from "../Image/banner1.jpg";
import sp1 from "../Image/product_1.png";
import sp2 from "../Image/product_2.png";
import sp3 from "../Image/product_3.png";
import sp4 from "../Image/product_4.png";
import sp5 from "../Image/product_5.png";
import styles from "./HomePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import ProductList from "../Products/ProductList";

function HomePage() {
  const naviGate = useNavigate();

  const handleBrow = () => {
    naviGate("/shop");
  };

  return (
    <>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerText}>
          <p>NEW INSPIRATE 2020</p>
          <h4>20% OFF ON NEW SEASON</h4>
          <button onClick={handleBrow} type="button" className="btn btn-dark">
            Browse collections
          </button>
        </div>
        <div className={styles.banner}>
          <img src={banner} alt="Banner" />
        </div>
      </div>
      <div className={styles.danhmucsp}>
        <p>CAREFULLY CREATED COLLECTION</p>
        <h3>BROWSE OUR CATEGORIS</h3>
        <div>
          <img className={styles.imgCatagory} src={sp1} alt="sp1" />
          <img className={styles.imgCatagory} src={sp2} alt="sp2" />
          <img className={styles.imgCatagory} src={sp3} alt="sp3" />
          <img className={styles.imgCatagory} src={sp4} alt="sp4" />
          <img className={styles.imgCatagory} src={sp5} alt="sp5" />
        </div>
      </div>
      <div className={styles.products}>
        <p>MADE THE HARD WAY</p>
        <h5>TOP TRENDING PRODUCT</h5>
        {/*lấy dữ liệu trang Product */}
        <ProductList />
      </div>
      <div className="orther">
        <div className={`${styles.abc} container`}>
          <div className={`${styles.row} row d-flex align-items-center`}>
            <div className="col - md - 4" style={{ marginTop: "50px" }}>
              <h3>FREESHIPING</h3>
              <p>Free shipping worldwide</p>
            </div>
            <div className="col - md - 4" style={{ marginTop: "50px" }}>
              <h3>14 x 7 SERVICE</h3>
              <p>Free shipping worldwide</p>
            </div>
            <div className="col - md - 4" style={{ marginTop: "50px" }}>
              <h3>FESTIVAL OFFFER</h3>
              <p>Free shipping worldwide</p>
            </div>
          </div>
        </div>
        <div className="form">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <h3>LES'T BE FRIENDS! </h3>
                <p>nisi nisi tempor consequat laboris nisi.</p>
              </div>
              <div className="col-md-6">
                <form>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      aria-label="Enter your email address"
                      aria-describedby="basic-addon2"
                      style={{ height: "50px" }}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="button"
                        style={{ height: "100%" }}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

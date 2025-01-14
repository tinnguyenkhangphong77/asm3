import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hidePopup } from "../store/actions";
import styles from "./Popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Popup = () => {
  const dispatch = useDispatch();

  // Lấy trạng thái từ Redux store sử dụng useSelector
  const popupVisible = useSelector((state) => state.popupVisible);
  const productData = useSelector((state) => state.productData);

  // Nếu popupVisible là false, không hiển thị Popup
  if (!popupVisible) {
    return null;
  }

  return (
    <>
      {/* Một overlay để tạo hiệu ứng mờ phía sau Popup */}
      <div className={styles.overlay}></div>
      {/* Phần chính của Popup */}
      <div className={styles["popup-container"]}>
        <div>
          {/* Hiển thị ảnh sản phẩm */}
          <img
            className={styles.img}
            src={productData.img1}
            alt={productData.name}
          />
        </div>
        <div>
          {/* Nút đóng Popup */}
          <p className={styles.close} onClick={() => dispatch(hidePopup())}>
            x
          </p>
          {/* Hiển thị thông tin chi tiết về sản phẩm */}
          <h3>{productData.name}</h3>
          <p>{Number(productData.price).toLocaleString()}VNĐ</p>
          <p className={styles.short_desc}>{productData.short_desc}</p>
          {/* Nút View điều hướng đến trang  "/shop"*/}
          <Link to="shop">
            <button>
              <FontAwesomeIcon icon={faShoppingCart} />
              View
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Popup;

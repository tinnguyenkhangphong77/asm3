import React from "react";
import styles from "./Cart.module.css";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import Banner from "../Banner/Banner";

function Cart() {
  const { cartState, dispatch } = useCart();
  const { items } = cartState;
  const navigate = useNavigate();

  //xóa 1 sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };
  //thay đổi số lượng
  const handleQuantityChange = (productId, newQuantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, newQuantity },
    });
  };
  //cập nhật giỏ hàng trong localstorage
  const updateLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cartState.items));
  };
  //chuyển hướng
  const muasam = () => {
    navigate("/shop");
  };

  const checkoutHandle = () => {
    navigate("/checkout");
  };
  let totalAmount = 0;
  //tính tổng giá tiền các mặt hàng
  items &&
    items.forEach((item) => {
      totalAmount += item.quantity * item.product.price;
    });
  localStorage.setItem("total", totalAmount);
  //tăng số lương hàng
  const tang = (productId) => {
    const currentItem = items.find(
      (item) => item.product._id.$oid === productId
    );

    if (currentItem) {
      handleQuantityChange(productId, currentItem.quantity + 1);
    }
  };
  //giảm số lượng khi click nút giảm
  const giam = (productId) => {
    const currentItem = items.find(
      (item) => item.product._id.$oid === productId
    );

    if (currentItem && currentItem.quantity > 1) {
      handleQuantityChange(productId, currentItem.quantity - 1);
    }
  };
  updateLocalStorage();
  return (
    <>
      <div className={styles["banner-shop"]}>
        <Banner />
      </div>
      <div className={styles.cart}>
        <h2 style={{ marginLeft: "60px" }}>SHOPPING CART</h2>
        <div className={styles.cartContainer}>
          <div>
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <table>
                <thead>
                  <tr style={{ fontSize: "14px" }}>
                    <th>IMG</th>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.product._id.$oid}>
                      <td>
                        <img
                          src={item.product.img1}
                          alt="cart-item"
                          style={{ width: "50px", height: "auto" }}
                        />
                      </td>
                      <td style={{ fontSize: "20px" }}>{item.product.name}</td>
                      <td style={{ color: "rgb(171, 179, 181)" }}>
                        {Number(item.product.price).toLocaleString()}
                      </td>
                      <td style={{ display: "flex", marginTop: "15px" }}>
                        <span
                          style={{ cursor: "pointer", fontSize: "30px" }}
                          onClick={() => giam(item.product._id.$oid)}
                        >
                          &#9666;
                        </span>{" "}
                        <p style={{ marginTop: "10px", textAlign: "center" }}>
                          {item.quantity}
                        </p>
                        <span
                          style={{ cursor: "pointer", fontSize: "30px" }}
                          onClick={() => tang(item.product._id.$oid)}
                        >
                          &#9656;
                        </span>
                      </td>
                      <td style={{ color: "rgb(171, 179, 181)" }}>
                        {(item.quantity * item.product.price).toLocaleString()}
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                          style={{ width: "30px" }}
                          onClick={() =>
                            handleRemoveItem(item.product._id.$oid)
                          }
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className={styles.totalAmount}>
            <h2 style={{ marginLeft: "20px" }}>CART TOTAL</h2>
            <p style={{ marginLeft: "20px", color: "rgb(128, 132, 133)" }}>
              SUBTOTAL: {totalAmount.toLocaleString()}
            </p>
            <p
              style={{
                marginLeft: "20px",
                borderTop: "1px solid rgb(222,226,230)",
                width: "250px",
                color: "rgb(171, 179, 181)",
              }}
            >
              TOTAL: {totalAmount.toLocaleString()}
            </p>
            <input
              placeholder="enter your coupon"
              style={{ marginLeft: "20px", width: "250px" }}
            ></input>
            <button
              style={{
                backgroundColor: "rgb(56,56,56)",
                color: "white",
                width: "150px",
                marginLeft: "20px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                style={{ width: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              Apply coupon
            </button>
          </div>
        </div>
        <div className={styles.button}>
          <button
            onClick={muasam}
            style={{ border: "none", backgroundColor: "rgb(248, 249, 250)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{ width: "20px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Continue shopping
          </button>
          <button
            style={{
              backgroundColor: "rgb(248, 249, 250)",
              color: "rgb(171, 179, 181)",
              border: "1px solid",
            }}
            onClick={checkoutHandle}
          >
            Proceed to checkout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{ width: "20px", border: "1px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;

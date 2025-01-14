import styles from "./Checkout.module.css";
import Banner from "../Banner/Banner";

function Checkout() {
  //gọi dữ liệu từ localstorage
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const total = JSON.parse(localStorage.getItem("total"));
  let cartItems;
  if (storedCart) {
    cartItems = storedCart;
  } else {
    cartItems = [];
  }
  const yourOrder = cartItems.map((item) => (
    <div key={item.product._id.$oid}>
      <p>
        {item.product.name} :{" "}
        <span style={{ color: "rgb(171, 179, 181)" }}>
          {Number(item.product.price).toLocaleString()}VNĐ x{item.quantity}
        </span>
      </p>
    </div>
  ));
  return (
    <>
      <div className={styles["banner-shop"]}>
        <Banner />
      </div>
      <h4 style={{ marginLeft: "100px" }}>BILLING DETAIL</h4>
      <div className={styles.header}>
        <div className={styles.checkout}>
          <label>FULL NAME</label>
          <input placeholder="Enter Your Full Name Here" />
          <label>EMAIL</label>
          <input placeholder="Enter Your Email Here" />
          <label>PHONE NUMBER</label>
          <input placeholder="Enter Your Phone Number Here" />
          <label>ADDRESS</label>
          <input placeholder="Enter Your Address Here" />
          <button>Place Order</button>
        </div>
        <div className={styles.order}>
          <div style={{ margin: "50px" }}>
            <h5> YOUR ORDER</h5>
            {yourOrder}
            <p style={{ fontSize: "20px" }}>
              TOTAL :{" "}
              <span
                style={{ color: "rgb(171, 179, 181)", marginLeft: "100px" }}
              >
                {Number(total).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;

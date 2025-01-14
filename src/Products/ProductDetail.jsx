import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useCart } from "../Cart/CartContext";

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [sanphamlienqua, setSanphamlienquan] = useState(null);
  const [soluong, setSoluong] = useState(1);
  const [show, setShow] = useState(true);

  const { dispatch } = useCart();

  //thêm sản phẩm vào giỏ hàng
  const addToCart = (product, quantity) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity },
    });
    navigate("/cart");
  };

  //lấy số id
  const isProductDisplayed = (productId) => {
    return productId === params.productID;
  };
  //ẩn hiện description
  const hideDescription = () => {
    setShow(!show);
  };
  //tăng giảm số lượng quantity
  const tang = () => {
    setSoluong(soluong + 1);
  };
  const giam = () => {
    if (soluong > 1) {
      setSoluong(soluong - 1);
    }
  };
  //quay len dau trang khi click vao sp lien quan
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
        );
        const data = await response.json();
        const selectedProduct = data.find(
          (product) => product._id.$oid === params.productID
        );
        setProduct(selectedProduct);
        //tìm sản phẩm liên quan
        const sanphamlienquan = data.filter(
          (sanpham) =>
            sanpham.category === selectedProduct.category &&
            sanpham._id.$oid !== params.productID
        );
        setSanphamlienquan(sanphamlienquan);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };
    fetchProductDetail();
  }, [params.productID]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <header style={{ margin: "50px 200px 50px 200px" }}>
      <div className={styles.thongtinsp}>
        <div className={styles.imgdetail}>
          <div className={styles.imgphu}>
            <img
              style={{ width: "100px", height: "auto" }}
              src={product.img1}
              alt="sanpham"
            />
            <img
              style={{ width: "100px", height: "auto" }}
              src={product.img2}
              alt="sanpham"
            />
            <img
              style={{ width: "100px", height: "auto" }}
              src={product.img3}
              alt="sanpham"
            />
            <img
              style={{ width: "100px", height: "auto" }}
              src={product.img4}
              alt="sanpham"
            />
          </div>
          <div className={styles.imgchinh}>
            <img src={product.img1} alt="imgchinh" />
          </div>
        </div>
        <div className="detail">
          <h3>{product.name}</h3>
          <p style={{ color: "rgb(184,197,183" }}>
            {Number(product.price).toLocaleString()}VNĐ
          </p>
          <p
            style={{
              color: "rgb(184,197,183",
              fontFamily: "Times New Roman",
              fontSize: "14px",
            }}
          >
            {product.short_desc}
          </p>
          <p>
            CATEGORY :{" "}
            <span style={{ color: "rgb(146, 146, 146)" }}>
              {product.category}
            </span>
          </p>
          <div className={styles.dathang}>
            <p style={{ color: "rgb(146, 146, 146)" }}>QUANTITY</p>
            <span
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={giam}
            >
              &#9666;
            </span>{" "}
            <p>{soluong}</p>
            <span
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={tang}
            >
              &#9656;
            </span>
            <button
              className={styles.btn}
              onClick={() => addToCart(product, soluong)}
            >
              <p>Add to cart</p>
            </button>
          </div>
        </div>
        <div style={{ whiteSpace: "pre-line", marginTop: "50px" }}>
          <button
            onClick={hideDescription}
            style={{
              backgroundColor: "gray",
              border: "none",
              height: "30px",
              marginBottom: "10px",
              color: "white",
            }}
          >
            {show ? "Hide DESCRIPTION" : " DESCRIPTION"}
          </button>
          {show && (
            <p
              style={{
                color: "rgb(146, 146, 146)",
                fontFamily: "Times New Roman",
                fontSize: "14px",
              }}
            >
              {product.long_desc}
            </p>
          )}
        </div>
      </div>
      <h5>RELATED PRODUCT</h5>
      <div className={styles.thongtinsanphamlienquan}>
        {sanphamlienqua && sanphamlienqua.length > 1 ? (
          sanphamlienqua.map(
            (prod) =>
              !isProductDisplayed(prod._id.$oid) && (
                <div className={styles.related} key={prod._id.$oid}>
                  <Link to={`/detail/${prod._id.$oid}`}>
                    <img
                      src={prod.img1}
                      alt="sanpham"
                      style={{ width: "50px", height: "auto" }}
                      onClick={handleScrollToTop}
                    />
                    <p
                      style={{
                        color: "black",
                      }}
                    >
                      {prod.name}
                    </p>
                    <span style={{ color: "rgb(146, 146, 146)" }}>
                      {Number(prod.price).toLocaleString()}VNĐ
                    </span>
                  </Link>
                </div>
              )
          )
        ) : (
          <p>Không có sản phẩm </p>
        )}
      </div>
    </header>
  );
}

export default ProductDetail;

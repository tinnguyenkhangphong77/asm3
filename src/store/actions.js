// Các hằng số để định danh các action types
export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";
export const SET_PRODUCTS = "SET_PRODUCTS";

// Action creator để tạo action SHOW_POPUP với dữ liệu sản phẩm
export const showPopup = (productData) => ({
  type: SHOW_POPUP,
  payload: productData, // payload chứa dữ liệu cần thiết (trong trường này là thông tin sản phẩm)
});

// Action creator để tạo action HIDE_POPUP khi muốn ẩn Popup
export const hidePopup = () => ({
  type: HIDE_POPUP,
});

// Action creator để tạo action SET_PRODUCTS với danh sách sản phẩm
export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products, // payload chứa dữ liệu cần thiết (trong trường này là danh sách sản phẩm)
});

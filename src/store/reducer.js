// reducer.js
import { SHOW_POPUP, HIDE_POPUP, SET_PRODUCTS } from "./actions";

// Khởi tạo trạng thái ban đầu của ứng dụng
const initialState = {
  popupVisible: false, // Trạng thái hiển thị Popup
  productData: null, // Dữ liệu sản phẩm cho Popup
  products: [], // Danh sách sản phẩm
};

// Reducer nhận vào trạng thái hiện tại và action, trả về trạng thái mới
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_POPUP:
      // Khi action SHOW_POPUP được gửi, set popupVisible thành true và cập nhật productData
      return {
        ...state,
        popupVisible: true,
        productData: action.payload,
      };
    case HIDE_POPUP:
      // Khi action HIDE_POPUP được gửi, set popupVisible thành false và đặt productData thành null
      return {
        ...state,
        popupVisible: false,
        productData: null,
      };
    case SET_PRODUCTS:
      // Khi action SET_PRODUCTS được gửi, cập nhật danh sách sản phẩm trong trạng thái
      return {
        ...state,
        products: action.payload,
      };
    default:
      // Mọi action khác không làm thay đổi trạng thái
      return state;
  }
};

export default reducer;

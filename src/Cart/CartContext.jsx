// Import các module cần thiết từ React
import React, { createContext, useContext, useReducer } from "react";

// Tạo một context để chứa thông tin giỏ hàng
const CartContext = createContext();

// Component `CartProvider` sẽ giữ trạng thái giỏ hàng và action dispatch thông qua context
export const CartProvider = ({ children }) => {
  // Lấy giỏ hàng từ local storage hoặc sử dụng mảng rỗng nếu không tồn tại
  const storedCart = localStorage.getItem("cart");
  const initialState = { items: storedCart ? JSON.parse(storedCart) : [] };

  // Reducer xử lý các action thay đổi trạng thái giỏ hàng
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART": {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItemIndex = state.items.findIndex(
          (item) => item.product._id.$oid === action.payload.product._id.$oid
        );

        if (existingItemIndex !== -1) {
          // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
          const updatedItems = state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );

          return {
            ...state,
            items: updatedItems,
          };
        } else {
          // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
          return {
            ...state,
            items: [...state.items, action.payload],
          };
        }
      }
      // Xóa sản phẩm khỏi giỏ hàng
      case "REMOVE_FROM_CART":
        return {
          ...state,
          items: (state.items || []).filter(
            (item) => item.product._id.$oid !== action.payload
          ),
        };
      // Cập nhật số lượng khi click vào nút tăng hoặc giảm
      case "UPDATE_QUANTITY":
        return {
          ...state,
          items: (state.items || []).map((item) =>
            item.product._id.$oid === action.payload.productId
              ? { ...item, quantity: action.payload.newQuantity }
              : item
          ),
        };

      // Trường hợp mặc định, không thay đổi trạng thái
      default:
        return state;
    }
  };

  // Sử dụng useReducer để tạo ra state và dispatch dựa trên reducer và initial state
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Trả về CartContext.Provider để bọc component cha của nó và cung cấp giá trị context
  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook `useCart` để lấy giá trị từ context
export const useCart = () => {
  const context = useContext(CartContext);

  // Nếu context không tồn tại, báo lỗi
  if (!context) {
    throw new Error("useCart phải được sử dụng trong một CartProvider");
  }

  // Trả về giá trị context (cartState và dispatch)
  return context;
};

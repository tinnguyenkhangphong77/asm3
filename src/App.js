import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import Root from "./Pages/Root";
import ProductDetail from "./Products/ProductDetail";
import { CartProvider } from "./Cart/CartContext";
import Checkout from "./Pages/Checkout";
import Register from "./Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      { path: "detail/:productID", element: <ProductDetail /> },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;

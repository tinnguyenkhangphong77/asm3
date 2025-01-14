import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MainNavigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

function MainNavigation() {
  //lấy dữ liệu từ localstorage
  const name = JSON.parse(localStorage.getItem("register"));
  const login = JSON.parse(localStorage.getItem("login"));

  const navigate = useNavigate();
  // const logOut = () => {
  //   localStorage.removeItem("login");
  //   navigate("/");
  // };
  // const logOut = () => {
  //   localStorage.removeItem("login");
  //   localStorage.clear();
  //   navigate("/");
  // };
  const logOut = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("cart");
    navigate("/");
  };
  return (
    <>
      <header className={name ? styles.login : styles.header}>
        <nav>
          <ul className={styles.list}>
            <li>
              {/*xử dung isActive để thêm styles */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="shop"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Shop
              </NavLink>
            </li>

            <h3
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              BOUTIQUE
            </h3>
            <li>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </NavLink>
            </li>
            {/*nếu login thành công, sẽ hiển thị user + logout trên tab menu */}
            {login ? (
              <>
                <li onClick={logOut}>
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive ? styles.active : undefined
                    }
                  >
                    <FontAwesomeIcon icon={faUser} /> {name[0].fullname}
                  </NavLink>
                </li>
                <li onClick={logOut}>
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive ? styles.active : undefined
                    }
                  >
                    LogOut
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  <FontAwesomeIcon icon={faUser} /> Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
export default MainNavigation;

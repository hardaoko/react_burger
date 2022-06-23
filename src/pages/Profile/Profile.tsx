import styles from "./Profile.module.css";
import { NavLink, useMatch } from "react-router-dom";
import ProfileData from "../../components/ProfileData/ProfileData";
import { logout } from "../../services/actions/profile";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logout(refreshToken));
  };

  const activeLinkStyle = `${styles.link_active} ${styles.link} text text_type_main-medium`
  const linkStyle = `${styles.link} text text_type_main-medium`
  return (
    <article className={styles.container}>
      <nav className={`${styles.navigation} pl-4`}>
        <ul className={styles.list}>
          <li className={styles.list_item}>

            <NavLink
              className={({ isActive }) =>
                isActive ? activeLinkStyle : linkStyle
              }
              // activeClassName={styles.link_active}
              // className={`${styles.link} text text_type_main-medium`}
              to='/profile'

            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle
            }
            // activeClassName={styles.link_active}
            // className={`${styles.link} text text_type_main-medium`}
              to='/profile/orders'
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle
            }
            // activeClassName={styles.link_active}
            // className={`${styles.link} text text_type_main-medium`}
              to="/login"
              onClick={handleLogout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <ProfileData />
    </article>
  );
};

export default Profile;

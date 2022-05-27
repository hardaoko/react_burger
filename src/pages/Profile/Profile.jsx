import styles from "./Profile.module.css";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileData from "../../components/ProfileData/ProfileData";
import { logout } from "../../services/actions/profile";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logout(refreshToken));
  };

  return (
    <article className={styles.container}>
      <nav className={`${styles.navigation} pl-4`}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <NavLink
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
              to={`${url}`}
              exact
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
              to={`${url}/orders`}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.link_active}
              className={`${styles.link} text text_type_main-medium`}
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

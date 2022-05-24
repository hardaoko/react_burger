import styles from "./Profile.module.css";
import { NavLink, Route, useRouteMatch } from "react-router-dom";
import ProfileData from "../../components/ProfileData/ProfileData";

const Profile = () => {
  const { path, url } = useRouteMatch();

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
      <Route exact={true} path={`${path}`}>
        <ProfileData />
      </Route>
      <Route path={`${path}/orders`}>
        <div>Тут будут заказы</div>
      </Route>
    </article>
  );
};

export default Profile;

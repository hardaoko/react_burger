import styles from "./AppHeader.module.css";
import {
  ProfileIcon,
  ListIcon,
  BurgerIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const AppHeader = () => {
  const { isAuth, userName } = useSelector((store: any) => store.profile);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <NavLink
            exact
            to="/"
            activeClassName={styles.link_active}
            className={`${styles.link} p-4`}
          >
            <BurgerIcon type="secondary" />
            <p className={`${styles.link_text} text text_type_main-default`}>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to="/orders-feed"
            activeClassName={styles.link_active}
            className={`${styles.link} p-4`}
          >
            <ListIcon type="secondary" />
            <p className={`${styles.link_text} text text_type_main-default`}>
              Лента заказов
            </p>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo  />
        </div>

        <NavLink
          to="/profile"
          activeClassName={styles.link_active}
          className={`${styles.link} ${styles.account} p-4`}
        >
          <ProfileIcon type="secondary" />
          <p className={`${styles.link_text} text text_type_main-default`}>
            {isAuth && userName? userName: 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;

import styles from "./AppHeader.module.css";
import {
  ProfileIcon,
  ListIcon,
  BurgerIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader = () => {

  const activeLinkStyle = `${styles.link_active} ${styles.link} p-4`
  const linkStyle = `${styles.link} p-4`

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <NavLink

            to="/"
            className={({ isActive }) =>
                isActive ? activeLinkStyle : linkStyle
              }
          >
            <BurgerIcon type="secondary" />
            <p className={`${styles.link_text} text text_type_main-default`}>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to="/orders-list"
            className={({ isActive }) =>
                isActive ? activeLinkStyle : linkStyle
              }
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
          className={({ isActive }) =>
                isActive ? activeLinkStyle : linkStyle
              }
        >
          <ProfileIcon type="secondary" />
          <p className={`${styles.link_text} text text_type_main-default`}>
            Личный кабинет
          </p>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;

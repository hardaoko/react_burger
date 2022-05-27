import styles from "./AppHeader.module.css";
import {
  ProfileIcon,
  ListIcon,
  BurgerIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
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
            <BurgerIcon type="secondary" className={styles.icon} />
            <p className={`${styles.link_text} text text_type_main-default`}>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to="/orders-list"
            activeClassName={styles.link_active}
            className={`${styles.link} p-4`}
          >
            <ListIcon type="secondary" className={styles.icon} />
            <p className={`${styles.link_text} text text_type_main-default`}>
              Лента заказов
            </p>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo className={styles.logo} />
        </div>

        <NavLink
          to="/profile"
          activeClassName={styles.link_active}
          className={`${styles.link} ${styles.account} p-4`}
        >
          <ProfileIcon type="secondary" className={styles.icon} />
          <p className={`${styles.link_text} text text_type_main-default`}>
            Личный кабинет
          </p>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;

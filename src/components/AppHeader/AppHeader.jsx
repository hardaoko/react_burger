import React from "react";
import styles from "./AppHeader.module.css";
import { ProfileIcon, ListIcon , BurgerIcon, Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

const AppHeader = () => {

  return (
    <header className={styles.header}>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={clsx(styles.link, "p-4")}>
            <BurgerIcon type="secondary" />
            <p className={clsx(styles.link_text, "text", "text_type_main-default")}>Конструктор</p>
          </div>
          <div className={clsx(styles.link, "p-4")}>
            <ListIcon type="secondary" />
            <p className={clsx(styles.link_text, "text", "text_type_main-default")}>Лента заказов</p>
          </div>
        </div>

        <div className={styles.logo}>
          <Logo className={styles.logo}/>
        </div>

        <div className={clsx(styles.link, styles.account, "p-4")}>
          <ProfileIcon type="secondary" />
          <p className={clsx(styles.link_text, "text", "text_type_main-default")}>Личный кабинет</p>
        </div>

      </div>
    </header>
  );
};

export default AppHeader;

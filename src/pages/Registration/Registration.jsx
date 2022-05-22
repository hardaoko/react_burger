import React from "react";
import styles from "./Registration.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Registration = () => {
  const [email, setEmail] = React.useState("bob@example.com");
  const [password, setPassword] = React.useState("password");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <div className="mt-6 mb-6">
          <Input onChange={onChangeEmail} placeholder="e-mail" name={"email"} />
        </div>
        <div className="mb-6">
          <Input onChange={onChangeEmail} placeholder="Имя" name={"email"} />
        </div>
        <div className="mb-6">
          <PasswordInput onChange={onChangePassword} name={"password"} />
        </div>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вы — новый пользователь? "}
        <a href="" className={styles.link}>
          Зарегистрироваться
        </a>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        {"Забыли пароль? "}
        <a href="" className={styles.link}>
          Восстановить пароль
        </a>
      </p>
    </div>
  );
};

export default Registration;

import React, { useState } from "react";
import styles from "./Registration.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <div className="mt-6 mb-6">
          <Input
            onChange={onChangeName}
            placeholder="Имя"
            value={name}
            name={"name"}
          />
        </div>
        <div className="mb-6">
          <Input
            onChange={onChangeEmail}
            placeholder="E-mail"
            value={email}
            name={"email"}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={"password"}
          />
        </div>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Уже зарегистрированы? "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Registration;

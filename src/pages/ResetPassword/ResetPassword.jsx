import React, { useRef, useState } from "react";
import styles from "./ResetPassword.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const inputRef = useRef(null);

  const onIconClick = () => {
    setVisible(!visible);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value) => {
    setError(value.length < 6);
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = (e) => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    setVisible(false);
  };

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const onChangeEmailCode = (e) => {
    setEmailCode(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="mt-6 mb-6">
          <Input
            type={visible ? "text" : "password"}
            icon={visible ? "HideIcon" : "ShowIcon"}
            ref={inputRef}
            onChange={onChangeNewPassword}
            onIconClick={onIconClick}
            onBlur={onBlur}
            onFocus={onFocus}
            value={newPassword}
            placeholder="Введите новый пароль"
            name={"newPassword"}
            error={error}
            errorText={"Некорректный пароль"}
          />
        </div>
        <div className="mb-6">
          <Input
            onChange={onChangeEmailCode}
            placeholder="Введите код из письма"
            value={emailCode}
            name={"emailCode"}
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вспомнили пароль? "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;

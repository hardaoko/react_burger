import React, { useEffect, useRef, useState } from "react";
import styles from "./ResetPassword.module.css";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getPasswordReset } from "../../services/actions/profile";
import { useMyDispatch, useMySelector } from "../../utils/types";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const { emailCodeSuccess, passwordResetSuccess } = useMySelector((store) => store.profile
  );
  const dispatch = useMyDispatch();
  const history = useHistory();

  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setVisible(!visible);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validateField = (value: string) => {
    setError(value.length < 6);
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    setVisible(false);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (token && password) {
      dispatch(getPasswordReset(password, token));
    }
  };

  useEffect(() => {
    passwordResetSuccess
      ? history.push("/login")
      : !emailCodeSuccess && history.push("/forgot-password");
  }, [emailCodeSuccess, passwordResetSuccess, history]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="mt-6 mb-6">
          <Input
            type={visible ? "text" : "password"}
            icon={visible ? "HideIcon" : "ShowIcon"}
            ref={inputRef}
            onChange={onChangePassword}
            onIconClick={onIconClick}
            onBlur={onBlur}
            onFocus={onFocus}
            value={password}
            placeholder="Введите новый пароль"
            name={"password"}
            error={error}
            errorText={"Некорректный пароль"}
          />
        </div>
        <div className="mb-6">
          <Input
            onChange={onChangeToken}
            placeholder="Введите код из письма"
            value={token}
            name={"token"}
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

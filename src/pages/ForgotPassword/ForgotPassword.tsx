import React, { useEffect, useState } from "react";
import styles from "./ForgotPassword.module.css";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { getEmailCode } from "../../services/actions/profile";
import { AppDispatch, useMySelector } from "../../utils/types";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { emailCodeSuccess } = useMySelector((store) => store.profile);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      dispatch(getEmailCode(email));
    }
  };

  useEffect(() => {
    emailCodeSuccess && history.push("/reset-password");
  }, [emailCodeSuccess, history]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="mt-6 mb-6">
          <Input
            onChange={onChangeEmail}
            placeholder="Укажите e-mail"
            value={email}
            name={"email"}
          />
        </div>
        <Button type="primary" size="medium">
          Восстановить
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

export default ForgotPassword;

import styles from "./ProfileData.module.css";
import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setUserData } from "../../services/actions/profile";
import { AppDispatch, RootState } from "../../utils/types";

const ProfileData = () => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { userName, userEmail, userPassword, accessToken } = useSelector(
    (store: RootState) => store.profile
  );
  const dispatch: AppDispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const onNameClick = () =>
    nameRef.current && nameRef.current.focus();

  const onEmailClick = () =>
   emailRef.current && emailRef.current.focus();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsDataChanged(true);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsDataChanged(true);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsDataChanged(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUserData(accessToken, name, email, password));
    setIsDataChanged(false);
  };

  const onCancelEditing = () => {
    setIsDataChanged(false);
  };

  useEffect(() => {
    dispatch(getUserData(accessToken));
    setEmail(userEmail);
    setName(userName);
    setPassword(userPassword || "");
  }, [userEmail, userName, userPassword, accessToken, dispatch]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        placeholder={"Имя"}
        onChange={onChangeName}
        icon={"EditIcon"}
        value={name}
        name={"name"}
        ref={nameRef}
        disabled={false}
        onIconClick={onNameClick}
      />
      <Input
        placeholder={"Логин"}
        onChange={onChangeEmail}
        icon={"EditIcon"}
        value={email}
        name={"email"}
        ref={emailRef}
        onIconClick={onEmailClick}
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
      />
      {isDataChanged && (
        <div className={styles.buttons_container}>
          <Button onClick={onCancelEditing} type="secondary" size="medium">
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileData;

import styles from "./ProfileData.module.css";
import { useState, useRef, useEffect } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserEmail,
  setUserName,
  setUserPassword,
} from "../../services/actions/profile";

const ProfileData = () => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { userName, userEmail, userPassword } = useSelector(
    (store) => store.profile
  );
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onNameClick = () =>
    null !== emailRef.current && nameRef.current.focus();

  const onEmailClick = () =>
    null !== emailRef.current && emailRef.current.focus();

  const onPasswordClick = () =>
    null !== passwordRef.current && passwordRef.current.focus();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserName(name));
    dispatch(setUserEmail(email));
    dispatch(setUserPassword(password));
    setIsDataChanged(false);
  };

  const onCancelEditing = () => {
    setEmail(userEmail);
    setName(userName);
    setPassword(userPassword);
    setIsDataChanged(false);
  };

  useEffect(() => {
    if (name !== userName || email !== userEmail || password !== userPassword)
      setIsDataChanged(true);
  }, [name, email, password]);

  useEffect(() => {
    setEmail(userEmail);
    setName(userName);
    setPassword(userPassword);
  }, []);

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

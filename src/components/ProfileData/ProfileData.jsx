import styles from "./ProfileData.module.css";
import { useState, useRef, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserEmail,
  setUserName,
  setUserPassword,
} from "../../services/actions/profile";

const ProfileData = () => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [nameDisabled, setNameDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
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

  const onNameClick = () => {
    null !== nameRef.current && nameRef.current.focus();
    setNameDisabled(false);
  };

  const onEmailClick = () =>
    null !== emailRef.current && emailRef.current.focus();

  const onPasswordClick = () =>
    null !== passwordRef.current && passwordRef.current.focus();

  const onNameChange = (e) => {
    dispatch(setUserName(e.target.value));
  };

  const onEmailChange = (e) => {
    dispatch(setUserEmail(e.target.value));
  };

  const onPasswordChange = (e) => {
    dispatch(setUserPassword(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onCancelEditing = () => {};

  useEffect(() => {
    setEmail(userEmail);
    setName(userName);
    setPassword(userPassword);
  }, [userName, userEmail, userPassword]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        placeholder={"Имя"}
        onChange={onNameChange}
        icon={"EditIcon"}
        value={userName}
        name={"name"}
        ref={nameRef}
        disabled={nameDisabled}
        onIconClick={onNameClick}
        onBlur={() => setNameDisabled(true)}
      />
      <Input
        placeholder={"Логин"}
        onChange={onEmailChange}
        icon={"EditIcon"}
        value={userEmail}
        name={"email"}
        ref={emailRef}
        onIconClick={onEmailClick}
      />
      <Input
        placeholder={"Пароль"}
        onChange={onPasswordChange}
        icon={"EditIcon"}
        value={userPassword}
        name={"password"}
        ref={passwordRef}
        onIconClick={onPasswordClick}
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

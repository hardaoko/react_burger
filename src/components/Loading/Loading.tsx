import styles from "./Loading.module.css";
import { FC } from "react";

export interface ILoading {
  size?: 'small' | 'large' | `default`
  color?: 'light' | `dark`
}

const Loading: FC<ILoading> = ({size, color}) => {
  const styleSize: string = size ===`small` ? styles.small : size ===`large` ? styles.large : ''
  const styleColor: string = color ===`dark` ? styles.dark : styles.light
  return (
    <div className={styles.container}>
      <div className={`${styles.loader} ${styleSize} ${styleColor}`} ></div>
    </div>
  )
};

export default Loading;

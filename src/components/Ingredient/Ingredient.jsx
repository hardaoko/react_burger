import styles from "./Ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

const Ingredient = (props) => {
  const {image, price, name} = props.item;

  return (
    <li className={styles.item}>
      <div className={styles.link} >
        <img alt={name} src={image} className={clsx(styles.image, "ml-4", "mr-4")}/>
        <div className={clsx(styles.price, "mt-1", "mb-1")}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <span className={clsx(styles.text, "text", "text_type_main-default")}>
          {name}
        </span>
        <Counter count={4} size="default"/>
      </div>
    </li>
  );
};

export default Ingredient;

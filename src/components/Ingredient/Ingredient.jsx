import styles from "./Ingredient.module.css";
import { CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

const Ingredient = (props) => {
  const {image, price, name} = props.item;

  return (
    <li className={styles.item}>
      <div className={styles.link} >
        <img alt={name} src={image} className={clsx(styles.image, "ml-4", "mr-4")}/>
        <div className={clsx(styles.price, "mt-4", "mb-4")}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <h3 className={clsx(styles.text, "text", "text_type_main-default")}>
          {name}
        </h3>
      </div>
    </li>
  );
};

export default Ingredient;

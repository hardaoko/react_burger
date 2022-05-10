import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerDataType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

const Ingredient = ({ item, onOpen }) => {
  const { image, price, name, _id, type } = item;
  const { chosenIngredients } = useSelector((store) => store.ingredients);
  const number =
    chosenIngredients.filter((item) => item.element._id === _id).length *
    (type === "bun" ? 2 : 1);

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: item,
  });

  return (
    <li className={styles.item}>
      <div className={styles.link} onClick={onOpen} ref={dragRef}>
        <img alt={name} src={image} className={`${styles.image} ml-4 mr-4`} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`${styles.text} text text_type_main-default`}>
          {name}
        </span>
      </div>
      {number !== 0 && <Counter count={number} size="default" />}
    </li>
  );
};

Ingredient.propTypes = {
  item: burgerDataType.isRequired,
};

export default Ingredient;

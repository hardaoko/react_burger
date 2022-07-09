import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IBurgerData, IChosenIngredient, RootState } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";

interface IIngredient {
  item: IBurgerData,
  onOpen: () => void
}

const Ingredient:FC<IIngredient> = ({ item, onOpen }) => {
  const { image, price, name, _id, type } = item;
  const location = useLocation();
  const { chosenIngredients } = useSelector((store: RootState) => store.ingredients);
  const number =
    chosenIngredients.filter((item: IChosenIngredient) => item.element._id === _id).length *
    (type === "bun" ? 2 : 1);

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: item,
  });

  return (
    <li className={styles.item} ref={dragRef}>
      <Link
        to={{
          pathname: `/ingredients/${_id}`,
          state: { background: location },
        }}
      >
        <div className={styles.link} onClick={onOpen}>
          <img alt={name} src={image} className={`${styles.image} ml-4 mr-4`} />
          <div className={`${styles.price} mt-1 mb-1`}>
            <span
              className={`${styles.text_color} text text_type_digits-default mr-2`}
            >
              {price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <span
            className={`${styles.text} ${styles.text_color} text text_type_main-default `}
          >
            {name}
          </span>
        </div>
        {number !== 0 && <Counter count={number} size="default" />}
      </Link>
    </li>
  );
};


export default Ingredient;

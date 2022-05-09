import styles from "./Ingredient.module.css";
import PropTypes from "prop-types";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerDataType } from '../../utils/types';
import { useDrag } from "react-dnd";

const Ingredient = ({item, onOpen, number}) => {
  const {image, price, name} = item;

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: item,
  });

  return (
    <li className={styles.item} ref={dragRef}>
      <div className={styles.link} onClick={onOpen}>
        <img alt={name} src={image} className={`${styles.image} ml-4 mr-4`}/>
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <span className={`${styles.text} text text_type_main-default`}>
          {name}
        </span>
        { number !== 0 &&
          <Counter count={number} size="default"/>}
      </div>
    </li>
  );
};

Ingredient.propTypes = {
  item: burgerDataType.isRequired,
  number: PropTypes.number.isRequired
};

export default Ingredient;

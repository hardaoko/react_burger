import PropTypes from 'prop-types'
import styles from "./Ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from 'react'
import Modal from '../Modal/Modal'
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const Ingredient = props => {
  const {image, price, name} = props.item;
  const [isVisible, setIsVisible] = useState(false)

  const openModal = () => {
    setIsVisible(true)
  }

  const CloseModal = () => {
    setIsVisible(false)
  }

  const modal = (
    <Modal onClose={CloseModal} title='Детали ингредиента'>
      <IngredientDetails item={props.item}/>
    </Modal>
  );

  return (
    <li className={styles.item}>
      {isVisible && modal}
      <div className={styles.link} onClick={openModal}>
        <img alt={name} src={image} className={`${styles.image} ml-4 mr-4`}/>
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <span className={`${styles.text} text text_type_main-default`}>
          {name}
        </span>
        <Counter count={4} size="default"/>
      </div>
    </li>
  );
};

Ingredient.propTypes = {
  item: PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    uuid: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string
  })
};

export default Ingredient;

import {useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import Ingredient from "../Ingredient/Ingredient";
import Modal from '../Modal/Modal'
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  const [modalVisible, setModalVisible] = useState(false);
  const [itemDetails, setItemDetails] = useState({})
  const {ingredients} = useSelector(state => state.ingredients)

  const closeModal = () => {
    setModalVisible(false)
  }

  const modal = (
    <Modal onClose={closeModal} title='Детали ингредиента'>
      <IngredientDetails item={itemDetails}/>
    </Modal>
  ); 

  return (
    <div className={styles.container}>
      {modalVisible && modal}
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <div className = {styles.tab_container}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_container} `}>
        <h2 id="bun" className="mb-6 mt-10 text text_type_main-medium">
          Булки
        </h2>
        <ul className={styles.list}>
          {ingredients.map(item=> item.type === 'bun' &&
          <Ingredient key={item._id} item={item} number={0} onOpen={()=> {
            setModalVisible(true);
            setItemDetails(item)}}/>
          )}
        </ul>
        <h2 id="sauce" className="mb-6 mt-10 text text_type_main-medium">
          Соусы
        </h2>
        <ul className={styles.list}>
          {ingredients.map(item=> item.type === 'sauce' &&
          <Ingredient key={item._id} item={item} number={1} onOpen={()=> {
            setModalVisible(true);
            setItemDetails(item)}}/>
          )}
        </ul>
        <h2 id="main" className="mb-6 mt-10 text text_type_main-medium">
          Начинки
        </h2>
        <ul className={styles.list}>
          {ingredients.map(item=> item.type === 'main' &&
          <Ingredient key={item._id} item={item} number={2} onOpen={()=> {
            setModalVisible(true);
            setItemDetails(item)}}/>
         )}
        </ul>
      </div>
    </div>
  );
};

export default BurgerIngredients;

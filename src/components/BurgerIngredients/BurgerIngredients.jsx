import {useRef, useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import Ingredient from "../Ingredient/Ingredient";
import Modal from '../Modal/Modal'
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_DETAILS_OPEN } from "../../services/actions";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  const {ingredients, modalDetailsVisible} = useSelector(state => state.ingredients)

  const refBun = useRef(null);
  const refSauce = useRef(null);
  const refMain = useRef(null);

  const dispatch = useDispatch()

  const modal = (
    <Modal title='Детали ингредиента'>
      <IngredientDetails />
    </Modal>
  );

  const scrollPosition = (e) => {
    if ((e.target.scrollTop + refBun.current.offsetTop) < refSauce.current.offsetTop) {
        setCurrent('bun');
        return
    }

    if ((e.target.scrollTop + refBun.current.offsetTop) < refMain.current.offsetTop) {
        setCurrent('sauce');
        return
    }
    setCurrent('main');

}

  return (
    <div className={styles.container}>
      {modalDetailsVisible && modal}
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
      <div className={`${styles.ingredients_container} `} onScroll={scrollPosition}>
        <h2 id="bun" className="mb-6 mt-10 text text_type_main-medium" ref={refBun}>
          Булки
        </h2>
        <ul className={styles.list}>
          {ingredients.map(item=> item.type === 'bun' &&
          <Ingredient key={item._id} item={item} onOpen={()=> {
            dispatch({type: MODAL_DETAILS_OPEN, item: item});}}/>
          )}
        </ul>
        <h2 id="sauce" className="mb-6 mt-10 text text_type_main-medium" ref={refSauce}>
          Соусы
        </h2>
        <ul className={styles.list}>
          {ingredients.map(item=> item.type === 'sauce' &&
          <Ingredient key={item._id} item={item} onOpen={()=> {
            dispatch({type: MODAL_DETAILS_OPEN, item: item});}}/>
          )}
        </ul>
        <h2 id="main" className="mb-6 mt-10 text text_type_main-medium"ref={refMain}>
          Начинки
        </h2>
        <ul className={styles.list}>
          {ingredients.map(item=> item.type === 'main' &&
          <Ingredient key={item._id} item={item} onOpen={()=> {
            dispatch({type: MODAL_DETAILS_OPEN, item: item});}}/>
         )}
        </ul>
      </div>
    </div>
  );
};

export default BurgerIngredients;

import {useCallback, useMemo, useState} from 'react'
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { useSelector, useDispatch } from 'react-redux';
import { addBun, addIngredients, getOrder } from '../../services/actions';
import { useDrop } from 'react-dnd';

const BurgerConstructor = () => {

  const [isVisible, setIsVisible] = useState(false)

  const {chosenIngredients, orderData} = useSelector(store => store.ingredients )

  const dispatch = useDispatch()

  const bun = useMemo(()=>{
    return (chosenIngredients.length === 0 ? undefined : chosenIngredients.find(item => item.type === "bun"))
  }, [chosenIngredients.length])

  const ingredients = useMemo(() => {
    return (chosenIngredients.length === 0 ? undefined : chosenIngredients.filter(item => item.type !== "bun"))
  }, [chosenIngredients.length])

  const finalCost = useMemo(() => {
    return (chosenIngredients.length === 0 ?
      0 :
      ingredients.reduce((prev, next) => {
          return prev + next.price
      }, 0) + bun.price * 2)
  }, [chosenIngredients.length, ingredients, bun])

  const createOrder = async () => {
    dispatch(getOrder(chosenIngredients))
  }

  const openModal = async () => {
    await createOrder()
    setIsVisible(true)
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails order={orderData}/>
    </Modal>
  );

  /** Обработка броска карточки */
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item){
      // item.type = "bun" ?
      // dispatch(addBun(chosenIngredients, item)) :
      dispatch(addIngredients(chosenIngredients, item));
    },
    collect: monitor => ({
        isHover: monitor.isOver(),
    })
  });

  const IngredientSection = useCallback(() => {
    return (
      <ul className={`${styles.list} pr-4 pl-4 mt-5`}>
        {ingredients.map(item => {
          return (
            <li className={`${styles.item} mb-5`} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        )})}
      </ul>
    )
  }, [ingredients])

  const BunElement = ({bun, side}) => {
    console.log('chsn', chosenIngredients);
    return (
      <div className={`${styles.item}  ${side==="top" ? "mt-25 ml-10" : "mt-3 ml-10"}`}>
        <ConstructorElement
          type={side}
          isLocked={true}
          text={`${bun.name} ${side==="top" ? "(верх)" : "(низ)"}`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    )
  }


  return (
    <div className={styles.container} ref={dropTarget}>
      {  isVisible && modal }

      { bun !== undefined ? <BunElement bun={bun} side="top"/> :
        <div className={`${styles.tip} mt-25 mb-15 ml-10 text text_type_main-large`}>Выберите булку</div>}
      { bun !== undefined && <IngredientSection /> }

      { bun !== undefined && <BunElement bun={bun} side="bottom"/> }

      <div className={`${styles.button_container} pt-5 pr-5`}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">{finalCost}</span>
          <CurrencyIcon type="primary"/>
        </div>
          <Button type="primary" size="medium" onClick={openModal} disabled={bun===undefined}>Оформить заказ</Button>
      </div>
    </div>
  )
}


export default BurgerConstructor
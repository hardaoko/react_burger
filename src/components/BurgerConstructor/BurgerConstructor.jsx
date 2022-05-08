import {useCallback, useMemo, useState} from 'react'
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { baseUrl } from '../../utils/constants';
import { checkResponse } from '../App/App';
import { useSelector } from 'react-redux';

const BurgerConstructor = () => {

  const [isVisible, setIsVisible] = useState(false)
  const [orderData, setOrderData] = useState(0)

  const {chosenIngredients} = useSelector(state => state.ingredients )
  console.log('burgerData', chosenIngredients)

  const bun = useMemo(()=>{
    return (chosenIngredients.length === 0 ? undefined :  chosenIngredients.find(item => item.type === "bun"))
  }, [chosenIngredients])

  const ingredients = useMemo(() => {
    return (chosenIngredients.length === 0 ? undefined : chosenIngredients.filter(item => item.type !== "bun"))
  }, [chosenIngredients])

  const finalCost = useMemo(() => {
    return (chosenIngredients.length === 0 ?
      0 :
      ingredients.reduce((prev, next) => {
          return prev + next.price
      }, 0) + bun.price * 2)
  }, [chosenIngredients, ingredients, bun])

  const createOrder = async () => {
    let requestData = [];
    ingredients.map((item) => {return requestData.push(item._id)});
    requestData.push(bun._id);
    try {
      const url = baseUrl + "orders";
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:  JSON.stringify({ingredients: requestData})
      });

      //checkResponse(res)

      const data = await res.json();
      if (data && data.success === true) {
        setOrderData(data.order.number);
      } else {
          throw new Error("DataConfirmError");
      }

    }
    catch (e) {
      console.log(e)
    }
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
    <div className={styles.container}>
      { isVisible && modal }

      { bun !== undefined ? <BunElement bun={bun} side="top"/> :
        <div className={`mt-25 mb-15 ml-10 text text_type_main-large`}>Выберите булку</div>}

      { bun !== undefined && <IngredientSection /> }

      { bun !== undefined && <BunElement bun={bun} side="bottom"/> }

      <div className={`${styles.button_container} pt-5 pr-5`}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">{finalCost}</span>
          <CurrencyIcon type="primary"/>
        </div>
          <Button type="primary" size="medium" onClick={openModal}>Оформить заказ</Button>
      </div>
    </div>
  )
}


export default BurgerConstructor
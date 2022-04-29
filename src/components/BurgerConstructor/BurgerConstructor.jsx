import {useCallback, useContext, useMemo, useState} from 'react'
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { BurgerContext } from '../../utils/BurgerContext';

const BurgerConstructor = () => {

  const [isVisible, setIsVisible] = useState(false)
  const [orderData, setOrderData] = useState(0)
  const burgerData = useContext(BurgerContext)

  const bun = useMemo(()=>{
    return burgerData.filter(item => item.type === "bun")
  }, [burgerData])[1]

  const ingredients = useMemo(() => {
    return burgerData.filter(item => item.type !== "bun");
  }, [burgerData])

  const finalCost = useMemo(() => {
    return ingredients.reduce((prev, next) => {
        return prev + next.price
    }, 0) + bun.price * 2
  }, [ingredients, bun])

  const createOrder = async () => {
    let requestData = [];
    ingredients.map((item) => {return requestData.push(item._id)});
    requestData.push(bun._id);
    try {
      const url = 'https://norma.nomoreparties.space/api/orders';
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:  JSON.stringify({ingredients: requestData})
      });
      if (!res.ok) {
        throw new Error("response is not ok");
      } else {
        console.log(res)
        const data = await res.json();
        console.log(data)
        if (data && data.success === true) {
          setOrderData(data.order.number);
        } else {
            throw new Error("DataConfirmError");
        }
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
      <ul className={`${styles.list} pr-4 pl-4`}>
        {ingredients.map(item => {
          return (
            <li className={`${styles.item} mt-5`} key={item._id}>
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

  return (
    <div className={styles.container}>
      {isVisible && modal}
      <div className={`${styles.item} mt-25 ml-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <IngredientSection />

      <div className={`${styles.item} mt-5 ml-10`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

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
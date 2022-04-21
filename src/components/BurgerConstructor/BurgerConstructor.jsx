import {useState} from 'react'
import PropTypes from 'prop-types'
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'

const BurgerConstructor = props => {

  const [isVisible, setIsVisible] = useState(false)

  const openModal = () => {
    setIsVisible(true)
  }

  const CloseModal = () => {
    setIsVisible(false)
  }

  const modal = (
    <Modal onClose={CloseModal}>
      <OrderDetails/>
    </Modal>
  );

  return (
    <div className={styles.container}>
      {isVisible && modal}
      <div className={`${styles.item} mt-25 pl-8`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${props.burgerData[0].name} (верх)`}
          price={props.burgerData[0].price}
          thumbnail={props.burgerData[0].image}
        />
      </div>

      <ul className={`${styles.list} pr-4 pl-4`}>

        <li className={`${styles.item} mt-5`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.burgerData[5].name}
            price={props.burgerData[5].price}
            thumbnail={props.burgerData[5].image}
          />
        </li>
        <li className={`${styles.item} mt-5`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.burgerData[4].name}
            price={props.burgerData[4].price}
            thumbnail={props.burgerData[4].image}
          />
        </li>
        <li className={`${styles.item} mt-5`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.burgerData[7].name}
            price={props.burgerData[7].price}
            thumbnail={props.burgerData[7].image}
          />
        </li>
        <li className={`${styles.item} mt-5`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.burgerData[8].name}
            price={props.burgerData[8].price}
            thumbnail={props.burgerData[8].image}
          />
        </li>
        <li className={`${styles.item} mt-5`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.burgerData[8].name}
            price={props.burgerData[8].price}
            thumbnail={props.burgerData[8].image}
          />
        </li>
        <li className={`${styles.item} mt-5`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={props.burgerData[11].name}
            price={props.burgerData[11].price}
            thumbnail={props.burgerData[11].image}
          />
        </li>
      </ul>

      <div className={`${styles.item} mt-5 pl-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${props.burgerData[0].name} (низ)`}
          price={props.burgerData[0].price}
          thumbnail={props.burgerData[0].image}
        />
      </div>

      <div className={`${styles.button_container} pt-5 pr-5`}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">{3800}</span>
          <CurrencyIcon type="primary"/>
        </div>
          <Button type="primary" size="medium" onClick={openModal}>Оформить заказ</Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {}

export default BurgerConstructor
import React from 'react'
import PropTypes from 'prop-types'
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = props => {
  return (
    <div className={styles.container}>
      <ul className={`${styles.list} mt-25 pr-4 pl-4`}>
        <li className={`${styles.item} mt-5 pl-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${props.burgerData[0].name} (верх)`}
            price={props.burgerData[0].price}
            thumbnail={props.burgerData[0].image}
          />
        </li>
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
        <li className={`${styles.item} mt-5 pl-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${props.burgerData[0].name} (низ)`}
            price={props.burgerData[0].price}
            thumbnail={props.burgerData[0].image}
          />
        </li>
      </ul>
    </div>
  )
}

BurgerConstructor.propTypes = {}

export default BurgerConstructor
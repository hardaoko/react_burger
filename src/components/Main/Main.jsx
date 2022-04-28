import React from 'react'
import styles from './Main.module.css'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

const Main = ({error, isLoaded, burgerData}) => {
  return (
    <main className={styles.main}>
      {
        error === '' ?
        isLoaded &&
        <>
          <BurgerIngredients burgerData={burgerData}/>
          <BurgerConstructor burgerData={burgerData}/>
        </> :
        <span className={`${styles.error} text text_type_main-default text_color_inactive`}>Ошибка при загрузке данных</span>
      }
    </main>
  )
}

export default Main
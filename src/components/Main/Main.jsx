import React from 'react'
import styles from './Main.module.css'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

const Main = ({error, isLoaded}) => {
  return (
    <main className={styles.main}>
      {
        error === '' ?
        isLoaded &&
        <>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </> :
        <span className={`${styles.error} text text_type_main-default text_color_inactive`}>Ошибка при загрузке данных</span>
      }
    </main>
  )
}

export default Main
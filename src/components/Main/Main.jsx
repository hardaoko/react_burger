import styles from './Main.module.css'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { useSelector } from 'react-redux'

const Main = () => {
  const {ingredientsRequest, ingredientsFailed} = useSelector(state => state.ingredients)

  return (
    <main className={styles.main}>
      {
        !ingredientsFailed ?
        !ingredientsRequest &&
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
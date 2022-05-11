import styles from './Main.module.css'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Main = () => {
  const {ingredientsRequest, ingredientsFailed} = useSelector(state => state.ingredients)

  return (
    <main className={styles.main}>
      {
        !ingredientsFailed ?
        !ingredientsRequest &&
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>
        </> :
        <span className={`${styles.error} text text_type_main-default text_color_inactive`}>Ошибка при загрузке данных</span>
      }
    </main>
  )
}



export default Main
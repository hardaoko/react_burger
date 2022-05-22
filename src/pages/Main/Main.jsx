import styles from "./Main.module.css";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

const Main = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );

  return (
    <main className={styles.main}>
      {!ingredientsFailed ? (
        !ingredientsRequest && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        )
      ) : (
        <span
          className={`${styles.error} text text_type_main-default text_color_inactive`}
        >
          Ошибка при загрузке данных
        </span>
      )}
    </main>
  );
};

export default Main;

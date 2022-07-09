import styles from "./Main.module.css";
import { useSelector } from "react-redux";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { RootState } from "../../utils/types";

const Main = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state: RootState) => state.ingredients
  );

  return (
    <main className={styles.main}>
      {!ingredientsFailed ? (
        !ingredientsRequest && (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
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

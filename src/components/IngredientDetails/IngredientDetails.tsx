import styles from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FC } from "react";
import { IBurgerData, IIngredientDetailsProps, RootState } from "../../utils/types";

const IngredientDetails:FC<IIngredientDetailsProps> = ({ title }) => {
  const { id } = useParams();
  const { ingredients, ingredientsFailed, ingredientsRequest } = useSelector(
    (store: RootState) => store.ingredients
  );

  if (ingredientsFailed || ingredientsRequest || ingredients.length === 0) {
    return <div></div>;
  }

  const selectedIngredient = ingredients.find(
    (ingredient: IBurgerData) => ingredient._id === id
  );

  return (
    <div className={styles.container}>
      {title && <h2 className={`text text_type_main-large mt-25`}>{title}</h2>}
      <img src={selectedIngredient?.image_large} alt={selectedIngredient?.name} className={styles.image} />
      <p className="text text_type_main-medium pt-4 pb-8">{selectedIngredient?.name}</p>
      <ul className={`${styles.list} pt-8 text_color_inactive`}>
        <li className={styles.listItem}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <p className="text text_type_digits-default">{selectedIngredient?.calories}</p>
        </li>
        <li className={styles.listItem}>
          <span className="text text_type_main-default">Белки, г</span>
          <p className="text text_type_digits-default">{selectedIngredient?.proteins}</p>
        </li>
        <li className={styles.listItem}>
          <span className="text text_type_main-default">Жиры, г</span>
          <p className="text text_type_digits-default">{selectedIngredient?.fat}</p>
        </li>
        <li className={styles.listItem}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <p className="text text_type_digits-default">{selectedIngredient?.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IngredientDetails;

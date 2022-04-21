import styles from "./OrderDetails.module.css";


const IngredientDetails = (props) => {
  const {image_large, carbohydrates, name, calories, proteins, fat} = props.item;
  return (
    <div className={styles.container}>
      <title className="text text_type_digits-large">567890</title>
      <p className="text text_type_main-medium">
        Идентификатор заказа
      </p>
    </div>

  );
};

export default IngredientDetails;

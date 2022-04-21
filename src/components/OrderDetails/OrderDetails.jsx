import styles from "./OrderDetails.module.css";
import CheckIcon from '../../images/done.svg'

const IngredientDetails = () => {

  return (
    <div className={styles.container}>
      <p className={`${styles.number} text text_type_digits-large`}>123456</p>
      <p className="text text_type_main-medium mt-8">
        идентификатор заказа
      </p>
      <img src={CheckIcon} alt='' className='mt-15'/>
      <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mt-2 mb-10">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>

  );
};

export default IngredientDetails;

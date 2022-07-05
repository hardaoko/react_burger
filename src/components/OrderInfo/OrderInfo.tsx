import {FC} from 'react';
import styles from './OrderInfo.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { IBurgerData } from '../../utils/types';

const OrderInfo: FC = () => {
  const ingredients = useSelector((state:any) => state.ingredients.ingredients)

  const orderNumber: number = 156482
  const orderName: string = "Бутерброд Butterbroad"
  const status: string = "Выполнен"
  const date: string = "Сегодня, 16:20 i-GMT+3"
  const summ: number = 480

  return (
    <div className={styles.container} >
      <h2 className={`${styles.order_number} text text_type_digits-default mb-10 `}>
          #{ orderNumber }
      </h2>
      <h2 className="text text_type_main-medium mb-3">
        {orderName}
      </h2>
      <h3 className={`text text_type_main-default mb-15 ${styles.order_status}`}>
        {status}
      </h3>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.list}>
        {
          ingredients.map((ingredient: IBurgerData, index: number) => {
            return (
              <li key={index} className={`${styles.list_item} mb-4 `}>
                <img className={styles.image} src={ingredient.image} alt=""/>
                <h3
                  className={`text text_type_main-default ${styles.title}`}>{ingredient.name}</h3>
                <div className={`text text_type_digits-default ${styles.item_currency}`}>
                  <span>
                    {
                      ingredients.filter((item: IBurgerData) => item?._id === ingredient._id).length
                    }
                  </span>
                  x
                  <div className={`${styles.item_currency_container} mr-6`}>
                    <span>{ingredient.price}</span>
                    <CurrencyIcon type="primary"/>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
        <div className={styles.currency_container}>
          <span className="text text_type_digits-default">
            {summ}
          </span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;

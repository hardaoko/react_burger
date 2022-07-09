import {FC} from 'react';
import styles from './OrderInfo.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { IBurgerData, RootState } from '../../utils/types';
import { useParams } from 'react-router';
import { Console } from 'console';

const OrderInfo: FC = () => {
  const ingredientsMenu = useSelector((state: RootState) => state.ingredients.ingredients)

  const {orderInfo} = useSelector((state: RootState) => state.orders)
  console.log(orderInfo?.ingredients)

  const uniqueIngredients = orderInfo?.ingredients.filter(function(item, pos) {
    return orderInfo?.ingredients.indexOf(item) == pos;
  })

  const findIngredient = (ingredient: string, ingredients: IBurgerData[]) => {
    return ingredients.find((item:IBurgerData) => item._id === ingredient)
  }

  const calculateTotalCost = () => {
    let totalCost = 0;
    orderInfo?.ingredients.map((itemId: string)=>{
      const find = ingredientsMenu.find((item: IBurgerData) => item._id === itemId)
      if (find?.price) {
        totalCost += find.price
      }
    })
    return totalCost
  }

  return (
    <div className={styles.container} >
      <h2 className={`${styles.order_number} text text_type_digits-default mb-10 `}>
          #{ orderInfo?.number }
      </h2>
      <h2 className="text text_type_main-medium mb-3">
        {orderInfo?.name}
      </h2>
      <h3 className={`text text_type_main-default mb-15 ${styles.order_status}`}>
        {orderInfo?.status}
      </h3>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.list}>
        {
          uniqueIngredients?.map((ingredientId: string, index: number) => {
            const ingredient = findIngredient(ingredientId, ingredientsMenu)
            console.log('ingredient', ingredient)
            return (
              <li key={index} className={`${styles.list_item} mb-4 `}>
                <img className={styles.image} src={ingredient?.image} alt=""/>
                <h3
                  className={`text text_type_main-default ${styles.title}`}>{ingredient?.name}</h3>
                <div className={`text text_type_digits-default ${styles.item_currency}`}>
                  <span>
                    {
                      orderInfo?.ingredients.filter((item: string) => item === ingredient?._id).length
                    }
                  </span>
                  x
                  <div className={`${styles.item_currency_container} mr-6`}>
                    <span>{ingredient?.price}</span>
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
          {orderInfo?.createdAt}
        </p>
        <div className={styles.currency_container}>
          <span className="text text_type_digits-default">
            {calculateTotalCost()}
          </span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;

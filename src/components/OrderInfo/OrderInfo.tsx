import styles from './OrderInfo.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IBurgerData, IOrderInfoProps, useMyDispatch, useMySelector } from '../../utils/types';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { FC, useEffect } from 'react';
import { wsOrdersClose, wsOrdersConnectionStart } from '../../services/actions/orders';

const OrderInfo: FC<IOrderInfoProps> = ({isFullPage}) => {
  const {id} = useParams();
  const {orderInfo, orders, historyOrders} = useMySelector((store) => store.orders)
  const ingredientsMenu = useMySelector((store) => store.ingredients.ingredients)
  const dispatch = useMyDispatch()

  useEffect(() => {
    if(isFullPage) {
      dispatch(wsOrdersConnectionStart())
      return (()=> {
        dispatch(wsOrdersClose())
      })
    }
  },[dispatch, isFullPage])

  let findOrder = orders.find((order) => order._id === id)
  if(!findOrder) {
    findOrder = historyOrders.find((order) => order._id === id)
  }

  const uniqueIngredients = findOrder?.ingredients.filter(function(item, pos) {
    return findOrder?.ingredients.indexOf(item) === pos;
  })

  const findIngredient = (ingredient: string, ingredients: IBurgerData[]) => {
    return ingredients.find((item) => item._id === ingredient)
  }

  const calculateTotalCost = () => {
    let totalCost = 0;
    findOrder?.ingredients.map((itemId)=>{
      const find = ingredientsMenu.find((item) => item._id === itemId)
      if (find?.price) {
        totalCost += find.price
      }
      return totalCost
    })
    return totalCost
  }

  return (
    <>
      { findOrder ? (
      <div className={styles.container} >
        <h2 className={`${styles.order_number} text text_type_digits-default mb-10 `}>
            #{ findOrder?.number }
        </h2>
        <h2 className="text text_type_main-medium mb-3">
          {findOrder?.name}
        </h2>
        <h3 className={`text text_type_main-default mb-15 ${styles.order_status}`}>
          {findOrder?.status}
        </h3>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <ul className={styles.list}>
          {
            uniqueIngredients?.map((ingredientId, index) => {
              const ingredient = findIngredient(ingredientId, ingredientsMenu)
              return (
                <li key={index} className={`${styles.list_item} mb-4 `}>
                  <img className={styles.image} src={ingredient?.image} alt=""/>
                  <h3
                    className={`text text_type_main-default ${styles.title}`}>{ingredient?.name}</h3>
                  <div className={`text text_type_digits-default ${styles.item_currency}`}>
                    <span>
                      {
                        orderInfo?.ingredients.filter((item) => item === ingredient?._id).length
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
      </div>) : (<Loading size='large'/>)
}
    </>
  );

};

export default OrderInfo;

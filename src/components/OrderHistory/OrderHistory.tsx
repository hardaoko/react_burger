import React, {FC, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { MODAL_ORDER_INFO_OPEN } from '../../services/actions/ingredients';
import OrderComponent from '../OrderComponent/OrderComponent';
import styles from './OrderHistory.module.css';

const OrderHistory: FC = () => {
  const userOrders: number[] = [1, 2, 3]
  const dispatch = useDispatch()
  return (
    <ul className={styles.list}>
      <>
        {
          userOrders.length > 0 ? (
            <>
              {
                userOrders.map((order: number, index: number) => (
                  <OrderComponent order={order}key={index} onOpen={() => {
                    dispatch({ type: MODAL_ORDER_INFO_OPEN, order: order });
                  }}/>
                ))
              }
            </>
          ) : (<div>Загрузка</div>)
        }
      </>
    </ul>
  )
};

export default OrderHistory;

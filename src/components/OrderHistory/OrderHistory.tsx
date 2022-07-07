import React, {FC, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MODAL_ORDER_INFO_OPEN } from '../../services/actions/ingredients';
import { wsHistoryConnectionStart } from '../../services/actions/orders';
import { IOrder, RootState } from '../../utils/types';
import OrderComponent from '../OrderComponent/OrderComponent';
import styles from './OrderHistory.module.css';

const OrderHistory: FC = () => {
  const { historyOrders, wsHistoryOrders } = useSelector((store: RootState) => store.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsHistoryConnectionStart());
  }, [dispatch])

  return (
    <ul className={styles.list}>
      <>
        {
          historyOrders.length > 0 ? (
            <>
              {
                historyOrders.map((order: IOrder, index: number) => (
                  <OrderComponent order={order} key={index} onOpen={() => {
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

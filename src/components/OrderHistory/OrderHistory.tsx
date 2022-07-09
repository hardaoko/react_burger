import React, {FC, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { MODAL_ORDER_INFO_OPEN, wsHistoryConnectionStart } from '../../services/actions/orders';
import { IOrder, RootState } from '../../utils/types';
import Loading from '../Loading/Loading';
import OrderComponent from '../OrderComponent/OrderComponent';
import styles from './OrderHistory.module.css';

const OrderHistory: FC = () => {
  const { historyOrders, wsHistoryOrders } = useSelector((store: RootState) => store.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsHistoryConnectionStart());
  }, [dispatch])

  return (
      <>
        {
          historyOrders.length > 0 ? (
            <ul className={styles.list}>
              {
                historyOrders.map((order: IOrder, index: number) => (
                  <OrderComponent order={order} key={index} isStatus={true} onOpen={() => {
                    dispatch({ type: MODAL_ORDER_INFO_OPEN, order: order });
                  }}/>
                ))
              }
            </ul>
          ) : (<div className="ml-25 mt-25 pt-25"><Loading color="dark" size="large"/></div>)
        }
      </>
  )
};

export default OrderHistory;
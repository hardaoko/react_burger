import { useEffect } from 'react';
import { MODAL_ORDER_INFO_OPEN, wsHistoryConnectionClose, wsHistoryConnectionStart } from '../../services/actions/orders';
import { useMyDispatch, useMySelector } from '../../utils/types';
import Loading from '../Loading/Loading';
import OrderComponent from '../OrderComponent/OrderComponent';
import styles from './OrderHistory.module.css';

const OrderHistory = () => {
  const { historyOrders } = useMySelector((store) => store.orders)
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(wsHistoryConnectionStart());
    return (()=> {
      dispatch(wsHistoryConnectionClose())
    })
  }, [dispatch])

  return (
      <>
        {
          historyOrders.length > 0 ? (
            <ul className={styles.list}>
              {
                historyOrders.map((order, index) => (
                  <OrderComponent order={order} key={index} isStatus={true} onOpen={() => {
                    dispatch({ type: MODAL_ORDER_INFO_OPEN, payload: order });
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

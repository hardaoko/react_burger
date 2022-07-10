import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading/Loading";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import OrdersMonitor from "../../components/OrdersMonitor/OrdersMonitor";
import { MODAL_ORDER_INFO_OPEN, wsOrdersClose, wsOrdersConnectionStart } from "../../services/actions/orders";
import { AppDispatch, IOrder, useMySelector } from "../../utils/types";
import styles from "./OrderFeed.module.css";

const OrderFeed = () => {
  const dispatch: AppDispatch = useDispatch()
  const { orders } = useMySelector((store) => store.orders)

  useEffect(() => {
    dispatch(wsOrdersConnectionStart());
    return (()=> {
      dispatch(wsOrdersClose())
    })
  }, [dispatch])

  return (
    <div className={styles.container}>
      <div>
        <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
        {
          orders.length > 0 ? (
          <ul className={styles.list}>
            {
              orders?.map((order: IOrder, index: number) => (
                <OrderComponent order={order} key={index} onOpen={() => {
                  dispatch({ type: MODAL_ORDER_INFO_OPEN, payload: order });
                }}/>
              ))
            }
          </ul>) : (<div className="mt-25 pt-25"><Loading color="dark" size="large"/></div>)
        }

      </div>
      <div>
        <OrdersMonitor/>
      </div>
    </div>

  );
};

export default OrderFeed;

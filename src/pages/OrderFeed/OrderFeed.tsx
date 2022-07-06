import { useDispatch } from "react-redux";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import OrdersMonitor from "../../components/OrdersMonitor/OrdersMonitor";
import { MODAL_ORDER_INFO_OPEN } from "../../services/actions/ingredients";
import styles from "./OrderFeed.module.css";

const OrderFeed = () => {
  const dispatch = useDispatch()

  const orders: Array<number> = [1,2,3,4,5];

  return (
    <div className={styles.container}>
      <div>
        <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
        <div>
          {
            orders.length > 0 ? (
            <ul className={styles.list}>
              {
                orders?.map((order: number, index: number) => (
                  <OrderComponent order={order}key={index} onOpen={() => {
                    dispatch({ type: MODAL_ORDER_INFO_OPEN, order: order });
                  }}/>
                ))
              }
            </ul>) : (<h1 className="mt-10 mb-5 text text_type_main-large">Загрузка</h1>)
          }

        </div>
      </div>
      <div>
        <OrdersMonitor/>

      </div>
    </div>

  );
};

export default OrderFeed;

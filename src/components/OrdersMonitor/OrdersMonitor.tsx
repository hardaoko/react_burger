import { IOrder, useMySelector } from '../../utils/types';
import styles from './OrdersMonitor.module.css';

const OrdersMonitor = () => {
  const { orders, wsOrders, total, totalToday } = useMySelector((store) => store.orders)
  const ready = orders.filter((order: IOrder) => order.status === "done")
  const pending = orders.filter((order: IOrder) => order.status === "pending")

  return (
    <div className={styles.container}>
      <div className={styles.order_numbers}>
        <div className={styles.ready}>
          <h2 className="text text_type_main-medium pb-6">
            Готовы:
          </h2>
          <div className={styles.numbers_container}>
            <ul className={styles.list_ready}>
              {
                ready.map((order: IOrder, index: number) => {
                  if (index < 10) {
                    return (<li key={order._id} className="text text_type_digits-default pb-2">
                      {order.number}
                    </li>)
                  }
                  return null
                })
              }
            </ul>
            <ul className={styles.list_ready}>
              {
                ready.map((order: IOrder, index: number) => {
                  if (index >= 10 && index < 20) {
                    return (<li key={order._id} className="text text_type_digits-default pb-2">
                      {order.number}
                    </li>)
                  }
                  return null
                })
              }
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text text_type_main-medium pb-6">
            В работе:
          </h2>
          <div className={styles.numbers_container}>
            <ul className={styles.list}>
              {
                pending.map((order: IOrder, index: number) => {
                  if (index < 10) {
                    return (<li key={order._id} className="text text_type_digits-default pb-2">
                      {order.number}
                    </li>)
                  }
                  return null
                })
              }
            </ul>
            <ul className={styles.list}>
              {
                pending.map((order: IOrder, index: number) => {
                  if (index >= 10 && index < 20) {
                    return (<li key={order._id} className="text text_type_digits-default pb-2">
                      {order.number}
                    </li>)
                  }
                  return null
                })
              }
            </ul>
          </div>
        </div>
      </div>

      <p className="text text_type_main-medium">
        Выполнено за все время:
      </p>
      <span className={`${styles.total} text text_type_digits-large mb-6`}>{total}</span>

      <p className="text text_type_main-medium">
        Выполнено за сегодня:
      </p>
      <span className={`${styles.total} text text_type_digits-large`}>{totalToday}</span>
    </div>
  );
};

export default OrdersMonitor;

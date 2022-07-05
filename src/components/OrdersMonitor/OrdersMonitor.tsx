import {FC} from 'react';
import styles from './OrdersMonitor.module.css';

const OrdersMonitor = () => {
  const ready: number[] = [151965, 516516, 16511, 165198, 19511, 15691]
  const cooking: number[] = [152432, 512342, 16423, 156566, 16510 ,165165 ,6516]
  const total: number = 28919;
  const totalToday: number = 119;

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
                ready.map((value:number, index: number) => {
                  if (index < 5) {
                    return (<li key={index} className="text text_type_digits-default pb-2">
                      {value}
                    </li>)
                  }
                  return null
                })
              }
            </ul>
            <ul className={styles.list_ready}>
              {
                ready.map((value:number, index: number) => {
                  if (index >= 5 && index < 10) {
                    return (<li key={index} className="text text_type_digits-default pb-2">
                      {value}
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
                cooking.map((value:number, index: number) => {
                  if (index < 5) {
                    return (<li key={index} className="text text_type_digits-default pb-2">
                      {value}
                    </li>)
                  }
                  return null
                })
              }
            </ul>
            <ul className={styles.list}>
              {
                cooking.map((value:number, index: number) => {
                  if (index >= 5 && index < 10) {
                    return (<li key={index} className="text text_type_digits-default pb-2">
                      {value}
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

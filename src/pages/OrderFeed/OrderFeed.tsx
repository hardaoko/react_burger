import React from "react";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import styles from "./OrderFeed.module.css";

const OrderFeed = () => {

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
                orders?.map((index: number) => (
                  <OrderComponent/>
                ))
              }
            </ul>) : (<h1 className="mt-10 mb-5 text text_type_main-large">Загрузка</h1>)
          }

        </div>
      </div>
      <div>
        <OrderComponent/>
        <OrderComponent/>
        <OrderComponent/>
      </div>
    </div>
  );
};

export default OrderFeed;

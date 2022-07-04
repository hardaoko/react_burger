import React from "react";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import styles from "./OrderFeed.module.css";

const OrderFeed = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large text_color_inactive">
        Здесь будут заказы...
        <OrderComponent/>
      </h1>
    </div>
  );
};

export default OrderFeed;

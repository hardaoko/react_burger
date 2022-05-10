import { useCallback } from "react";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useSelector, useDispatch } from "react-redux";
import {
  addBun,
  addIngredients,
  deleteIngredients,
  getOrder,
  MODAL_ORDER_OPEN,
  replaceIngredients,
} from "../../services/actions";
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructor = () => {
  const { orderData, chosenIngredients, modalOrderVisible, bun, finalCost } =
    useSelector((store) => store.ingredients);
  const ingredients = useSelector((store) => store.ingredients.ingredientsList);

  const dispatch = useDispatch();

  const createOrder = () => {
    dispatch(getOrder(chosenIngredients));
  };

  const openModal = () => {
    createOrder();
    dispatch({ type: MODAL_ORDER_OPEN });
  };

  const modal = (
    <Modal>
      <OrderDetails order={orderData} />
    </Modal>
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      item.type === "bun"
        ? dispatch(addBun(chosenIngredients, item))
        : chosenIngredients.length > 0 &&
          dispatch(addIngredients(chosenIngredients, item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const highlightTarget = isHover ? styles.highlight : "";

  let targetIndex;
  let startIndex;

  const DraggableItem = ({ item }) => {
    const dispatch = useDispatch();
    const { chosenIngredients } = useSelector((store) => store.ingredients);
    const [, dragRef] = useDrag({
      type: "orderList",
      item: { item },
    });

    const [, dropRef] = useDrop({
      accept: "orderList",
      drop() {
        dispatch(
          replaceIngredients(chosenIngredients, startIndex, targetIndex)
        );
      },
      hover(dragItem) {
        targetIndex = item.index;
        startIndex = dragItem.item.index;
      },
      collect: (monitor) => ({
        sortHover: monitor.isOver(),
      }),
    });

    return (
      <li
        ref={(item) => dragRef(dropRef(item))}
        className={`${styles.item} pt-5
          ${targetIndex === item.index ? styles.dropItem : ""}
          ${startIndex === item.index ? styles.draggedItem : ""}`}
      >
        <DragIcon type="primary" />
        <div className={styles.itemCard}>
          <ConstructorElement
            text={item.element.name}
            price={item.element.price}
            thumbnail={item.element.image}
            handleClose={() => {
              dispatch(deleteIngredients(chosenIngredients, item.index));
            }}
          />
        </div>
      </li>
    );
  };

  const IngredientSection = useCallback(() => {
    return (
      <ul className={`${styles.list} pr-4 pl-4  `}>
        {ingredients.map((item, index) => {
          return (
            <DraggableItem
              item={item}
              index={index + 1}
              key={item.element._id + index}
            />
          );
        })}
      </ul>
    );
  }, [ingredients]);

  const BunElement = ({ bun, side }) => {
    return (
      <div
        className={`${styles.item}  ${
          side === "top" ? " ml-10" : "mt-5 ml-10"
        }`}
      >
        <ConstructorElement
          type={side}
          isLocked={true}
          text={`${bun.element.name} ${side === "top" ? "(верх)" : "(низ)"}`}
          price={bun.element.price}
          thumbnail={bun.element.image}
        />
      </div>
    );
  };

  return (
    <div
      className={`${styles.container} ${highlightTarget} mt-25 p-1`}
      ref={dropTarget}
    >
      {modalOrderVisible && modal}

      {bun !== null ? (
        <BunElement bun={bun} side="top" />
      ) : (
        <div
          className={`${styles.tip} mb-15 mr-5 mt-5 text text_type_main-large`}
        >
          Выберите булку
        </div>
      )}
      {bun !== null && <IngredientSection />}

      {bun !== null && <BunElement bun={bun} side="bottom" />}

      <div className={`${styles.button_container} pt-5 pr-5`}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">{finalCost}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={openModal}
          disabled={bun === undefined}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;

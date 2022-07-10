import styles from "./OrderComponent.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useRouteMatch} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IBurgerData, IOrderComponentProps, RootState } from "../../utils/types";
import { useLocation } from "react-router-dom";
import { FC } from "react";

const OrderComponent: FC<IOrderComponentProps> = ({order, onOpen, isStatus}) => {
  const {createdAt,
    ingredients,
    name,
    number,
    status,
    updatedAt,
    _id} = order
  const location = useLocation();
  const {url} = useRouteMatch();


  const ingredientsMenu = useSelector((store: RootState) => store.ingredients.ingredients)

  const findIngredient = (ingredient: string, ingredients: IBurgerData[]) => {
    return ingredients.find((item:IBurgerData) => item._id === ingredient)
  }

  const calculateTotalCost = () => {
    let totalCost = 0;
    ingredients.map((itemId: string)=>{
      const find = ingredientsMenu.find((item: IBurgerData) => item._id === itemId)
      if (find?.price) {
        totalCost += find.price
      }
    })
    return totalCost
  }

  const convertStatus = (status: string) => {
    if (status === 'done') {
      return "Выполнен"
    }
    return 'Готовится'
  }


  return (
    <li>
      <Link className={styles.link} onClick={onOpen} to={{
          pathname: `${url}/${_id}`,
          state: { background: location },
      }}>
        <div className={styles.header}>
          <p className="text text_type_digits-default">{`#${number}`}</p>
          <p className="text text_type_main-default text_color_inactive">{createdAt}</p>
        </div>
        <h2 className="text text_type_main-medium">{name}</h2>
        {
          isStatus && status && <p className="text text_type_main-default">{convertStatus(status)}</p>
        }
        <div className={styles.footer}>
          <ul className={styles.ingredients_list}>
            {
              ingredients.map((value: string, index: number) => {
                  const ingredient = findIngredient(value, ingredientsMenu)
                  if (index < 5) {
                    return (
                      <li key={index}  className={styles.ingredients_list_item}>
                        <img className={styles.ingredients_list_item_image} src={ingredient?.image}
                             alt={ingredient?.name}/>
                      </li>
                    )
                  } else if (index === 6) {
                    return (
                      <li key={index} className={`${styles.ingredients_list_item}`}>
                        <img className={styles.last_ingredient_image} src={ingredient?.image}
                            alt={ingredient?.name}/>
                        <div className={styles.overlay}></div>
                        <span className={`text text_type_main-default ${styles.last_ingredient_count}`}>+{ingredients.length - 5}</span>
                      </li>
                    )
                  }
                  return null
                }
              )
            }
          </ul>
          <div className={styles.total}>
            <span className="text text_type_digits-default">{calculateTotalCost()}</span>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderComponent;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import IfutureContext from "../Context/IfutureContext";
import { baseURL } from "../parameters";
import styles from "./Cart.module.css";
import styled from "styled-components";
export const Cart = () => {
  const { states, setters, requests } = useContext(IfutureContext);
  const { getFullAddress, getActiveOrder, getRestaurantDetail } = requests;
  const { address, activeOrder, cart, resDetail } = states;

  const [paymentMethod, setPaymentMethod] = useState("");
  //Nome
  // Endereço
  //Delivery time

  const AddresConteiner = styled.div`
    background-color: #eee;
    padding: 1rem;
  `;
  const AddresTitle = styled.p`
    letter-spacing: 0.39px;
    color: #b8b8b8;
    margin-bottom: 0.5rem;
  `;
  const Addres = styled.p`
    color: black;
    font-weight: bold;
    letter-spacing: 0.39px;
  `;

  useEffect(() => {
    getFullAddress();
    getCart(cart);
    getRestaurantDetail(resDetail);
    // getPrice(resDetail, cart);
  }, [cart, resDetail]);

  // console.log(address)

  const getAddress = (address) => {
    return (
      <AddresConteiner>
        <AddresTitle>Endereço de Entrega</AddresTitle>
        <Addres>
          {address.street}, {address.number}
        </Addres>
      </AddresConteiner>
    );
  };

  const restaurantInfo = (resDetail) => {
    return (
      <div>
        <p>{resDetail.name}</p>
        <p>{resDetail.address}</p>
        <p>{resDetail.deliveryTime} min</p>
      </div>
    );
  };

  const getCart = (cart) => {
    const cardsOrder = cart.map((product) => {
      return (
        <div className={styles.teste} key={product.id}>
          <img
            className={styles.image}
            src={product.image}
            alt={product.product}
          />
          <div className={styles.wrapper}>
            <p className={styles.name}>{product.product}</p>
            <p className={styles.description}> {product.description}</p>
            <p className={styles.price}>R$: {product.price}</p>
          </div>
        </div>
      );
    });
    return  (
      <div>{cardsOrder}
        {cart.length === 0 ? noCart() : getPrice(resDetail,cart)}
      </div>
    );
  };

  const noCart = () => {
    return (
      <div>
        <p>Carrinho Vazio</p>
        <div>
          <p>Formas de Pagamento</p>
          <label>
            <input
              type="radio"
              value="money"
              name="paymentMethod"
              onChange={({ target }) => setPaymentMethod(target.value)}
            />
            Dinheiro
          </label>
          <label>
            <input
              type="radio"
              value="creditcard"
              name="paymentMethod"
              onChange={({ target }) => setPaymentMethod(target.value)}
            />
            Cartão de Credito
          </label>
          {paymentMethod === "" ? (
            <button disabled>Confirmar</button>
          ) : (
            <button
              onClick={() => createOrder(cart, paymentMethod)}
              style={{ background: "red" }}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    );
  };

  const getPrice = (resDetail, cart) => {
    const cartPrice = cart.map((cartPrice) => {
      return cartPrice.price;
    });

    const shipping = resDetail.shipping;
    const totalOrder = cartPrice.reduce(
      (acc, initialValue) => acc + initialValue
    );

    // console.log(productsPrice)

    const subtotal = shipping + totalOrder;
    return (
      <div>
        <p> Frete: {shipping}</p>
        <p>SubTotal: {subtotal}</p>

        <div>
          <p>Formas de Pagamento</p>
          <label>
            <input
              type="radio"
              value="money"
              name="paymentMethod"
              onChange={({ target }) => setPaymentMethod(target.value)}
            />
            Dinheiro
          </label>
          <label>
            <input
              type="radio"
              value="creditcard"
              name="paymentMethod"
              onChange={({ target }) => setPaymentMethod(target.value)}
            />
            Cartão de Credito
          </label>
          {paymentMethod === "" ? (
            <button disabled>Confirmar</button>
          ) : (
            <button
              onClick={() => createOrder(cart, paymentMethod)}
              style={{ background: "red" }}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    );
  };

  const createOrder = (cart, paymentMethod) => {
    const products = cart.map((cartOrder) => {
      return cartOrder.id;
    });

    axios.post(`${baseURL}/${resDetail.id}/order`);

    console.log(products);
  };

  return (
    <div>
      <p>Meu Carinho</p>
      {address && getAddress(address)}
      {resDetail && restaurantInfo(resDetail)}
      {cart.length === 0 ? noCart() : getCart(cart)}

    </div>
  );
};

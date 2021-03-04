import React, { useContext, useEffect, useState } from "react";
import IfutureContext from "../../Context/IfutureContext";

import styled from "styled-components";
import {
  Address,
  AddressContainer,
  AddressTitle,
  ButtonConfirm,
  CartContainer,
  CartWrapper,
  EmptyCart,
  PaymentContainer,
  PaymentLabel,
  PaymentTitle,
  Price,
  Shipping,
  Subtotal,
} from "./styled";
import Home from "../Home";
import { goTo } from "../../routes/Coordinator";

export const Cart = () => {
  const { states, setters, requests } = useContext(IfutureContext);
  const { getFullAddress, getRestaurantDetail, createOrder } = requests;
  const { address, cart, id, resDetail } = states;
  const [payment, setPayment] = useState(null);
  // const {shipping} = resDetail
  //Nome
  // Endereço
  //Delivery time

  useEffect(() => {
    getFullAddress();
    getRestaurantDetail(id);

    // getCart(cart);
    // getPrice(resDetail,cart)
    // setters.setPage('cart')
  }, [id]);





  const getAddress = (address) => {
    return (
      <AddressContainer>
        <AddressTitle>Endereço de Entrega</AddressTitle>
        <Address>
          {address.street}, {address.number}
        </Address>
      </AddressContainer>
    );
  };

  const restaurantInfo = (resDetail) => {
    return (
      <CardRestaurant>
        <RedText>{resDetail.name}</RedText>
        <GrayText>{resDetail.address}</GrayText>
        <GrayText>{resDetail.deliveryTime} min</GrayText>
      </CardRestaurant>
    );
  };

  const getCart = (cart) => {
    const showOrder = cart.map((product) => {
      return (
        <CardProduct key={product.id}>
            <ImgProduct src={product.image} />
          <ContainerInfoProduct>
            <RedText>{product.product}</RedText>
            <GrayText>{product.description}</GrayText>
            <GrayText>R$ {(product.price ?? 0).toFixed(2)}</GrayText>
          </ContainerInfoProduct>
          <ButtonAddCart>Remover</ButtonAddCart>
          {/* <ButtonAddCart onClick={() => addProduto(product, pathParams.id)}>adicionar</ButtonAddCart> */}
          <ButtonQuantity>{product.quantity}</ButtonQuantity>
        </CardProduct>
      );
    });

    return (
      <>
        {restaurantInfo}
        {showOrder}
        {orderPrice(resDetail.shipping, cart)}
      </>
    );
  };

  const orderPrice = (shipping, cart) => {
    const ship = shipping;
    const showPrice =
      cart &&
      cart
        .map((price) => {
          return price.price * Number(price.quantity);
        })
        .reduce((total, value) => total + value);

    const totalOrder = ship + Number(showPrice);
    return (
      <CartWrapper>
        <Shipping>Frete: R$ {ship.toFixed(2)}</Shipping>
        <Subtotal>SUBTOTAL:</Subtotal>  <Price>R$ {totalOrder.toFixed(2)}</Price>
      </CartWrapper>
    );
  };

  const noCart = () => {
    return (
      <CartWrapper>
        <EmptyCart>Carrinho Vazio </EmptyCart>
        <Shipping>Frete : R$ 00,00</Shipping>
        <Subtotal>SUBTOTAL:</Subtotal> <Price> R$ 00,00</Price>
      
      </CartWrapper>
    );
  };

  const paymentMethod = () => {
    return (
      <PaymentContainer>
        <PaymentTitle>Formas de Pagamento</PaymentTitle>
        <PaymentLabel>
          <input
            type="radio"
            value="money"
            name="payment"
            onChange={({ target }) => setPayment(target.value)}
          />
          Dinheiro
        </PaymentLabel>
        <PaymentLabel>
          <input
            type="radio"
            value="creditcard"
            name="payment"
            onChange={({ target }) => setPayment(target.value)}
          />
          Cartão de Crédito
        </PaymentLabel>
      </PaymentContainer>
    );
  };

  return (

    <CartContainer>
      <p>Meu Carinho</p>
      {address && getAddress(address)}
      {/* {resDetail && restaurantInfo(resDetail)} */}
      {cart.length === 0 ? noCart(): getCart(cart)}
      {paymentMethod()}

      <ButtonConfirm onClick={() => createOrder(payment)}>Confirmar</ButtonConfirm>
    </CartContainer>


  );
};

import React from 'react';
import { CartItemsContainer, CartItemImage, ItemDetailsContainer } from './cart-items.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
	<CartItemsContainer>
		<CartItemImage src={imageUrl} alt='item' />
		<ItemDetailsContainer>
			<span>{name}</span>
			<span>
				{quantity} * ${price}
			</span>
		</ItemDetailsContainer>
	</CartItemsContainer>
);

export default CartItem;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import { fetchJson } from './utils';

type CartItemProps = {
	id: number;
	name: string;
	imgUrl: string;
	count: number;
	price: number;
	onCountChanged: (id: number, count: number) => void;
};

function CartItem(props: CartItemProps) {
	const {id, name, imgUrl, count, price, onCountChanged} = props;
	const [itemCount, setItemCount] = useState(count);

	const onCountChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(event.target.value);
		if (Number.isNaN(newValue)) {
			console.log("Test");
			return;
		}
		setItemCount(newValue);
		onCountChanged(id, newValue);
	};

	return (
		<>
			<div className="cart-item">
				<img className="cart-item-image" src={imgUrl} />
				<span className="cart-item-name">{name}</span>
				<input className="cart-item-count" value={itemCount} onChange={onCountChangedHandler} type="number"/>
				<span className="cart-item-price">${price * itemCount}</span>
			</div>
			<hr/>
		</>
	);
}

function ShoppingCart() {
	const [flowerData, setFlowerData] = useState<any[] | null>(null);
	const [cartItems, setCartItems] = useState<any | null>(null);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');

	const navigate = useNavigate();

	const cartItemIds = cartItems ? Object.keys(cartItems).map((i) => parseInt(i)) : [];

	useEffect(() => {
		const cart = localStorage.getItem("cart") || "{}";
		const cartData = JSON.parse(cart);
		const flowerIds = Object.keys(cartData);

		fetchJson("/api/get_flowers_by_id", {flower_ids: flowerIds}, (data) => {
			setCartItems(cartData);
			setFlowerData(data);
		});
	}, []);

	useEffect(() => {
		let price = 0;
		cartItemIds.forEach((id) => {
			const flower = flowerData?.find(f => f.id === id) ?? null;
			price += flower.price * cartItems[id].count;
		});
		setTotalPrice(price);
	}, [cartItems]);

	const onCountChanged = (id: number, count: number) => {
		const updatedCart = {...cartItems};
		if (count <= 0) {
			delete updatedCart[id];
		} else {
			updatedCart[id].count = count;
		}

		setCartItems(updatedCart);

		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	const onSubmit = () => {
		fetchJson("/api/create_order", {
			name,
			email,
			phone,
			address,
			cart: JSON.stringify(cartItems),
		}, (data) => {
			navigate('/');
			localStorage.setItem("cart", "");
		});
	};

	return (
		<>
			<header className="shop-header">
				<NavigationMenu/>
			</header>
			<div className="cart-form">
				<h3>Shipping information</h3>
				<p>Name:</p>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<p>Email:</p>
				<input value={email} onChange={(e) => setEmail(e.target.value)} />
				<p>Phone:</p>
				<input value={phone} onChange={(e) => setPhone(e.target.value)} />
				<p>Address:</p>
				<input value={address} onChange={(e) => setAddress(e.target.value)} />
			</div>
			<div className="cart-content">
				{cartItemIds.map((id) => {
					const flower = flowerData?.find(f => f.id === id) ?? null;
					const cartItem = cartItems[id];
					if (!flower) {
						return;
					}

					return <CartItem
						key={id}
						id={id}
						name={flower.name}
						imgUrl={flower.image_url}
						count={cartItem.count}
						price={flower.price}
						onCountChanged={onCountChanged}
					/>;
				})}
			</div>
			<div>
				<button id="cart-submit-order" onClick={onSubmit} disabled={!cartItemIds.length}>Submit order</button>
				<span className="cart-total">Total: {totalPrice}</span>
			</div>
		</>
	);
}

export default ShoppingCart;

import React, { useState, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';
import { fetchJson } from './utils';

type ShopData = {
	id: number;
	name: string;
};

type ShopSelectionProps = {
	shops: ShopData[];
	onClick: (id: number) => void;
};

type ShopItemProps = {
	id: number;
	imgUrl: string;
	name: string;
	price: number;
	favorite: boolean;
	onAddToCart: (id: number) => void;
};

function ShopSelectionMenu(props: ShopSelectionProps) {
	const {shops, onClick} = props;
	const [activeShop, setActiveShop] = useState(-1);

	return (
		<div className="shop-side-menu">
			<h3>Shops:</h3>
			{shops.map((shopData: ShopData) => (
				<button
					key={shopData.id}
					className={`shop-button ${activeShop === shopData.id ? 'active' : ''}`}
					onClick={() => {
						setActiveShop(shopData.id);
						onClick(shopData.id);
					}}
				>
					{shopData.name}
				</button>
			))}
		</div>
	);
}

function ShopItem(props: ShopItemProps) {
	const {id, imgUrl, name, price, favorite, onAddToCart} = props;

	return (
		<div className="shop-item">
			<div>
				<img className="item-image" src={imgUrl} />
				<span className="item-price">${price}</span>
			</div>
			<div>
				<span className="item-name">{name}</span>
				<button className="item-add-to-cart" onClick={() => onAddToCart(id)}>Add to cart</button>
			</div>
		</div>
	);
}

function Shop() {
	const [shops, setShops] = useState([]);
	const [flowers, setFlowers] = useState([]);

	useEffect(() => {
		fetchJson("/api/get_shops", {}, (data) => {
			setShops(data);
		});
	}, []);

	const onShopSelected = (shopId: number) => {
		fetchJson("/api/get_flowers", {shop_id: shopId}, (data) => {
			setFlowers(data);
		});
	};

	const onItemAddedToCart = (flowerId: number) => {
		const cart = localStorage.getItem("cart") || "{}";
		const cartData = JSON.parse(cart);
		if (cartData[flowerId]) {
			cartData[flowerId].count += 1;
		} else {
			cartData[flowerId] = {count: 1};
		}

		localStorage.setItem("cart", JSON.stringify(cartData));
	};

	return (
		<>
			<header className="shop-header">
				<NavigationMenu/>
			</header>
			<ShopSelectionMenu shops={shops} onClick={onShopSelected}/>
			<div className="shop-item-list">
				{flowers.map((flowerData: any) => (
					<ShopItem
						key={flowerData.id}
						id={flowerData.id}
						imgUrl={flowerData.image_url}
						name={flowerData.name}
						price={flowerData.price}
						favorite={false}
						onAddToCart={onItemAddedToCart}
					/>
				))}
			</div>
		</>
	);
}

export default Shop;
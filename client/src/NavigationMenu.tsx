import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationMenu() {
	return (
		<div className="nav-menu">
			<span className="nav-menu-item"><NavLink to="/" end>Shop</NavLink></span>
			<span className="nav-menu-item">|</span>
			<span className="nav-menu-item"><NavLink to="/cart">Shopping cart</NavLink></span>
		</div>
	);
}

export default NavigationMenu;
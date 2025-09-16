import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Shop from './Shop';
import ShoppingCart from './ShoppingCart';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Shop />} />
					<Route path="/cart" element={<ShoppingCart />} />
					<Route path="/order" element={<h1>Order</h1>} />
				</Routes>
			</div>
		</Router>

	);
}

export default App;

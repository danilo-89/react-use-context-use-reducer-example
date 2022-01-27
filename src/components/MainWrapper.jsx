import React, { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';

const MainWrapper = () => {
	const { products, loading, error, errorMessage, fetchProducts } =
		useProducts();

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='container'>
			<div className='text-center'>
				<button type='button' onClick={fetchProducts}>
					fetch products
				</button>
			</div>
			<hr />
			{loading && (
				<>
					<div className='loading text-center'>fetching data...</div>
					<br />
				</>
			)}
			{error && (
				<>
					<div className='error text-center'>{errorMessage}</div>
					<br />
				</>
			)}
			{products?.length && (
				<>
					{products.map((product) => (
						<div key={product.id}>{product.title}</div>
					))}
				</>
			)}
		</div>
	);
};

export default MainWrapper;

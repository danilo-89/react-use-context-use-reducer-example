import { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

export const useProducts = () => {
	const context = useContext(ProductsContext);

	if (context === undefined) {
		throw new Error('useProducts must be used inside a ProductsProvider');
	}

	return context;
};

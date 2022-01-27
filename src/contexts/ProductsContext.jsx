import { createContext, useReducer } from 'react';

export const ProductsContext = createContext(); // creating context

// reducer
const productsReducer = (state, action) => {
	// reducer function
	switch (action.type) {
		case 'FETCHING':
			return {
				...state,
				loading: true,
				error: false,
				errorMessage: '',
			};
		case 'FETCHED':
			return {
				products: action.payload,
				loading: false,
				error: false,
				errorMessage: '',
			};
		case 'ERROR':
			return {
				...state,
				loading: false,
				error: true,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
};

// context provider
export const ProductsProvider = ({ children }) => {
	const initialState = {
		products: null,
		loading: false,
		error: false,
		errorMessage: '',
	};

	const [state, dispatch] = useReducer(
		productsReducer,
		// initial value for the state
		{ ...initialState }
	);

	// function for fetching products data
	const fetchProducts = async () => {
		dispatch({ type: 'FETCHING' });
		try {
			const response = await fetch(
				'https://fakestoreapi.com/products?limit=10'
			);
			const responseJson = await response.json();

			console.log(responseJson);

			dispatch({ type: 'FETCHED', payload: [...responseJson] });
		} catch (error) {
			console.log(error?.message || 'unknown error');
			dispatch({ type: 'ERROR', payload: error?.message || 'unknown error' });
		}
	};

	return (
		<ProductsContext.Provider value={{ ...state, fetchProducts }}>
			{children}
		</ProductsContext.Provider>
	);
};

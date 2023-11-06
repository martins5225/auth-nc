import './index.css';

import { RouterProvider, createHashRouter } from 'react-router-dom';

import AuthRoute from './AuthRoute.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import LoginContainer from './containers/LoginContainer.tsx';
import ProfileContainer from './containers/ProfileContainer.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

const router = createHashRouter([
	{
		path: '/',
		element: <LoginContainer />,
	},
	{
		path: '/profile/:userId',
		element: (
			<AuthRoute>
				<ProfileContainer />
			</AuthRoute>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>
);

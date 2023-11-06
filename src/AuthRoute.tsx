import { Flex, Spinner } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

interface Props {
	children: ReactNode;
}

const AuthRoute = ({ children }: Props) => {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setLoading(false);
			if (!user) {
				toast({
					title: 'Unauthorized',
					description: 'Kindly login to view profile.',
					position: 'top',
					status: 'warning',
				});
				navigate('/');
			}
		});

		return () => unsubscribe(); // Cleanup on unmount
	}, [auth]);

	if (loading)
		return (
			<Flex height="100vh" justifyContent="center" alignItems="center">
				<Spinner size="xl" />
			</Flex>
		);
	return <>{children}</>;
};

export default AuthRoute;

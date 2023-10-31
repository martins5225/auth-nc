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

	if (loading) return <p>Loading....</p>;
	return <>{children}</>;
};

export default AuthRoute;

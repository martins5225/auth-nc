import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Heading,
	Input,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const ProfileContainer = () => {
	const { userId } = useParams();
	const toast = useToast();
	const auth = getAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const isEmailValid = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegex.test(email);
	};

	const isNameValid = (name: string) => {
		return name.trim() !== '';
	};

	const getUser = () => {
		axios
			.get(
				`https://us-central1-auth-nc-47ccc.cloudfunctions.net/app/users/${userId}`
			)
			.then((response) => {
				setName(response.data.name);
				setEmail(response.data.email);
			})
			.catch((error) => {
				console.error('Failed to fetch user:', error);
			});
	};

	useEffect(() => {
		getUser();
	}, [userId]);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleUserUpdate = () => {
		// Validate name and email
		if (!isNameValid(name) || !isEmailValid(email)) {
			toast({
				title: 'Validation Error',
				description: 'Please enter a valid name and email address.',
				status: 'error',
				position: 'top',
			});
			return;
		}

		setIsLoading(true);

		const userObject = {
			name: name,
			email: email,
		};

		axios
			.patch(
				`https://us-central1-auth-nc-47ccc.cloudfunctions.net/app/users/${userId}`,
				userObject
			)
			.then(() => {
				setIsLoading(false);
				toast({
					title: 'Success',
					description: 'Your profile has been updated!',
					status: 'success',
					position: 'top',
				});
			})
			.catch((error) => {
				setIsLoading(false);
				toast({
					title: 'Failed to Update Profile',
					description: 'An error occurred while sending data to the server.',
					position: 'top',
					status: 'error',
				});
				console.error('Failed to send user data to the server:', error);
			});
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} w={500} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Account Profile</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="name">
							<FormLabel>Full Name</FormLabel>
							<Input type="text" value={name} onChange={handleNameChange} />
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input type="email" value={email} onChange={handleEmailChange} />
						</FormControl>
						<HStack spacing={10}>
							<Button mt={5} color={'white'} onClick={() => signOut(auth)}>
								{' '}
								Logout
							</Button>
							<Button
								mt={5}
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								onClick={handleUserUpdate}
								isLoading={isLoading}
							>
								Save
							</Button>
						</HStack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default ProfileContainer;

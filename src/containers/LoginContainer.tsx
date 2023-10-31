import {
	ConfirmationResult,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from 'firebase/auth';
import { FormEvent, useEffect, useState } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure, useToast } from '@chakra-ui/react';

import Login from '../components/Login';
import Verification from '../components/Verification';
import { auth } from '../../firebase.config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
	id: string;
	phoneNumber: string;
	name: string;
	email: string;
}

const LoginContainer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [phone, setPhone] = useState<string>('');
	const [code, setCode] = useState<string>('');
	const [userId, setUserId] = useState<string>('');
	const [users, setUsers] = useState<User[]>([]);
	const toast = useToast();

	const generateRecaptcha = (event: FormEvent) => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			auth,
			'recaptcha-container',
			{
				size: 'invisible',
				callback: () => {
					handleFormSubmit(event);
				},
			}
		);
	};

	const getUsers = () => {
		axios
			.get('https://us-central1-auth-nc-47ccc.cloudfunctions.net/app/users')
			.then((response) => {
				console.log(response.data);
				setUsers(response.data);
			})
			.catch((error) => {
				console.error('Failed to fetch users:', error);
			});
	};

	const findUserIdByPhoneNumber = (phone: string, users: User[]) => {
		const user = users.find((user) => user.phoneNumber === phone);
		if (user) {
			return setUserId(user.id);
		}
		return;
	};

	useEffect(() => {
		// Fetch all users when the component mounts
		getUsers();
	}, []);

	const createUser = () => {
		axios
			.post('https://us-central1-auth-nc-47ccc.cloudfunctions.net/app/signup', {
				phoneNumber: phone,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Failed to send user data to the server:', error);
			});
	};

	const navigate = useNavigate();

	const checkPhoneNumberExists = () => {
		const phoneNumberExists = users.some((user) => user.phoneNumber === phone);
		getUsers();
		findUserIdByPhoneNumber(phone, users);
		if (!phoneNumberExists) {
			createUser();
		}
	};

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		generateRecaptcha(event);
		const appVerifier: any = window.recaptchaVerifier;
		onOpen();
		signInWithPhoneNumber(auth, phone, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult; // Set confirmationResult here
				console.log(confirmationResult);
			})
			.catch((error: Error) => {
				console.log(error);
			});
	};

	const onOTPVerify = async (e: FormEvent) => {
		e.preventDefault();
		const otp = code;
		console.log(otp);
		if (otp.length === 6) {
			const confirmationResult: ConfirmationResult =
				window.confirmationResult as ConfirmationResult;

			try {
				if (confirmationResult) {
					const result = await confirmationResult.confirm(otp);
					console.log(result);
					console.log(userId);
					checkPhoneNumberExists();
					console.log('Phone number verified. OTP: ' + otp);
					navigate(`/profile/${userId}`);
					toast({
						title: 'Signed in successfully',
						status: 'success',
						position: 'top',
					});
				} else {
					console.log('Confirmation result is not available.');
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			<div id="recaptcha-container"></div>
			<Login
				onOpen={onOpen}
				phone={phone}
				setPhone={setPhone}
				onSignup={(event: FormEvent) => handleFormSubmit(event)}
			/>{' '}
			<Verification
				isOpen={isOpen}
				onClose={onClose}
				code={code}
				setCode={setCode}
				phone={phone}
				onVerify={onOTPVerify}
			/>
		</>
	);
};

export default LoginContainer;

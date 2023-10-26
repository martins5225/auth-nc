import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import { FormEvent } from 'react';
import { PhoneInput } from 'react-international-phone';

interface LoginProps {
	onOpen: () => void;
	phone: string;
	setPhone: (phone: string) => void;
	onSignup: (event: FormEvent) => void;
}

const Login = ({ onSignup, phone, setPhone }: LoginProps) => {
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Heading fontSize={'4xl'} textAlign={'center'}>
					Login
				</Heading>
				<Text fontSize={'lg'} align={'center'} color={'gray.600'}>
					Sign in to enjoy all of our cool features
				</Text>
				<Box
					rounded={'lg'}
					w={'500px'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<form onSubmit={onSignup}>
						<Stack spacing={4}>
							<FormControl id="phoneNumber" isRequired>
								<FormLabel>Phone Number</FormLabel>
								<PhoneInput
									defaultCountry="ua"
									value={phone}
									onChange={(phone) => setPhone(phone)}
								/>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText="Submitting"
									size="lg"
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									type="submit"
								>
									Login
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Login;

import {
	Button,
	Center,
	FormControl,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';

import CustomPinInput from './PinInput';
import { FormEvent } from 'react';

export interface VerificationProps {
	onClose: () => void;
	isOpen: boolean;
	phone: string;
	code: string;
	setCode: (code: string) => void;
	onVerify: (e: FormEvent) => void;
}

const Verification = ({
	phone,
	isOpen,
	onClose,
	code,
	setCode,
	onVerify,
}: VerificationProps) => {
	// const handleCodeSubmit = (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	console.log(code);
	// 	onVerify();
	// };

	return (
		<>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<Stack
							spacing={4}
							w={'full'}
							maxW={'sm'}
							bg={useColorModeValue('white', 'gray.700')}
							rounded={'xl'}
							p={6}
							my={10}
						>
							<Center>
								<Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
									Verify your Number
								</Heading>
							</Center>
							<Center
								fontSize={{ base: 'sm', sm: 'md' }}
								color={useColorModeValue('gray.800', 'gray.400')}
							>
								We have sent code to your Phone Number
							</Center>
							<Center
								fontSize={{ base: 'sm', sm: 'md' }}
								fontWeight="bold"
								color={useColorModeValue('gray.800', 'gray.400')}
							>
								Verify {phone}
							</Center>
							<form onSubmit={onVerify}>
								<FormControl>
									<Center>
										<CustomPinInput code={code} setCode={setCode} />
									</Center>
								</FormControl>
								<Stack spacing={6}>
									<Button
										mt={5}
										bg={'blue.400'}
										color={'white'}
										_hover={{
											bg: 'blue.500',
										}}
										type="submit"
									>
										Verify
									</Button>
								</Stack>
							</form>
						</Stack>
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Verification;

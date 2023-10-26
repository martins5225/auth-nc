import { PinInput, PinInputField } from '@chakra-ui/pin-input';

import { HStack } from '@chakra-ui/react';

interface CustomPinInputProps {
	code: string;
	setCode: (code: string) => void;
}

const CustomPinInput = ({ code, setCode }: CustomPinInputProps) => {
	return (
		<HStack>
			<PinInput value={code} onChange={(value) => setCode(value)}>
				<PinInputField />
				<PinInputField />
				<PinInputField />
				<PinInputField />
				<PinInputField />
				<PinInputField />
			</PinInput>
		</HStack>
	);
};

export default CustomPinInput;

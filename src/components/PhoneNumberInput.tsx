import 'react-international-phone/style.css';

import { PhoneInput } from 'react-international-phone';

interface PhoneProps {
	phone: string;
	setPhone: (phone: string) => void;
}

const PhoneNumberInput = ({ phone, setPhone }: PhoneProps) => {
	return (
		<div>
			<PhoneInput
				defaultCountry="ua"
				value={phone}
				onChange={(phone) => setPhone(phone)}
			/>
		</div>
	);
};

export default PhoneNumberInput;

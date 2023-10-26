export {};
declare global {
	interface Window {
		recaptchaVerifier: unknown;
		confirmationResult: unknown;
	}
}

interface ConfirmationResult {
	confirm: (otp: string) => Promise<never>;
}

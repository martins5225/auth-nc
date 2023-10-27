export {};
declare global {
	interface ConfirmationResult {
		confirm: (otp: string) => Promise<never>;
	}
	interface Window {
		recaptchaVerifier: unknown;
		confirmationResult: unknown;
	}
}

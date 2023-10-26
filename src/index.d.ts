export {};

declare global {
	interface Window {
		recaptchaVerifier: unknown;
		confirmationResult: unknown;
	}
}
declare global {
	interface ConfirmationResult {
		confirm: unknown;
	}
}

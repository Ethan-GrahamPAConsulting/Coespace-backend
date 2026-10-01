const form = document.querySelector<HTMLFormElement>("#registration-form");
const warning = document.querySelector<HTMLParagraphElement>("#registration-warning");

if (!form || !warning) {
	throw new Error("Registration form or warning message was not found.");
}

const warningElement = warning;
const emailField = form.querySelector<HTMLInputElement>('[name="email"]');
const passwordField = form.querySelector<HTMLInputElement>('[name="password"]');

if (!emailField || !passwordField) {
	throw new Error("Registration email or password field was not found.");
}

function showWarning(message: string): void {
	warningElement.textContent = message;
	warningElement.hidden = false;
}

form.addEventListener(
	"invalid",
	(event: Event) => {
		const field = event.target;
		if (!(field instanceof HTMLInputElement)) {
			return;
		}

		field.setAttribute("aria-invalid", "true");

		if (field.name === "email") {
			showWarning("Enter a valid work email ending in @company.com.");
		} else if (field.name === "password") {
			showWarning("Password must be at least 8 characters.");
		} else {
			showWarning("Please complete all required fields.");
		}
	},
	true,
);

form.addEventListener("submit", (event: SubmitEvent) => {
	const errors: string[] = [];
	const emailIsCompanyAddress = emailField.value.trim().toLowerCase().endsWith("@company.com");
	const passwordIsLongEnough = passwordField.value.length >= 8;

	if (!emailIsCompanyAddress) {
		emailField.setAttribute("aria-invalid", "true");
		errors.push("Email must end with @company.com.");
	} else {
		emailField.removeAttribute("aria-invalid");
	}

	if (!passwordIsLongEnough) {
		passwordField.setAttribute("aria-invalid", "true");
		errors.push("Password must be at least 8 characters.");
	} else {
		passwordField.removeAttribute("aria-invalid");
	}

	if (errors.length > 0) {
		event.preventDefault();
		showWarning(errors.join(" "));
		return;
	}

	warningElement.textContent = "";
	warningElement.hidden = true;
});
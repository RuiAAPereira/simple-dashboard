class FormValidator {
	constructor(formSelector) {
		this.formElement = document.querySelector(formSelector);
		this.validationOptions = options;

		this.validateField = (formGroup) => {
			const label = formGroup.querySelector("label");
			const input = formGroup.querySelector("input, textarea, number, password, button, select, checkbox, radio");
			const errorContainer = formGroup.querySelector(".input__error");
			const errorIcon = formGroup.querySelector(".error-icon");
			const successIcon = formGroup.querySelector(".success-icon");

			this.setErrors(input, errorContainer, label, errorIcon, successIcon);

		};

		this.formElement.setAttribute("novalidate", "");

		Array.from(this.formElement.elements).forEach((element) => {
			this.addNewEventListener(element,"blur");
			this.addNewEventListener(element,"keyup");
		});

		this.formElement.addEventListener("submit", (event) => {
			event.preventDefault();
			this.validateAllFields(this.formElement);
			if (this.formElement.checkValidity()) {
				this.formElement.submit();
			}
		});
	}

	addNewEventListener(element, type) {
		element.addEventListener(type, (event) => {
			this.validateField(event.srcElement.parentElement);
		});
	}

	setErrors(input, errorContainer, label, errorIcon, successIcon) {
		let hasError = false;
		for (const option of this.validationOptions) {
			if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
				this.setErrorMessage(errorContainer, option, input, label);
				this.removeIcon(errorIcon, "error__hidden");
				this.setIcon(successIcon, "error__hidden");

				hasError = true;
			}
		}

		this.checkErrors(input, hasError, errorContainer, errorIcon, successIcon);
	}

	checkErrors(input, hasError, errorContainer, errorIcon, successIcon) {
		if (!hasError) {
			this.clearError(errorContainer);
			this.setIcon(errorIcon, "error__hidden");
			this.removeIcon(successIcon, "error__hidden");
			input.classList.remove("input__invalid");
			input.classList.add("input__valid");
		}
	}

	setIcon(icon, className) {
		if (icon) {
			errorIcon.classList.add(className);
		}
	}

	removeIcon(icon, className) {
		if (icon) {
			errorIcon.classList.remove(className);
		}
	}

	setErrorMessage(errorContainer, option, input, label) {
		if (errorContainer) {
			errorContainer.textContent = option.errorMessage(input, label);
		}
		input.classList.add("input__invalid");
	}

	clearError(errorContainer) {
		if (errorContainer) {
			errorContainer.textContent = "";
		}
	}

	validateAllFields(formToValidate) {
		const formGroups = Array.from(formToValidate.querySelectorAll(".form-group"));

		formGroups.forEach((formGroup) => {
			this.validateField(formGroup);
		});
	}
}

const options = [
	{
		attribute: "minlength",
		isValid: (input) => input.value && input.value.length >= parseInt(input.minLength, 10),
		errorMessage: (input, label) => `O campo ${label.textContent} deve ter no mínimo ${input.minLength} caracteres`,
	},
	{
		attribute: "custommaxlength",
		isValid: (input) => input.value && input.value.length <= parseInt(input.getAttribute("custommaxlength"), 10),
		errorMessage: (input, label) =>
			`O campo ${label.textContent} deve ter no máximo ${input.getAttribute("custommaxlength")} caracteres`,
	},
	{
		attribute: "match",
		isValid: (input) => {
			const matchInput = input.getAttribute("match");
			const inputToMatch = document.querySelector(`#${matchInput}`);
			return input.value && input.value === inputToMatch.value;
		},
		errorMessage: (input, label) =>
			`O campo ${label.textContent} deve ser igual ao campo ${input.getAttribute("match")}`,
	},
	{
		attribute: "pattern",
		isValid: (input) => input.value && new RegExp(input.pattern).test(input.value),
		errorMessage: (input, label) => `O campo ${label.textContent} é inválido`,
	},
	{
		attribute: "required",
		isValid: (input) => input.value.trim() !== "",
		errorMessage: (input, label) => `O campo ${label.textContent} é obrigatório`,
	},
];

export default FormValidator;

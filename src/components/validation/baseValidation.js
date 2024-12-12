const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

// Функция, которая добавляет класс с ошибкой
export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Проверка валидности поля
export const checkInputValidity = (formElement, inputElement, patterns = {}) => {
  const customError = patterns[inputElement.name]?.test(inputElement.value)
    ? ''
    : inputElement.dataset.error || inputElement.validationMessage;

  if (customError) {
    showInputError(formElement, inputElement, customError);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Переключение состояния кнопки
export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Установка обработчиков для формы
export const setValidationListeners = (formElement, patterns) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, patterns);
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
};

// Очистка ошибок и сброс кнопки
export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => hideInputError(formElement, inputElement));
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
};
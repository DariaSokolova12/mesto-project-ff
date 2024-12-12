import { setValidationListeners, clearValidation } from './baseValidation.js';

const editProfileForm = document.querySelector('.popup__form');

// Регулярные выражения для валидации
const patterns = {
  name: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
  description: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
};

// Инициализация валидации для формы редактирования профиля
export const enableEditProfileValidation = () => {
  setValidationListeners(editProfileForm, patterns);
};

// Очистка валидации
export const clearEditProfileValidation = () => {
  clearValidation(editProfileForm);
};

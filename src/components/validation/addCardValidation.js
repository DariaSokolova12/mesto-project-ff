import { setValidationListeners, clearValidation } from './baseValidation.js';

const addCardForm = document.querySelector('.popup__form');

// Регулярные выражения для валидации
const patterns = {
  'place-name': /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
  link: /^(https?:\/\/)([^\s.]+\.\S{2,}|localhost[:?\d]*)\S*$/,
};

// Инициализация валидации для формы добавления карточки
export const enableAddCardValidation = () => {
  setValidationListeners(addCardForm, patterns);
};

// Очистка валидации
export const clearAddCardValidation = () => {
  clearValidation(addCardForm);
};
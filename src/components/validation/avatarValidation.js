import { setValidationListeners, clearValidation } from './baseValidation.js';

const avatarForm = document.querySelector('.popup__avatar-form');

// Регулярные выражения для валидации
const patterns = {
  avatar: /^(https?:\/\/)([^\s.]+\.\S{2,}|localhost[:?\d]*)\S*$/,
};

// Инициализация валидации для формы аватара
export const enableAvatarValidation = () => {
  setValidationListeners(avatarForm, patterns);
};

// Очистка валидации
export const clearAvatarValidation = () => {
  clearValidation(avatarForm);
};
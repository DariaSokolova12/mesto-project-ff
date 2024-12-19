import { updateUserInfo } from '../api.js';
import { closeModal , openModal} from '../modal.js';
import { clearValidation , setValidationListeners ,validationConfig} from '../validation.js'
import { handleSubmit, updateUserInfoInDOM } from '../utils.js';
import { modalEditProfile, editProfileForm ,profileTitle, profileJob , popupForm , nameInput, jobInput} from '../DOMElements.js';
import {submitEditProfileForm } from '../index.js';

// Функция для открытия попапа с очисткой ошибок
export const openEditProfilePopup = () => {
  clearValidation(editProfileForm , validationConfig);

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;

  setValidationListeners(editProfileForm ,validationConfig);
  openModal(modalEditProfile);
};

// Инициализация обработчика отправки формы
export const initializeEditProfilePopup = () => {
    modalEditProfile.addEventListener("submit", submitEditProfileForm);
};
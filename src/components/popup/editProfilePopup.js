import { updateUserInfo } from '../api.js';
import { closeModal , openModal} from '../modal.js';
import { clearValidation ,validationConfig} from '../validation.js'
import {  updateUserInfoInDOM, showLoading, handleError, hideLoading } from '../utils.js';
import { modalEditProfile, editProfilePopup ,profileTitle, profileJob , nameInput, jobInput} from '../DOMElements.js';

// Функция для открытия попапа с очисткой ошибок
export const openEditProfilePopup = () => {
  clearValidation(editProfilePopup , validationConfig);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;

  openModal(modalEditProfile);
};

export const submitEditProfileForm = async (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  showLoading(submitButton, "Сохранение...");
  try {
    const userData = await updateUserInfo(nameInput.value, jobInput.value);
    updateUserInfoInDOM(userData, profileTitle, profileJob);
    closeModal(modalEditProfile);
  } catch (err) {
    handleError(err);
  } finally {
    hideLoading(submitButton);
  }
};

// Инициализация обработчика отправки формы
export const initializeEditProfilePopup = () => {
    modalEditProfile.addEventListener("submit", submitEditProfileForm);
};
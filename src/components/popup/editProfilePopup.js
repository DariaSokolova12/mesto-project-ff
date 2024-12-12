import { updateUserInfo } from '../api.js';
import { closeModal } from '../modal.js';
import { clearEditProfileValidation, enableEditProfileValidation } from '../validation/editProfileValidation.js';
import { handleSubmit, updateUserInfoInDOM } from '../utils.js';
import { DOMElements } from '../DOMElements.js';

const { modalEditProfile, profileTitle, profileJob } = DOMElements;
const editProfileForm = document.querySelector('.popup__form');

// Обработчик отправки формы
export const handleEditProfileSubmit = (evt) => {
  handleSubmit(async () => {
    const userData = await updateUserInfo(nameInput.value, jobInput.value);
    updateUserInfoInDOM(userData, profileTitle, profileJob);
    closeModal(modalEditProfile);
  }, evt);
};
// Функция для открытия попапа с очисткой ошибок
export const openEditProfilePopup = () => {
  clearEditProfileValidation();
  const nameInput = editProfileForm.querySelector('input[name="name"]');
  const jobInput = editProfileForm.querySelector('input[name="description"]');

  nameInput.value = document.querySelector(profileTitle).textContent;
  jobInput.value = document.querySelector(profileJob).textContent;

  enableEditProfileValidation();
};

// Инициализация обработчика отправки формы
export const initializeEditProfilePopup = () => {
  editProfileForm.addEventListener("submit", handleEditProfileSubmit);
};
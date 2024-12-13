import { updateUserInfo } from '../api.js';
import { closeModal } from '../modal.js';
import { clearValidation , setValidationListeners } from '../validation.js'
import { handleSubmit, updateUserInfoInDOM } from '../utils.js';
import { modalEditProfile, profileTitle, profileJob , popupForm} from '../DOMElements.js';


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
  clearValidation(popupForm);
  const nameInput = popupForm.querySelector('input[name="name"]');
  const jobInput = popupForm.querySelector('input[name="description"]');

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;

  setValidationListeners(popupForm);
};

// Инициализация обработчика отправки формы
export const initializeEditProfilePopup = () => {
    popupForm.addEventListener("submit", handleEditProfileSubmit);
};
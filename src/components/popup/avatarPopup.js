import { updateAvatar } from '../api.js';
import { closeModal } from '../modal.js';
import { clearValidation , setValidationListeners } from '../validation.js';
import { handleSubmit } from '../utils.js';
import { profileImage, avatarForm } from '../DOMElements.js';


// Обработчик отправки формы
export const handleAvatarSubmit = (evt) => {
  handleSubmit(async () => {
    const avatarUrl = avatarInput.value;
    const userData = await updateAvatar(avatarUrl);
    profileImage.src = userData.avatar;
    closeModal(modalAvatar);
  }, evt);
};
// Функция для открытия попапа с очисткой ошибок
export const openAvatarPopup = () => {
  clearValidation(avatarForm);
  setValidationListeners(avatarForm);
};

// Инициализация обработчика отправки формы
export const initializeAvatarPopup = () => {
  avatarForm.addEventListener("submit", handleAvatarSubmit);
};
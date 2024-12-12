import { updateAvatar } from '../api.js';
import { closeModal } from '../modal.js';
import { clearAvatarValidation, enableAvatarValidation } from '../validation/avatarValidation.js';
import { handleSubmit } from '../utils.js';
import { DOMElements } from '../DOMElements.js';

const { profileImage } = DOMElements;
const avatarForm = document.querySelector('.popup__avatar-form');

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
  clearAvatarValidation();
  enableAvatarValidation();
};

// Инициализация обработчика отправки формы
export const initializeAvatarPopup = () => {
  avatarForm.addEventListener("submit", handleAvatarSubmit);
};
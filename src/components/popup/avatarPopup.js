import { updateAvatar } from '../api.js';
import { closeModal ,openModal } from '../modal.js';
import { clearValidation ,validationConfig} from '../validation.js';
import { handleSubmit } from '../utils.js';
import { profileImage, avatarPopup , avatarFormElement} from '../DOMElements.js';


// Обработчик отправки формы
export const handleAvatarSubmit = (evt) => {
  function makeRequest() {
   const avatar = avatarFormElement.elements["avatar-link"].value;
   return updateAvatar(avatar)
      .then((res) => {
        // Обновление аватара на странице
        profileImage.setAttribute("style", `background-image: url('${res.avatar}')`);
        // Закрытие попапа после успешного обновления аватара
        closeModal(avatarPopup);
      });
    }
  handleSubmit(makeRequest, evt);
};

// Функция для открытия попапа с очисткой ошибок
export const openAvatarPopup = () => {
  clearValidation(avatarPopup,validationConfig);
  openModal(avatarPopup);
};

// Инициализация обработчика отправки формы
export const initializeAvatarPopup = () => {
  avatarPopup.addEventListener("submit", handleAvatarSubmit);
};
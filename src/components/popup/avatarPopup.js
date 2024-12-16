import { updateAvatar } from '../api.js';
import { closeModal ,openModal } from '../modal.js';
import { clearValidation , setValidationListeners ,validationConfig} from '../validation.js';
import { handleSubmit } from '../utils.js';
import { profileImage, avatarForm , avatarFormElement} from '../DOMElements.js';


// Обработчик отправки формы
export const handleAvatarSubmit = (evt) => {
  function makeRequest() {
   const avatar = avatarFormElement.elements["avatar-link"].value;
   return updateAvatar(avatar)
      .then((res) => {
        // Обновление аватара на странице
        profileImage.setAttribute("style", `background-image: url('${res.avatar}')`);
        // Закрытие попапа после успешного обновления аватара
        closeModal(avatarForm);
      });
    }
  handleSubmit(makeRequest, evt);
};

// Функция для открытия попапа с очисткой ошибок
export const openAvatarPopup = () => {
  clearValidation(avatarForm ,validationConfig);
  setValidationListeners(avatarForm , validationConfig);
  openModal(avatarForm);
};

// Инициализация обработчика отправки формы
export const initializeAvatarPopup = () => {
  avatarForm.addEventListener("submit", handleAvatarSubmit);
};
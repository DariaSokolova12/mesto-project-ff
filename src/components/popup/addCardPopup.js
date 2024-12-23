import { addNewCard , getUserInfo } from '../api.js';
import { createCard } from '../card.js';
import { closeModal , openModal} from '../modal.js';
import { clearValidation ,validationConfig } from '../validation.js';
import { handleSubmit } from '../utils.js';
import { cardPopup, placesList, cardLinkInput, cardNameInput, modalAddCard} from '../DOMElements.js';
import { openImage } from '../index.js';


// Обработчик отправки формы
export const handleAddCardSubmit = async (evt) => {
  evt.preventDefault(); 

  const userInfo = await getUserInfo();
  const userId = userInfo._id;

  handleSubmit(async () => {
    const cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    const newCard = await addNewCard(cardData);
    const cardElement = createCard(newCard, userId, openImage);
    placesList.prepend(cardElement);
    closeModal(cardPopup);
  }, evt);
};
// Функция для открытия попапа с очисткой ошибок
export const openAddCardPopup = () => {
  clearValidation(cardPopup ,validationConfig);
  openModal(modalAddCard);
};

// Инициализация обработчика отправки формы
export const initializeAddCardPopup = () => {
  cardPopup.addEventListener("submit", handleAddCardSubmit);
};
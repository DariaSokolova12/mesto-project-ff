import { addNewCard } from '../api.js';
import { createCard } from '../card.js';
import { closeModal , openModal} from '../modal.js';
import { clearValidation , setValidationListeners ,validationConfig } from '../validation.js';
import { handleSubmit, resetForm } from '../utils.js';
import { addForm, placesList, popupForm , cardLinkInput, cardNameInput} from '../DOMElements.js';


// Обработчик отправки формы
export const handleAddCardSubmit = (evt) => {
  handleSubmit(async () => {
    const cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    const newCard = await addNewCard(cardData);
    const cardElement = createCard(newCard);
    placesList.prepend(cardElement);
    resetForm(popupForm);
    closeModal(addForm);
  }, evt);
};
// Функция для открытия попапа с очисткой ошибок
export const openAddCardPopup = () => {
  clearValidation(addForm ,validationConfig);
  setValidationListeners(addForm, validationConfig);
  openModal(popupForm);
};

// Инициализация обработчика отправки формы
export const initializeAddCardPopup = () => {
  popupForm.addEventListener("submit", handleAddCardSubmit);
};
import "../index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard ,likeCard} from "./card";
import { openModal, closeModal } from "./modal";



 

// @todo: DOM узлы 

const placesList = document.querySelector('.places__list'); 

const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const addButton = document.querySelector(".profile__add-button");

const modalEditProfile = document.querySelector(".popup_type_edit");
const editProfileForm = modalEditProfile.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');

const modalAddCard = document.querySelector(".popup_type_new-card");
const addForm = modalAddCard.querySelector(".popup__form");
const cardNameInput = addForm.querySelector('input[name="place-name"]');
const cardLinkInput = addForm.querySelector('input[name="link"]');

const previewImage = document.querySelector(".popup__image");
const captionModal = document.querySelector(".popup__caption");
const previewImageModal = document.querySelector(".popup_type_image");

const clickHandleImage = (evt) => {
  const element = evt.target.closest(".card");
  const cardImage = element.querySelector(".card__image");
  const cardTitle = element.querySelector(".card__title");

  previewImage.src = cardImage.src;
  previewImage.alt = cardTitle.alt;

  captionModal.textContent = cardTitle.textContent;

  openModal(previewImageModal);
};


function renderInitialCards() { 

  initialCards.forEach((cardData) => { 

    const cardElement = createCard(cardData, deleteCard); 

    placesList.appendChild(cardElement); 

  }); 

} 
 renderInitialCards();


const openModalEditProfile = () => {
  openModal(modalEditProfile);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
};

const openModalAddCard = () => {
  openModal(modalAddCard);
};

const submitEditProfileForm = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editProfileForm.reset();

  closeModal(modalEditProfile);
};

const submitAddForm = (evt) => {
  evt.preventDefault();

  const addCard = createCard(
    cardNameInput.value,
    cardLinkInput.value,
    likeCard,
    deleteCard,
    clickHandleImage
  );
  cardList.prepend(addCard);

  addForm.reset();
  closeModal(modalAddCard);
};

editButton.addEventListener("click", openModalEditProfile);
editProfileForm.addEventListener("submit", submitEditProfileForm);

addButton.addEventListener("click", openModalAddCard);
addForm.addEventListener("submit", submitAddForm);

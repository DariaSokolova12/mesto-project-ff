const DOMElements = {
    // Профиль
    profileTitle: document.querySelector(".profile__title"),
    profileJob: document.querySelector(".profile__description"),
    profileImage: document.querySelector(".profile__image"),
    editButton: document.querySelector(".profile__edit-button"),
    addButton: document.querySelector(".profile__add-button"),
    avatarEditButton: document.querySelector(".profile__avatar-edit"),
  
    // Модальные окна
    modalEditProfile: document.querySelector(".popup_type_edit"),
    modalAddCard: document.querySelector(".popup_type_new-card"),
    modalAvatar: document.querySelector(".popup_type_avatar"),
  
    // Формы
    editProfileForm: document.querySelector(".popup_type_edit .popup__form"),
    addForm: document.querySelector(".popup_type_new-card .popup__form"),
    avatarForm: document.querySelector(".popup_type_avatar .popup__form"),
  
    // Поля ввода
    nameInput: document.querySelector('.popup_type_edit input[name="name"]'),
    jobInput: document.querySelector('.popup_type_edit input[name="description"]'),
    cardNameInput: document.querySelector('.popup_type_new-card input[name="place-name"]'),
    cardLinkInput: document.querySelector('.popup_type_new-card input[name="link"]'),
    avatarInput: document.querySelector('.popup_type_avatar input[name="avatar"]'),
  
    // Список карточек
    placesList: document.querySelector(".places__list"),
};
  
export { DOMElements };
import { initializeEditProfilePopup, openEditProfilePopup } from './editProfilePopup.js';
import { initializeAddCardPopup, openAddCardPopup } from './addCardPopup.js';
import { initializeAvatarPopup, openAvatarPopup } from './avatarPopup.js';

export const initializePopups = () => {
  initializeEditProfilePopup();
  initializeAddCardPopup();
  initializeAvatarPopup();
};

export const openPopupHandlers = {
  editProfile: openEditProfilePopup,
  addCard: openAddCardPopup,
  avatar: openAvatarPopup,
};
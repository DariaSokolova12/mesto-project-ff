import { enableEditProfileValidation, clearEditProfileValidation } from './editProfileValidation.js';
import { enableAddCardValidation, clearAddCardValidation } from './addCardValidation.js';
import { enableAvatarValidation, clearAvatarValidation } from './avatarValidation.js';

export const enableValidation = () => {
  enableEditProfileValidation();
  enableAddCardValidation();
  enableAvatarValidation();
};

export const clearAllValidations = () => {
  clearEditProfileValidation();
  clearAddCardValidation();
  clearAvatarValidation();
};
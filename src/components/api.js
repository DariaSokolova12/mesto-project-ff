
const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-22';
const headers = {
  Authorization: 'acaff574-79d2-458f-8b94-edc6e369df38',
  'Content-Type': 'application/json'
 };

// Проверка ответа от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение данных о пользователе
const getUserInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: headers
  }).then(checkResponse);
};


// Получение всех карточек
const getInitialCards = () => {
  return fetch(`${baseUrl}/cards`, {
    headers: headers
  }).then(checkResponse);
};

// Обновление информации о пользователе (редактирование профиля)
const updateUserInfo = (name, about) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ name, about })
  }).then(checkResponse);
};

// Добавление новой карточки
const addNewCard = (cardData) => {
  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(cardData)
  }).then(checkResponse);
};

// Удаление карточки
const deleteCard = (cardId) => {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: headers
  }).then(checkResponse);
};

// Постановка лайка
const likeCardApi = (cardId) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: headers
  }).then(checkResponse);
};

// Снятие лайка
const dislikeCard = (cardId) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: headers
  }).then(checkResponse);
};

// Обновление аватара пользователя
const updateAvatar = (avatarUrl) => {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ avatar: avatarUrl })
  }).then(checkResponse);
};

export {getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard, likeCardApi, dislikeCard, updateAvatar} ;
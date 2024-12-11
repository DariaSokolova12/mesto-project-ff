
const baseUrl = "https://nomoreparties.co/v1/wff-cohort-22";
const headers = {
  Authorization: "acaff574-79d2-458f-8b94-edc6e369df38",
  "Content-Type": "application/json",
 };

// Проверка ответа от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Универсальная функция для запросов 
const request = (url,options ={}) => {
  return fetch(`${baseUrl}${url}`, {
    headers,...options
  }).then(checkResponse);
};

// Получение данных о пользователе
const getUserInfo = () => request('/users/me');


// Получение всех карточек
const getInitialCards = () => request('/cards');

// Обновление информации о пользователе (редактирование профиля)
const updateUserInfo = (name, about) => {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({name, about})
  })
};

// Добавление новой карточки
const addNewCard = (cardData) => {
  return request('/cards', {
    method: 'POST',
    body: JSON.stringify(cardData)
  })
};

// Удаление карточки
const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
  })
};

// Постановка лайка
const likeCardApi = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
  })
};

// Снятие лайка
const dislikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
  })
};

// Обновление аватара пользователя
const updateAvatar = (avatar) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar })
  })
};

export {getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard, likeCardApi, dislikeCard, updateAvatar} ;
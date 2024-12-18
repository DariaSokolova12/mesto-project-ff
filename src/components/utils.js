import { addForm } from "./DOMElements";

export const showLoading = (buttonElement, loadingText) => {
  buttonElement.dataset.originalText = buttonElement.textContent;
  buttonElement.textContent = loadingText;
  buttonElement.disabled = true;
};


export const hideLoading = (buttonElement) => {
  if (buttonElement.dataset.originalText) {
    buttonElement.textContent = buttonElement.dataset.originalText;
    delete buttonElement.dataset.originalText;
  }
  buttonElement.disabled = false;
};


export function handleSubmit(makeRequest, evt) {
  evt.preventDefault();

  // Найти кнопку отправки внутри формы
  const submitButton = evt.target.querySelector(".popup__button");
  const originalText = submitButton.textContent;

  // Показать индикатор загрузки
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  // Выполнить запрос
  makeRequest()
    .then(() => {
      console.log("Данные успешно отправлены"); 
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      // Вернуть исходное состояние кнопки
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}


//проверка ответа сервера 
export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

//Сброс полей формы 
export const resetForm = (form) => {
  form.reset();  
};

//проверка является ли строка допустимым юрл
export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
};

//обработкаошибок 
export const handleError = (error) => {
    console.error(`Ошибка: ${error}`);
};

//обновить инормацию о пользователе в дом
export const updateUserInfoInDOM = (userData, profileTitle, profileJob, profileImage) => {
    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    if (profileImage) {
      profileImage.src = userData.avatar;
    }
};


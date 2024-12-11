//показать индикатор загрузки на кнопке 
export const showLoading = (buttonElement, loadingText) => {
    buttonElement.dataset.originalText = buttonElement.textContent;
    buttonElement.textContent = loadingText;
    buttonElement.disabled = true;
};

//скрыть индикатор загрузки на кнопке 
export const hideLoading = (buttonElement) => {
    if (buttonElement.dataset.originalText) {
      buttonElement.textContent = buttonElement.dataset.originalText;
      delete buttonElement.dataset.originalText;
    }
    buttonElement.disabled = false;
};

//функция для обработки отправки формы 
export const handleSubmit = (makeRequest, event) => {
    event.preventDefault();
    const submitButton = event.target.querySelector(".popup__button");
    const originalText = submitButton.textContent;
  
    // Показать индикатор загрузки
    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;
  
    makeRequest()
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
};

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
    const inputs = Array.from(form.querySelectorAll("input"));
    inputs.forEach((input) => {
      input.value = "";
    });
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
export const updateUserInfoInDOM = (userData, titleElement, jobElement, avatarElement) => {
    titleElement.textContent = userData.name;
    jobElement.textContent = userData.about;
    if (avatarElement) {
      avatarElement.src = userData.avatar;
    }
};

//отображение сообщения об ошибке 
export const showError = (container, message) => {
    container.textContent = message;
    container.classList.add("error-visible");
    setTimeout(() => {
      container.textContent = "";
      container.classList.remove("error-visible");
    }, 3000);
};
/**
 * Открывает модальное окно
 */
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  attachModalEvents();
};

/**
 * Закрывает модальное окно
 */
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  removeModalListeners();
};

/**
 * Обработчик нажатия клавиши "Escape" для закрытия текущего модального окна
 */
const handleEscapes = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    if (currentPopup) closeModal(currentPopup);
  }
};

/**
 * Обработчик клика по внешнему контенту для закрытия модального окна
 */
const handleOutside = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
};

/**
 * Обработчик клика по кнопке закрытия модального окна
 */
const handleCross = (evt) => {
  if (evt.target.closest(".popup__close")) {
    closeModal(evt.target.closest(".popup"));
  }
};

/**
 * Подключает обработчики событий для модального окна
 */
const attachModalEvents = () => {
  document.addEventListener("click", handleCross);
  document.addEventListener("keydown", handleEscapes);
  document.addEventListener("click", handleOutside);
};

/**
 * Отключает обработчики событий для модального окна
 */
const removeModalListeners = () => {
  document.removeEventListener("click", handleCross);
  document.removeEventListener("keydown", handleEscapes);
  document.removeEventListener("click", handleOutside);
};

export { openModal, closeModal };


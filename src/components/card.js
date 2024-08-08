// Создание нового карточного элемента
const cardTemplate = document.querySelector('#card-template').content; 


function createCard(cardData, deleteCardCallback, imageOpenCallback) { 

    // Клонируем шаблон карточного элемента
    const cardElement = cardTemplate.cloneNode(true).querySelector('.card'); 
  
    // Получаем элементы карточного элемента
    const cardImage = cardElement.querySelector('.card__image'); 
    const cardTitle = cardElement.querySelector('.card__title'); 
  
    // Устанавливаем значения карточного элемента
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name; 
  
    // Добавляем обработчик удаления карточного элемента
    const deleteIcon = cardElement.querySelector('.card__delete-button'); 
    deleteIcon.addEventListener('click', function () { 
      deleteCardCallback(cardElement); 
    }); 

    // Добавляем обработчик нажатия на кнопку "Like"
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);

    // Добавляем обработчик нажатия на картинку
    cardImage.addEventListener('click', () => { 
        imageOpenCallback(cardData);
    }); 
        
  
    return cardElement; 
  
} 

/**
 * Удаление карточного элемента
 */
function deleteCard(cardElement) { 
    if (cardElement) { 
      cardElement.remove(); 
    } 
}

/**
 * Обработчик нажатия на кнопку "Like"
 */
const likeCard = (evt) => {
    const cardLikeButton = evt.target;
    cardLikeButton.classList.toggle("card__like-button_is-active");
};

// Экспортируем функции для использования в других файлах
export { createCard, deleteCard, likeCard };

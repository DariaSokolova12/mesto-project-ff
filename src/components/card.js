const cardTemplate = document.querySelector('#card-template').content; 

function createCard(cardData, deleteCardCallback) { 

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  
   
  
    const cardImage = cardElement.querySelector('.card__image'); 
  
    const cardTitle = cardElement.querySelector('.card__title'); 
  
   
  
    cardImage.src = cardData.link; 
  
    cardImage.alt = cardData.name; 
  
    cardTitle.textContent = cardData.name; 
  
   
  
    const deleteIcon = cardElement.querySelector('.card__delete-button'); 
  
    deleteIcon.addEventListener('click', function () { 
  
      deleteCardCallback(cardElement); 
  
    }); 
  
   
  
    return cardElement; 
  
  } 

  function deleteCard(cardElement) { 

    if (cardElement) { 
  
      cardElement.remove(); 
  
    } 
  
  }


  const likeCard = (evt) => {
    const cardLikeButton = evt.target;
    cardLikeButton.classList.toggle("card__like-button_is-active");
  };

  export { createCard, deleteCard,likeCard };
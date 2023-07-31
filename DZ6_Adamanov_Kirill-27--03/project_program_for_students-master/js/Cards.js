async function fetchCardsData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
  
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = card.title;
    cardDiv.appendChild(cardTitle);
  
    const cardDescription = document.createElement('p');
    cardDescription.textContent = card.body;
    cardDiv.appendChild(cardDescription);
  
    return cardDiv;
  }
  
  async function displayCards() {
    const cardsData = await fetchCardsData();
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');
  
    cardsData.forEach((card) => {
      const cardElement = createCardElement(card);
      cardsContainer.appendChild(cardElement);
    });
  
    const wrapper = document.querySelector('.wrapper');
    wrapper.appendChild(cardsContainer);
  
    // Добавить событие загрузки к контейнеру карточек
    cardsContainer.addEventListener('load', () => {
      // Удалить класс `margin-top-auto` с футера
      footer.classList.remove('margin-top-auto');
    });
  }
  
  displayCards();
  const footer = document.querySelector('footer');
const cardsContainer = document.querySelector('.cards-container');

cardsContainer.addEventListener('load', () => {
  footer.classList.add('bottom');
});
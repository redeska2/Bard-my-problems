const tabContent = document.querySelectorAll('.tab_content_block');
const tabsParent = document.querySelector('.tab_content_items');
const tabs = document.querySelectorAll('.tab_content_item');

let currentTabIndex = 0;
let intervalId;

const hideTabContent = () => {
  tabContent.forEach((element) => {
    element.style.display = 'none';
  });
  tabs.forEach((element) => {
    element.classList.remove('tab_content_item_active');
  });
};

const showTabContent = (index) => {
  tabContent[index].style.display = 'block';
  tabs[index].classList.add('tab_content_item_active');
};

const switchTab = (index) => {
  hideTabContent();
  currentTabIndex = index;
  showTabContent(currentTabIndex);
};

const autoSwitchTab = () => {
  const nextTabIndex = (currentTabIndex + 1) % tabs.length;
  switchTab(nextTabIndex);
};

const startAutoSwitch = () => {
  clearInterval(intervalId);
  intervalId = setInterval(autoSwitchTab, 3000);
};

const stopAutoSwitch = () => {
  clearInterval(intervalId);
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    switchTab(index);
    intervalId = setInterval(autoSwitchTab, 3000);
  });
});

hideTabContent();
showTabContent(currentTabIndex);
startAutoSwitch();

const tabSlider = document.querySelector('.tab_slider');
tabSlider.addEventListener('mouseenter', stopAutoSwitch);
tabSlider.addEventListener('mouseleave', startAutoSwitch);
window.addEventListener('blur', stopAutoSwitch);
window.addEventListener('focus', startAutoSwitch);

// CARD SWITCHER
const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
let count = 1;

const fetchCardById = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching card data:', error);
    return null;
  }
};

const updateCard = (cardData) => {
  if (!cardData) return;

  const completedStatus = cardData.completed ? 'true' : 'false';
  const highlightClass = cardData.completed ? 'highlight-true' : 'highlight-false';
  const borderClass = cardData.completed ? 'completed-true' : 'completed-false';

  // Update the card content based on the fetched data
  card.innerHTML = `
    <h2>${count}</h2>
    <p>${cardData.title}</p>
    <p><span class="${highlightClass}">${completedStatus}</span></p>
  `;
  card.className = `card ${borderClass}`;
};

const prevCard = async () => {
  if (count === 1) {
    count = 200;
  } else {
    count--;
  }
  const data = await fetchCardById(count);
  updateCard(data);
};

const nextCard = async () => {
  if (count === 200) {
    count = 1;
  } else {
    count++;
  }
  const data = await fetchCardById(count);
  updateCard(data);
};

const fetchAndLogPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await response.json();
    console.log(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// Initial load
fetchCardById(count)
  .then(data => updateCard(data));

// Event listeners for prev and next buttons
btnPrev.addEventListener('click', prevCard);
btnNext.addEventListener('click', nextCard);

// Fetch and log posts
fetchAndLogPosts();

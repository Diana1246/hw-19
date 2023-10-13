import pageTpl from './photoTpl.hbs';

const apiKey = '39606920-bd6e9b735f561385f0c7b3b10'; 
let currentPage = 1;
let currentQuery = '';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMore = document.getElementById('load-more');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.query.value;
  if (query !== '') {
    currentQuery = query;
    currentPage = 1;
    await searchImages(query, currentPage);
  }
});

loadMore.addEventListener('click', async () => {
    if (!loadMore.classList.contains('loading')) {
        loadMore.classList.add('loading');
        currentPage++;
        await searchImages(currentQuery, currentPage);
        loadMore.classList.remove('loading');
      }
});

async function searchImages(query, page) {
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${apiKey}`;
  try {
    const page = await fetch(url);
    const data = await page.json();
    displayImages(data.hits);
    Gallery();
  } catch (error) {
    showNotification('Error fetching images', 'error');
  }
}

function displayImages(images) {
    gallery.innerHTML = '';
  images.forEach((image) => {
    gallery.innerHTML += pageTpl(image)
  });
}


function Gallery() {
  const element = gallery;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}




 

 
  
 
  

 

 
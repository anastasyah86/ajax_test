import './styles.css';
import newsService from './js/news_service';
import renderMurkup from './js/updateMarkup';

const refs = {
  articlesContainer: document.querySelector('.js-articles'),
  searchForm: document.querySelector('.js-search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  spin: document.getElementById('spinner'),
};

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  newsService.query = form.elements.query.value;

  refs.articlesContainer.innerHTML = '';

  newsService.resetPage();
  refs.loadMoreBtn.classList.add('is-hidden');

  /* adding spinner */
  refs.spin.classList.remove('sr-only');

  /*  http respond */
  newsService.fetchArticles().then(renderMurkup);
  refs.loadMoreBtn.classList.remove('is-hidden');
  form.reset();
});

refs.loadMoreBtn.addEventListener('click', () => {
  newsService.fetchArticles().then(renderMurkup);
});

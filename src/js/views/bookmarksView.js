import view from './view.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = 'No bookmark yet! you can bookmark any good recipe ;)';
  _seccessMessage = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        }" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
            </div>
          </div>
        </a>
      </li>`;
  }

  addHandlerLocalBookmark(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();

import view from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    //page 1, there are other pages
    if (curPage === 1 && numPages > 1)
      return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    //page 1, there are No other pages
    if (curPage === 1 && numPages === 1) return '';
    //last page
    if (curPage === numPages)
      return `<button data-goto="${curPage - 1}"
    class="btn--inline  pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
        </button>`;
    //other page
    if (1 < curPage < numPages)
      return `<button data-goto="${curPage - 1}"
                class="btn--inline  pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                    </button>
                    <button data-goto="${curPage + 1}"
                       class="btn--inline  pagination__btn--next">
                        <span>Page ${curPage + 1}</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                       </svg>
              </button>`;
  }
}

export default new PaginationView();

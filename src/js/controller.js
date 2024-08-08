import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import view from './views/view.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////

const controllerRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0-updating results view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    //1-Updating result view
    bookmarksView.update(model.state.bookmarks);
    //2-Loading Recipe
    await model.loadRecipe(id);
    //3-Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllerSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1- getting the query from input field
    const query = searchView.getQuery();
    if (!query) return;

    //2-Loading the data based on query
    await model.loadSearchResults(query);

    //3- Rendering the results
    resultsView.render(model.getSearchResultPage());

    //4-Pagination Rendering
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controllerPagination = function (gotoPage) {
  //1- Rendering new results
  resultsView.render(model.getSearchResultPage(gotoPage));
  //2-new Pagination Rendering
  paginationView.render(model.state.search);
};

const controllerServings = function (newServings) {
  //Updating the recipe servings (in state)
  model.updateServings(newServings);
  //Updating recipe view
  recipeView.update(model.state.recipe);
};

const controllerlocalBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controllerAddBookmark = function () {
  //Add or Remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);
  //Update recipe view
  recipeView.update(model.state.recipe);
  //Rendering bookmarks in that section
  bookmarksView.render(model.state.bookmarks);
};

const controllerUploadRecipe = async function (newRecipe) {
  try {
    //Show Spinner
    recipeView.renderSpinner();

    //Upload the new Recipe
    await model.uploadRecipe(newRecipe);

    //Render Uploaded recipe
    recipeView.render(model.state.recipe);

    //Render Bookmark
    bookmarksView.render(model.state.bookmarks);

    //Change Url for correcting
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Render Seccess Message
    addRecipeView.renderSeccessMessage('Successfull');

    //Auto Close Modal
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🔴', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  window.location.hash = '';
  bookmarksView.addHandlerLocalBookmark(controllerlocalBookmarks);
  recipeView.addHandlerRender(controllerRecipes);
  recipeView.addHandlerUpdateServings(controllerServings);
  recipeView.addHandlerAddBookmark(controllerAddBookmark);
  searchView.addHandlerSearch(controllerSearchResults);
  paginationView.addHandlerClick(controllerPagination);
  addRecipeView.addHandlerUpload(controllerUploadRecipe);
};
init();

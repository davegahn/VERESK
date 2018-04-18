/**
 * Импорт стилей
 */
import '../../sass/main.scss';
import './products.scss';
import 'normalize.css';

/**
 * Импорт компонентов меню, рендеринга продуктов и функции работы с сервером
 */
import createMenu from '../../components/aside/aside';
// import { fillProducts } from './renderProducts.js';
// import loadProduction from './load';

// --------------------------------------------------------------------------------------------------------------------------------------

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'fvwpxwob4rjn',
  accessToken: '9dd7bfbe40eb7ddc918a402442cc428ef8da74747746bea8945c1c653417878d',
});

const loadProduction = function (category_id) {
  client.getEntries({
    'content_type': category_id,
  })
    .then(function (entries) {
      // console.log(entries);
      fillProducts(entries);
    });
};

const renderProducts = (item) => {
  // console.log(item);
  let productsTemplate = document.querySelector('template').content;
  let product = productsTemplate.cloneNode(true);
  // product.querySelector('.products-heading').textContent = item.title;
  product.querySelector('.product-desc__title').textContent = item.fields.title;
  product.querySelector('.product-desc__text').textContent = item.fields.description;
  // product.querySelector('.main-image').src = item.image.file.url;
  // product.querySelector('.big-image').src = item.bigImage.file.url;
  //   product.querySelector('.desc-param__value--before').textContent = item.before;
  //   product.querySelector('.desc-param__value--weight').textContent = item.weight;
  //   product.querySelector('.desc-param__value--box').textContent = item.boxSize;
  //   product.querySelector('.desc-param__value--fasovka').textContent = item.fasovka;
  //   product.querySelector('.desc-param__value--numPerBox').textContent = item.numPerBox;
  return product;
};

const fillProducts = (data) => {
  console.log(data);
  let container = document.querySelector('.products-wrapper');
  container.innerHTML = '';
  let fragment = document.createDocumentFragment();

  data.items.forEach(function (entry) {
    console.log(entry);
    // fragment.appendChild(renderProducts(entry));
    // console.log(entry.fields.title);
    // console.log(entry.fields.description);
    // console.log(entry.fields.chars);
    // console.log(entry.image.fields.file.url);
    // console.log(entry.bigImage.fields.file.url);
  });
  container.appendChild(fragment);
};

const renderProductList = () => {

  const product_categories = {
    product: 'product',
    tubes: 'tubes',
    torts: 'torts',
    diets: 'diets',
  };

  let hash = window.location.hash;
  let categoryLinks = document.querySelectorAll('.products-menu__link');
  if (hash === '#vafli') {
    loadProduction(product_categories.product);
    categoryLinks[0].parentElement.classList.add('products-menu__item--active');
  } else if (hash === '#tubes') {
    loadProduction(product_categories.tubes);
    categoryLinks[1].parentElement.classList.add('products-menu__item--active');
  }
  // else if (hash === '#torts') {
  //   loadProduction(2, fillProducts, composeCallbacks);
  //   categoryLinks[2].parentElement.classList.add('products-menu__item--active');
  // } else if (hash === '#diets') {
  //   loadProduction(3, fillProducts, composeCallbacks);
  //   categoryLinks[3].parentElement.classList.add('products-menu__item--active');
  // }
};








/**
 * Функция корректироки высоты блока с фотогорафиями продукции.
 * Наблюдается в некоторых браузерах - картинка вылезает за блок
 */
const correctHeights = () => {
  const productBlocks = document.querySelectorAll('.product-item__image');

  [].forEach.call(productBlocks, productBlock => {
    let productBlockHeight = productBlock.offsetHeight;
    let productImage = productBlock.children[0];
    let productHeight = productImage.offsetHeight;
    if (productHeight >= productBlockHeight) {
      productImage.style.height = '100%';
    }
  });
};

/**
 * Функция открытия модального окна при нажатии на фото,
 * и закрытия по кнопке или ESC
 */

const emitModal = () => {
  const ENTER_KEYCODE = 27;
  const modalLinks = $('.big-image-link');
  const modalClose = $('.modal__close');

  modalLinks.on('click', function (e) {
    console.log('click');
    e.preventDefault();
    let item = this.closest('.product-item');
    let $modalW = $(item).find('.product-modal__overlay');
    $modalW.fadeIn(500);
  });
  modalClose.on('click', function () {
    let itemToClose = this.closest('.product-modal__overlay');
    $(itemToClose).fadeOut(500);
  });

  $(document).keyup(function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      let itemToClose = $('.product-modal__overlay');
      $(itemToClose).fadeOut(500);
    }
  });
};

/**
 * Вызов 2 функций в коллбеке onLoadEnd
 */
const composeCallbacks = () => {
  correctHeights();
  emitModal();
};


/**
 * Функция подгрузки товаров соответствующей категории, вставляем на страницу
 * отрендеренный блок с товарами и стилизуем соответствующую ссылку в меню
 */
// const renderProductList = () => {
//   let hash = window.location.hash;
//   let categoryLinks = document.querySelectorAll('.products-menu__link');
//   if (hash === '#vafli') {
//     loadProduction(0, fillProducts, composeCallbacks);
//     categoryLinks[0].parentElement.classList.add('products-menu__item--active');
//   } else if (hash === '#tubes') {
//     loadProduction(1, fillProducts, composeCallbacks);
//     categoryLinks[1].parentElement.classList.add('products-menu__item--active');
//   } else if (hash === '#torts') {
//     loadProduction(2, fillProducts, composeCallbacks);
//     categoryLinks[2].parentElement.classList.add('products-menu__item--active');
//   } else if (hash === '#diets') {
//     loadProduction(3, fillProducts, composeCallbacks);
//     categoryLinks[3].parentElement.classList.add('products-menu__item--active');
//   }
// };

/**
 * Функция загрузки страницы с товарами и прокрутки вверх
 * @param  {Object} evt
 * @param  {number} idx  [индекс категории]
 * @param  {String} hash [хеш строки ввода]
 */
const changeProduction = (evt, idx, hash) => {
  evt.preventDefault();
  window.location.hash = hash;
  loadProduction(idx, fillProducts, composeCallbacks);
  $('html, body').animate({ scrollTop: 0 }, 1000);
};

/*********************************************************************/
/**********************  При загрузке страницы **********************/
/********************************************************************/

$(document).ready(function () {
  /**
   * Устанавливаем фоновую картику
   */
  const leftImage = document.querySelector('.aside');
  leftImage.style.backgroundImage = 'url(images/menu_bg_1.jpg)';
  /**
   * Подгружаем товары категории, по которой перешли на страницу
   */
  renderProductList();

  /**
   * Заставляем меню оставаться открытым при загрузке страницы с товарами
   */
  const mainMenu = document.querySelector('.main-menu');
  const collapseTrigger = mainMenu.querySelector('.collapse-trigger');
  const menuCollapse = mainMenu.querySelector('.products-menu');
  const event = new Event('loadClick');

  collapseTrigger.addEventListener('loadClick', () => {
    menuCollapse.classList.remove('hidden');
  }, false);
  collapseTrigger.dispatchEvent(event);

  /**
   * Меняем товары соответствующей категории при нажатии на соответствующий пункт меню
   */
  const vafliLink = document.getElementById('vafli');
  const tubesLink = document.getElementById('tubes');
  const tortsLink = document.getElementById('torts');
  const dietsLink = document.getElementById('diets');

  vafliLink.addEventListener('click', e => {
    changeProduction(e, 0, '#vafli');
  });
  tubesLink.addEventListener('click', e => {
    changeProduction(e, 1, '#tubes');
  });
  tortsLink.addEventListener('click', e => {
    changeProduction(e, 2, '#torts');
  });
  dietsLink.addEventListener('click', e => {
    changeProduction(e, 3, '#diets');
  });

  emitModal();

});

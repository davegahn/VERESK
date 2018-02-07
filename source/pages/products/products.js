import '../../sass/main.scss';
import './products.scss';
import 'normalize.css';

import createMenu from '../../components/aside/aside';
import {fillProducts} from './renderProducts.js';
import loadProduction from './load';

const ENTER_KEYCODE = 27;

// Correct height of goods, create big image popups

const correctHeights = () => {	
    const productBlocks = document.querySelectorAll('.product-item__image');	
    [].forEach.call(productBlocks, productBlock => {
        let productBlockHeight = productBlock.offsetHeight;
        let productImage = productBlock.children[0];
        let productHeight = productImage.offsetHeight;
        if(productHeight >= productBlockHeight) {
            productImage.style.height = '100%';
        }
    });
    const modalLinks = $('.big-image-link');
    modalLinks.on('click', function(e) {
        e.preventDefault();
        let item = this.closest('.product-item');
        let $modalW = $(item).find('.product-modal');
        $modalW.fadeIn(500);
    });
    const modalClose = $('.modal__close');
    modalClose.on('click', function() {
        let itemToClose = this.closest('.product-modal');    
        $(itemToClose).fadeOut(500);
    });

    $(document).keyup(function(e) {
        if (e.keyCode === ENTER_KEYCODE) {
            let itemToClose = $('.product-modal'); 
            $(itemToClose).fadeOut(500);
        }
    });
};

$(document).ready(function() {

    // Set backgroundImage

    const leftImage = document.querySelector('.aside');
    leftImage.style.backgroundImage = 'url(images/menu_bg_1.jpg)';	


    // Open production pages and make style of links

    let hash = window.location.hash;
    let categoryLinks = document.querySelectorAll('.products-menu__link');
    if(hash === '#vafli') {
        loadProduction(0, fillProducts, correctHeights);
        categoryLinks[0].parentElement.classList.add('products-menu__item--active');
    }else if (hash === '#tubes') {
        loadProduction(1, fillProducts, correctHeights);
        categoryLinks[1].parentElement.classList.add('products-menu__item--active');
    }else if (hash === '#torts') {
        loadProduction(2, fillProducts, correctHeights);
        categoryLinks[2].parentElement.classList.add('products-menu__item--active');
    }else if (hash === '#diets') {
        loadProduction(3, fillProducts, correctHeights);
        categoryLinks[3].parentElement.classList.add('products-menu__item--active');
    }

    // trigger menu to open when page is loaded

    const mainMenu = document.querySelector('.main-menu');
    const collapseTrigger = mainMenu.querySelector('.collapse-trigger');
    const menuCollapse = mainMenu.querySelector('.products-menu');
    const event = new Event('loadClick');

    collapseTrigger.addEventListener('loadClick', () => { 
        menuCollapse.classList.remove('hidden');        
    }, false);
    collapseTrigger.dispatchEvent(event);


    // change production   

    const vafliLink = document.getElementById('vafli');
    const tubesLink = document.getElementById('tubes');
    const tortsLink = document.getElementById('torts');
    const dietsLink = document.getElementById('diets');

    const changeProduction = (evt, idx, hash) => {
        evt.preventDefault();
        window.location.hash = hash;
        loadProduction(idx, fillProducts, correctHeights);
    };

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

});
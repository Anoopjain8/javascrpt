import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';
  products.forEach((product) => {
    productsHTML += `
    <div class="js-product-container product-container" data-product-id="e43638ce-6aa0-4b85-b27f-e1d07eb678c6" data-testid="product-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
          <div class="product-image-container">
            <img class="js-product-image product-image" src="${product.image}" data-testid="product-image">
          </div>

          <div class="product-name limit-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector" data-testid="quantity-selector">
              <option selected="" value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="js-added-to-cart-message added-to-cart-message" data-testid="added-to-cart-message">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="js-add-to-cart-button
            add-to-cart-button button-primary" data-testid="add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
  })

  document.querySelector('.js-cart-quantity').innerHTML = localStorage.getItem('quantity');

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
    localStorage.setItem('quantity', cartQuantity);
    document.querySelector('.js-cart-quantity').innerHTML = localStorage.getItem('quantity');
  }
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}
// function saveToStorage() {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }
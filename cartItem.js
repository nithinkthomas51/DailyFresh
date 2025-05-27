const cartItemTemplate = document.createElement('template');
cartItemTemplate.innerHTML = `<link rel="stylesheet" href="index.css" />
                              <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                              <div class="cartitem-container" id="cartitem-container">
                                <div class="cartname-cont">
                                    <p class="cartitem-name" id="cartitem-name"></p>
                                </div>
                                <div class="cartquantity-cont">
                                    <p class="quantity" id="quantity"></p>
                                </div>
                                <div class="cartbtn-cont">
                                    <button class="cart-btn" id="incrbtn">+</button>
                                    <button class="cart-btn" id="decrbtn">-</button>
                                </div>
                                <div class="cartprice-cont" id="price-cont">
                                    <p>€<span id="price-section"></span></p>
                                </div>
                              </div>`;

class CartItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(cartItemTemplate.content.cloneNode(true));
        this.shadowRoot.getElementById('cartitem-name').innerText = this.getAttribute('name').toUpperCase();
        this.shadowRoot.getElementById('quantity').innerText = this.getAttribute('itemQuantity');
        this.shadowRoot.getElementById('price-section').innerText = this.getAttribute('itemPrice');
    }

    incrementQuantity() {
        let itemQuantity = parseFloat(this.shadowRoot.getElementById('quantity').innerText);
        this.shadowRoot.getElementById('quantity').innerText = ++itemQuantity;
        this.updatePrice(itemQuantity);
    }

    updatePrice(itemQuantity) {
        let itemPrice = parseFloat(this.shadowRoot.getElementById('price-section').innerText);
        itemPrice = itemQuantity * itemPrice;
        this.shadowRoot.getElementById('price-section').innerText = itemPrice;
    }

    decrementQuantity() {
        let quantity = parseFloat(this.shadowRoot.getElementById('quantity').innerText);
        this.shadowRoot.getElementById('quantity').innerText = --quantity;
        this.updatePrice(quantity);
    }

    connectedCallback() {
        this.shadowRoot.getElementById('incrbtn').addEventListener('click', () => this.incrementQuantity());
        this.shadowRoot.getElementById('decrbtn').addEventListener('click', () => this.decrementQuantity());
    }

    disconnectedCallback() {
        this.shadowRoot.getElementById('incrbtn').removeEventListener('click', this.incrementQuantity);
        this.shadowRoot.getElementById('decrbtn').removeEventListener('click', this.decrementQuantity);
    }


}

window.customElements.define('cart-item', CartItem);
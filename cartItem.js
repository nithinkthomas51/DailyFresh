const cartItemTemplate = document.createElement('template');
cartItemTemplate.innerHTML = `<div class="cartitem-container" id="cartitem-container">
                                <h4 class="cartitem-name" id="cartitem-name"></h4>
                                <p class="quantity" id="quantity"></p>
                                <button class="cart-btn" id="addItem">+</button>
                                <button class="cart-btn" id="removeItem">-</button>
                              </div>`;

class CartItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(cartItemTemplate.content.cloneNode(true));
    }

    incrementQuantity() {
        
    }

    decrementQuantity() {

    }

    connectedCallback() {
        this.shadowRoot.getElementById('addItem').addEventListener('click', this.incrementQuantity());
        this.shadowRoot.getElementById('removeItem').addEventListener('click', this.decrementQuantity());
    }

    disconnectedCallback() {
        this.shadowRoot.getElementById('addItem').removeEventListener();
        this.shadowRoot.getElementById('removeItem').removeEventListener();
    }


}
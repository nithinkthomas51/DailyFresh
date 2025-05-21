const cartItemTemplate = document.createElement('template');
cartItemTemplate.innerHTML = `<link rel="stylesheet" href="index.css" />
                              <div class="cartitem-container" id="cartitem-container">
                                <p class="cartitem-name" id="cartitem-name"><b></b></p>
                                <p class="quantity" id="quantity"></p>
                                <button class="cart-btn" id="addItem">+</button>
                                <button class="cart-btn" id="removeItem">-</button>
                              </div>`;

class CartItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(cartItemTemplate.content.cloneNode(true));
        this.shadowRoot.getElementById('cartitem-name').innerText = this.getAttribute('name').toUpperCase();
        this.shadowRoot.getElementById('quantity').innerText = this.getAttribute('quantity');
    }

    incrementQuantity() {
        console.log('Inside incrementQuantity');
        let itemQuantity = parseInt(this.shadowRoot.getElementById('quantity').innerText);
        console.log('quantity: ' + itemQuantity);
        itemQuantity++;
        console.log('Incremented quantity: ' + itemQuantity);
        this.shadowRoot.getElementById('quantity').innerText = itemQuantity;
    }

    decrementQuantity() {
        let quantity = parseInt(this.shadowRoot.getElementById('quantity').innerText);
        quantity--;
        this.shadowRoot.getElementById('quantity').innerText = quantity;
    }

    connectedCallback() {
        console.log('Adding event listener for add and remove item')
        this.shadowRoot.getElementById('addItem').addEventListener('click', this.incrementQuantity());
        this.shadowRoot.getElementById('removeItem').addEventListener('click', this.decrementQuantity());
    }

    disconnectedCallback() {
        this.shadowRoot.getElementById('addItem').removeEventListener();
        this.shadowRoot.getElementById('removeItem').removeEventListener();
    }


}

window.customElements.define('cart-item', CartItem);
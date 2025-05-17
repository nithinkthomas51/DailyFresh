const template = document.createElement('template');
template.innerHTML = `<div class="card-container">
                        <div class="card" id="card">
                            <h2 class="card-title" id="card-title"></h2>
                            <p id="product-price"></p>
                            <button class="card=button" id="card-button">Add To Cart</button>
                        </div>
                      </div>`;

class ItemCard extends HTMLElement {
    constructor() {
        super();
        this.addedToCart = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById('product-name').innerText = this.getAttribute('name');
        this.shadowRoot.getElementById('product-price').innerText = `€{this.getAttribute('price')}`;
    }

    updateCart() {
        this.addedToCart = !this.addedToCart;
        let addToCartBtn = this.shadowRoot.getElementById('add-to-cart');
        if (this.addedToCart) {
            addToCartBtn.innerText = 'Remove From Cart';
        } else {
            addToCartBtn.innerText = 'Add To Cart';
        }

    }

    connectedCallback() {
        this.shadowRoot.getElementById('add-to-cart').addEventListener('click', () => this.updateCart());
    }

    disconnectedCallback() {
        this.shadowRoot.getElementById('add-to-cart').removeEventListener();
    }
}

window.customElements.define('item-card', ItemCard);
const cartTemplate = document.createElement("template");
cartTemplate.innerHTML = `<link rel="stylesheet" href="index.css" />
                          <h2 class="cart-title" id="cart-title">CART</h2>
                          <div class="cart" id="cart">
                          </div>
                          <h3 id="total-title"></h3>`;

class Cart extends HTMLElement {
  constructor() {
    super();
    this.basket = {};
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(cartTemplate.content.cloneNode(true));
  }

  renderCart() {
    let cartHtml = "";
    for (const [item, itemQuantity] of Object.entries(this.basket)) {
      cartHtml += `<cart-item name="${item}" quantity=${itemQuantity}></cart-item>`;
    }
    this.shadowRoot.getElementById('cart').innerHTML = cartHtml;
  }

  connectedCallback() {
    document.addEventListener('add-to-cart', (e) => {
      if (e.detail.addToCart)
        this.basket[e.detail.name] = e.detail.quantity;
      else
        delete this.basket[e.detail.name];
      this.renderCart();
    });
  }
}

window.customElements.define("cart-component", Cart);
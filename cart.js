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
    this.priceList = {};
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(cartTemplate.content.cloneNode(true));
  }

  renderCart() {
    let cartHtml = "";
    for (const [item, itemDetails] of Object.entries(this.basket)) {
      cartHtml += `<cart-item name="${item}" quantity=${itemDetails.quantity}> price=${itemDetails.price}</cart-item>`;
    }
    this.shadowRoot.getElementById('cart').innerHTML = cartHtml;
  }

  connectedCallback() {
    document.addEventListener('updateCart', (e) => {
      const { name, itemQuantity, itemPrice, addToCart } = e.detail;
      if (addToCart) {
        this.basket[name] = {quantity: 0, price: 0};
        this.basket[name].quantity += itemQuantity;
        this.basket[name].price += itemPrice;
      }
      else {
         delete this.basket[name];
      }
      this.renderCart();
    });
  }
}

window.customElements.define("cart-component", Cart);
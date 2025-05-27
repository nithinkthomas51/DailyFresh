const cartTemplate = document.createElement("template");
cartTemplate.innerHTML = `<link rel="stylesheet" href="index.css" />
                          <h2 class="cart-title" id="cart-title">CART</h2>
                          <div class="cart" id="cart">
                          </div>
                          <hr>
                          <div class="total-cont" id="total-cont">
                              <h3>TOTAL AMOUNT : €<span id="total-amount"></span></h3>
                          </div>`;

class Cart extends HTMLElement {
  constructor() {
    super();
    this.basket = {};
    this.totalPrice = 0;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(cartTemplate.content.cloneNode(true));
  }

  renderCart() {
    let cartHtml = "";
    for (const [item, itemDetails] of Object.entries(this.basket)) {
      console.log(`Item : ${item}, Quantity: ${itemDetails.itemQuantity}, Price: ${itemDetails.itemPrice}`);
      cartHtml += `<cart-item name="${item}" itemQuantity="${itemDetails.itemQuantity}" itemPrice="${itemDetails.itemPrice}"></cart-item>`;
    }
    this.shadowRoot.getElementById('cart').innerHTML = cartHtml;
    this.shadowRoot.getElementById('total-amount').innerText = this.totalPrice;
  }

  connectedCallback() {
    document.addEventListener('updateCart', (e) => {
      // const { name, quantity, price, addToCart } = e.detail;
      const name = e.detail.name;
      const quantity = e.detail.quantity;
      const price = e.detail.price;
      const addToCart = e.detail.addToCart;
      if (addToCart) {
        this.basket[name] = {itemQuantity: 0, itemPrice: 0};
        this.basket[name].itemQuantity += parseInt(quantity);
        this.basket[name].itemPrice += parseFloat(price);
        this.totalPrice += parseFloat(price);
      }
      else {
        this.totalPrice -= parseFloat(price);
        delete this.basket[name];
      }
      this.renderCart();
    });
  }
}

window.customElements.define("cart-component", Cart);
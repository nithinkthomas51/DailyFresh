const inventoryTemplate = document.createElement("template");
inventoryTemplate.innerHTML = `<link rel="stylesheet" href="index.css" />
                               <h2 class="inv-title" id="inv-title">INVENTORY</h2>
                               <div class="inventory" id="inventory">
                               </div>`;

class Inventory extends HTMLElement {
  constructor() {
    super();
    this.prices = {};
    this.basket = {};
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(inventoryTemplate.content.cloneNode(true));
    this.fetchProducts();
  }

  async fetchProducts() {
    const response = await fetch("./products.json");
    const products = await response.json();

    products.forEach( product => {
      this.prices[product.name] = product.price;
    });
    this.renderProducts();
  }

  renderProducts() {
    let productHTML = "";
    for (const [name, price] of Object.entries(this.prices)) {
      productHTML += `<item-card name="${name}" price="${price}"></item-card>`;
    }
    this.shadowRoot.getElementById('inventory').innerHTML = productHTML;
  }
}

window.customElements.define('inventory-component', Inventory);
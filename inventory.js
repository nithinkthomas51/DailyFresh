const inventoryTemplate = document.createElement('inventoryTemplate');
inventoryTemplate.innerHTML = `<div class="inventory" id="inventory">
                               </div>`;

class Inventory extends HTMLElement {
    constructor() {
        super();
        this.prices = {};
        this.basket = {};

    }

    connectedCallback() {
        const response = fetch("./products.json");
        const products = response.json();
        console.log(products);
    }
}

window.customElements.define('inventory-component', Inventory);
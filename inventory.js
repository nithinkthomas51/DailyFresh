const inventoryTemplate = document.createElement('inventoryTemplate');
inventoryTemplate.innerHTML = `<div class="inventory" id="inventory">
                               </div>`;

class Inventory extends HTMLElement {
    constructor() {
        this.prices = {};

    }

    connectedCallback() {
        const response = fetch("./products.json");
        const products = response.json();
        console.log(products);
    }
}

window.customElements.define('inventory-component', Inventory);
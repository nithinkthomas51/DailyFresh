const inventoryTemplate = document.createElement('inventoryTemplate');
inventoryTemplate.innerHTML = `<div class="inventory" id="inventory">
                               </div>`;

class Inventory extends HTMLElement {
    constructor() {
        super();
        this.prices = {};
        this.basket = {};

    }

    async fetchProducts() {
        const response = await fetch("./products.json");
        const products = await response.json();

        products.forEach( product => {
            console.log(`Product: ${product.name}, Price: ${product.price}`);
            prices[product.name] = product.price;
        });
        return products;
    }

    connectedCallback() {
        const products = this.fetchProducts();
        console.log(products);
    }
}

window.customElements.define('inventory-component', Inventory);
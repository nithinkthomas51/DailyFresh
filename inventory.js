const inventoryTemplate = document.createElement('inventoryTemplate');
inventoryTemplate.innerHTML = `<div class="inventory" id="inventory">
                               </div>`;

class Inventory extends HTMLElement {
    constructor() {
        super();
        this.prices = {};
        this.basket = {};
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(inventoryTemplate.content.cloneNode(true));
        this.fetchProducts();
        this.renderProducts();
    }

    async fetchProducts() {
        const response = await fetch("./products.json");
        const products = await response.json();

        products.forEach( product => {
            console.log(`Product: ${product.name}, Price: ${product.price}`);
            this.prices[product.name] = product.price;
        });
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
let product = {
        apple: 1.69,
        orange: 0.99,
        milk: 1.14,
        egg: 0.99
      }
      
      let basket = {};

      let createProducts = (productList) => {
        let cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = "";
        for (const [name, price] of Object.entries(productList)) {
          const cardHtml = `<div class="card">
                              <div class="card-content">
                                <h2 class="card-title" id=${name}>${name.toUpperCase()}</h2>
                                <p id="apple-price">€${price}</p>
                                <button class="card-button" onclick="addItemToCart(${name}, 1)">Add To Cart</button>
                              </div>
                             </div>`;
          cardContainer.innerHTML += cardHtml;
        }
      }

      document.addEventListener("DOMContentLoaded", createProducts(product));

      let addItem = (itemName, price) => {
        product[itemName] = price;
        createProducts(product);
      }

      let buttonClick = () => {
        addItem(document.getElementById("product").value, document.getElementById("price").value);
        closePopup();
      }
      
      let openPopup = () => {
        document.getElementById("popup-container").style.display = "flex";
      }
      
      let closePopup = () => {
        document.getElementById("popup-container").style.display = "none";
      }
      
      let addItemToCart = (productName) => {
        if (basket[productName] !== undefined)
          basket[productName] = 1;
        else
          basket[productName] = parseInt(basket[productName])+1;
      }
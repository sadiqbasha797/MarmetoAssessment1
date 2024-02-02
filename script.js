console.log('====================================');
console.log("Connected");
console.log('====================================');

function showCategory(categoryName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.getElementById(`${categoryName.toLowerCase()}Tab`);
    activeTab.classList.add('active');

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'none';
    });

    const categoryCards = document.querySelectorAll(`.${categoryName.toLowerCase()}`);
    categoryCards.forEach(card => {
        card.style.display = 'block';
    });
}

fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        const categories = data.categories;

        categories.forEach(category => {
            const categoryProducts = category.category_products;

            categoryProducts.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.classList.add(category.category_name.toLowerCase());

                const price = parseFloat(product.price);
                const comparePrice = parseFloat(product.compare_at_price);
                const discount = ((comparePrice - price) / comparePrice) * 100;

                if (product.badge_text) {
                    card.innerHTML = `
                        <div class="badge-text">${product.badge_text}</div>
                        <img src="${product.image}" alt="${product.title}">
                        <div class="card-content">
                            <div class="card-title">${product.title} . <span class="card-vendor">${product.vendor}</span></div>
                            <div class="card-price">Rs.${price} <span class="card-compare-price">Rs.${comparePrice}</span> <span class="card-discount">${discount.toFixed(2)}%</span></div>
                            
                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>
                    `;
                } else {
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <div class="card-content">
                          <div class="card-title">${product.title} . <span class="card-vendor">${product.vendor}</span></div>
                          <div class="card-price">Rs.${price} &nbsp <span class="card-compare-price">Rs.${comparePrice}</span> &nbsp <span class="card-discount">${discount.toFixed(2)}%</span></div>

                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>
                    `;
                }

                document.getElementById('cardContainer').appendChild(card);
            });
        });

        showCategory('Men');
    })
    .catch(error => console.error('Error fetching data:', error));
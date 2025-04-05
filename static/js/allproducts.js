// Toggle dark/light theme
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark');
    const theme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

// Initialize theme based on local storage
window.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
});

// Cart functionality
let cart = [];

// Update the cart display
function updateCart() {
    const cartButton = document.getElementById('viewCartButton');
    cartButton.innerText = `View Cart (${cart.length})`;

    // Update the cart count in the button
    const cartCount = document.getElementById('cartCount');
    cartCount.innerText = `Items in Cart: ${cart.length}`;
}

// Display cart contents in a modal
function displayCart() {
    const cartModal = document.getElementById('cartModal');
    const cartList = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');

    cartList.innerHTML = ''; // Clear the existing cart list
    let totalPrice = 0;

    // Display each item in the cart
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.product} - $${item.price}`;
        cartList.appendChild(listItem);
        totalPrice += item.price;
    });

    // Display the total price
    totalPriceElement.innerText = `Total: $${totalPrice}`;

    // Show the cart modal
    cartModal.style.display = 'block';
}

// Close the cart modal
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
}

// Add item to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        const price = parseInt(this.getAttribute('data-price'));

        // Add the product to the cart array
        cart.push({ product, price });

        // Update the cart display
        updateCart();

        // Optionally, you can alert the user that the product has been added
        alert(`${product} has been added to your cart.`);
    });
});

// Event listener for "View Cart" button
const viewCartButton = document.getElementById('viewCartButton');
viewCartButton.addEventListener('click', displayCart);

// Event listener for closing the cart modal
const closeCartButton = document.getElementById('closeCartButton');
closeCartButton.addEventListener('click', closeCart);

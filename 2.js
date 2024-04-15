const bookList = document.getElementById('book-list');
const searchBox = document.getElementById('search-box');
const cart = document.getElementById('cart');
const buyButton = document.getElementById('buy-button');
const reviewButton = document.getElementById('review-button');

let books = [];

// Load books from Open Library API
async function loadBooks() {
    const response = await fetch('https://openlibrary.org/search.json?q=book&limit=10');
    const data = await response.json();
    books = data.docs;
    renderBooks();
}

// Render books on the page
function renderBooks() {
    bookList.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.author_name.join(', ')}</p>
            <button class="add-to-cart-button" data-id="${book.key}">Add to cart</button>
        `;
        bookList.appendChild(bookElement);
    });
}

// Add book to the cart
function addToCart(id) {
    const book = books.find(book => book.key === id);
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <h3>${book.title}</h3>
        <button class="remove-from-cart-button" data-id="${id}">Remove</button>
    `;
    cart.appendChild(cartItem);
}

// Remove book from the cart
function removeFromCart(id) {
    const cartItem = document.querySelector("[cart-itemdata-id='"+id +"']");
    cartItem.remove();
}

// Handle search
searchBox.addEventListener('input', () => {
    const searchTerm = searchBox.value.toLowerCase();
    books = books.filter(book => book.title.toLowerCase().includes(searchTerm));
    renderBooks();
});

// Handle add to cart
bookList.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart-button')) {
        addToCart(e.target.dataset.id);
    }
});

// Handle remove from cart
cart.addEventListener('click', (e) => {
    if (e.target.matches('.remove-from-cart-button')) {
        removeFromCart(e.target.dataset.id);
    }
});

// Handle buy
buyButton.addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart.innerHTML = '';
});

// Handle review
reviewButton.addEventListener('click', () => {
    alert('Review feature is not implemented yet.');
});

// Load books when the page is loaded
loadBooks();
//MENU
function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    const menuButton = document.querySelector(".menu-icon");

    if (sideMenu) {
        sideMenu.classList.toggle("open");

        if (menuButton) {
            const expanded = sideMenu.classList.contains("open");
            menuButton.setAttribute("aria-expanded", expanded ? "true" : "false");
        }
    }
}

//STORAGE
function getFavourites() {
    return JSON.parse(localStorage.getItem("favourites")) || [];
}

function saveFavourites(favourites) {
    localStorage.setItem("favourites", JSON.stringify(favourites));
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getSelectedProduct() {
    return JSON.parse(localStorage.getItem("selectedProduct"));
}

function saveSelectedProduct(product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
}

//PRODUCT DETAILS
function getProductDetails(productId) {
    const productInfo = {
        1: {
            desc: "Heavy-duty 15kg dumbbells for strength training, home workouts, and steady progress. Strong grip, simple design, and made for serious sessions.",
            type: "equipment",
            alt: "15 kilogram dumbbells for strength training"
        },
        2: {
            desc: "Resistance bands for stretching, strength work, and mobility exercises. Easy to carry and useful for warmups or full workouts.",
            type: "equipment",
            alt: "Resistance bands for stretching and strength training"
        },
        3: {
            desc: "Workout gloves for better grip and hand protection during lifting. Comfortable to wear and useful for longer training sessions.",
            type: "equipment",
            alt: "Workout gloves for grip and hand protection"
        },
        4: {
            desc: "Protein shaker bottle for smooth mixing before or after workouts. Simple, practical, and easy to use every day.",
            type: "equipment",
            alt: "Protein shaker bottle"
        },
        5: {
            desc: "Comfortable yoga mat for stretching, yoga, and floor exercises. A reliable option for home training and recovery work.",
            type: "equipment",
            alt: "Yoga mat for stretching and floor exercises"
        },
        6: {
            desc: "Jump rope for cardio, warmups, and endurance training. A classic tool for quick, effective conditioning.",
            type: "equipment",
            alt: "Jump rope for cardio workouts"
        },
        7: {
            desc: "Lightweight windbreaker for training outdoors in cooler weather. Comfortable, practical, and easy to layer.",
            type: "clothing",
            alt: "Windbreaker jacket for outdoor workouts"
        },
        8: {
            desc: "Flexible women's leggings designed for comfort and movement. Good for training, stretching, and everyday active wear.",
            type: "clothing",
            alt: "Women's leggings for training and exercise"
        },
        9: {
            desc: "Breathable t-shirt for training or everyday casual wear. Simple athletic fit and comfortable material.",
            type: "clothing",
            alt: "Athletic t-shirt for workouts"
        },
        10: {
            desc: "Running shoes built for comfort, grip, and daily training support. Great for active days and regular workouts.",
            type: "shoes",
            alt: "Running shoes for training and everyday workouts"
        },
        11: {
            desc: "Premium running shoes with extra support and cushioning. Designed to feel light while still giving good support.",
            type: "shoes",
            alt: "Premium running shoes"
        },
        12: {
            desc: "Women's tank top made for workouts, layering, and comfort. A simple and breathable option for training.",
            type: "clothing",
            alt: "Women's tank top for workouts"
        },
        13: {
            desc: "5kg dumbbells for beginner strength training and toning sessions. Easy to use and great for lighter workouts.",
            type: "equipment",
            alt: "5 kilogram dumbbells"
        },
        14: {
            desc: "10kg dumbbells for intermediate training and home gym workouts. A strong choice for regular strength work.",
            type: "equipment",
            alt: "10 kilogram dumbbells"
        },
        15: {
            desc: "20kg dumbbells for heavier strength and resistance training. Best for more challenging lifts and stronger sessions.",
            type: "equipment",
            alt: "20 kilogram dumbbells"
        },
        16: {
            desc: "Strong barbell bar for compound lifts and serious training sessions. A good core piece for a home gym setup.",
            type: "equipment",
            alt: "Barbell bar for strength training"
        },
        17: {
            desc: "12kg kettlebell for swings, squats, presses, and full-body training. A versatile choice for many exercises.",
            type: "equipment",
            alt: "12 kilogram kettlebell"
        },
        18: {
            desc: "Multi-functional bench for presses, seated work, and home gym setups. Useful for adding more exercise options.",
            type: "equipment",
            alt: "Multi-functional workout bench"
        }
    };

    return productInfo[productId] || {
        desc: "No description available.",
        type: "equipment",
        alt: "Product image"
    };
}

//POPUP
function showModal(message) {
    const modal = document.getElementById("customModal");
    const modalMessage = document.getElementById("modalMessage");

    if (!modal || !modalMessage) return;

    modalMessage.textContent = message;
    modal.classList.add("show");
}

function closeModal() {
    const modal = document.getElementById("customModal");
    if (modal) {
        modal.classList.remove("show");
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2000);
}

//CHECKS
function isFavourite(productId) {
    const favourites = getFavourites();
    return favourites.some(function (item) {
        return item.id === String(productId);
    });
}

function isInCart(productId) {
    const cart = getCart();
    return cart.some(function (item) {
        return item.id === String(productId);
    });
}

//OPEN PRODUCT
function openProduct(productId, showSizeMessage) {
    const product = document.querySelector('.product[data-id="' + productId + '"]');
    if (!product) return;

    const productData = {
        id: product.dataset.id,
        name: product.dataset.name,
        price: product.dataset.price,
        oldPrice: product.dataset.oldprice || "",
        img: product.dataset.img,
        alt: product.dataset.alt || product.dataset.name
    };

    saveSelectedProduct(productData);

    if (showSizeMessage) {
        localStorage.setItem("sizeNotice", "true");
    }

    window.location.href = "product.html";
}

//CAROUSEL
function scrollProducts(direction) {
    const slider = document.getElementById("productSlider");
    if (!slider) return;

    const firstCard = slider.querySelector(".product");
    if (!firstCard) return;

    const gap = parseInt(window.getComputedStyle(slider).gap) || 20;
    const scrollAmount = firstCard.offsetWidth + gap;

    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}

//ADD TO CART
function addToCart(productData) {
    let cart = getCart();

    const existing = cart.find(function (item) {
        return item.id === productData.id && item.size === productData.size;
    });

    if (existing) {
        existing.quantity = (existing.quantity || 1) + (productData.quantity || 1);
    } else {
        productData.quantity = productData.quantity || 1;
        cart.push(productData);
    }

    saveCart(cart);
}

//UPDATE ICONS
function updateIcons() {
    const products = document.querySelectorAll(".product");

    products.forEach(function (product) {
        const productId = product.dataset.id;
        const heartBtn = product.querySelector(".fav-icon");
        const cartBtn = product.querySelector(".cart-icon");
        const heartIcon = heartBtn ? heartBtn.querySelector("i") : null;

        if (heartBtn && heartIcon) {
            if (isFavourite(productId)) {
                heartBtn.classList.add("active-fav");
                heartIcon.classList.remove("fa-regular");
                heartIcon.classList.add("fa-solid");
            } else {
                heartBtn.classList.remove("active-fav");
                heartIcon.classList.remove("fa-solid");
                heartIcon.classList.add("fa-regular");
            }
        }

        if (cartBtn) {
            if (isInCart(productId)) {
                cartBtn.classList.add("active-cart");
            } else {
                cartBtn.classList.remove("active-cart");
            }
        }
    });
}

//BUTTONS
function setupProductButtons() {
    const products = document.querySelectorAll(".product");

    products.forEach(function (product) {
        const heartBtn = product.querySelector(".fav-icon");
        const cartBtn = product.querySelector(".cart-icon");

        const productData = {
            id: product.dataset.id,
            name: product.dataset.name,
            price: product.dataset.price,
            oldPrice: product.dataset.oldprice || "",
            img: product.dataset.img,
            alt: product.dataset.alt || product.dataset.name
        };

        if (heartBtn) {
            heartBtn.addEventListener("click", function (event) {
                event.stopPropagation();

                let favourites = getFavourites();
                const exists = favourites.some(function (item) {
                    return item.id === productData.id;
                });

                if (exists) {
                    favourites = favourites.filter(function (item) {
                        return item.id !== productData.id;
                    });
                    saveFavourites(favourites);
                    showToast("Removed from favourites");
                } else {
                    favourites.push(productData);
                    saveFavourites(favourites);
                    showToast("Added to favourites");
                }

                updateIcons();
            });
        }

        if (cartBtn) {
            cartBtn.addEventListener("click", function (event) {
                event.stopPropagation();

                const details = getProductDetails(Number(productData.id));

                if (details.type === "clothing" || details.type === "shoes") {
                    openProduct(productData.id, true);
                    return;
                }

                addToCart({
                    id: productData.id,
                    name: productData.name,
                    price: productData.price,
                    oldPrice: productData.oldPrice,
                    img: productData.img,
                    alt: productData.alt,
                    size: "",
                    quantity: 1
                });

                localStorage.setItem("cartToast", "Added to cart!");
                window.location.href = "cart.html";
            });
        }
    });
}

//PRODUCT PAGE
function loadProductPage() {
    const productName = document.getElementById("productName");
    const productImg = document.getElementById("productImg");
    const productPrice = document.getElementById("productPrice");
    const productDesc = document.getElementById("productDesc");
    const sizeContainer = document.getElementById("sizeContainer");
    const sizeSelect = document.getElementById("sizeSelect");
    const addToCartBtn = document.getElementById("addToCartBtn");

    if (!productName || !productImg || !productPrice || !productDesc || !addToCartBtn) {
        return;
    }

    const selectedProduct = getSelectedProduct();

    if (!selectedProduct) {
        productName.textContent = "Product not found";
        productDesc.textContent = "No product was selected.";
        return;
    }

    const details = getProductDetails(Number(selectedProduct.id));

    productName.textContent = selectedProduct.name;
    productImg.src = selectedProduct.img;
    productImg.alt = details.alt;
    productDesc.textContent = details.desc;

    if (selectedProduct.oldPrice) {
        productPrice.innerHTML = '<span class="old-price">$' + selectedProduct.oldPrice + '</span> $' + selectedProduct.price;
    } else {
        productPrice.textContent = '$' + selectedProduct.price;
    }

    if (details.type === "clothing") {
        sizeContainer.style.display = "block";
        sizeSelect.innerHTML = `
            <option value="">Choose size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
        `;
    } else if (details.type === "shoes") {
        sizeContainer.style.display = "block";
        sizeSelect.innerHTML = `
            <option value="">Choose size</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
        `;
    } else {
        sizeContainer.style.display = "none";
    }

    if (localStorage.getItem("sizeNotice") === "true") {
        const redirectMessage = localStorage.getItem("sizeRedirectMessage") || "Please choose a size before adding this item to the cart.";
        showModal(redirectMessage);
        localStorage.removeItem("sizeNotice");
        localStorage.removeItem("sizeRedirectMessage");
    }

    addToCartBtn.addEventListener("click", function () {
        let chosenSize = "";

        if (details.type === "clothing" || details.type === "shoes") {
            chosenSize = sizeSelect.value;

            if (chosenSize === "") {
                showModal("Please choose a size first.");
                return;
            }
        }

        addToCart({
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            oldPrice: selectedProduct.oldPrice || "",
            img: selectedProduct.img,
            alt: selectedProduct.alt || details.alt,
            size: chosenSize,
            quantity: 1
        });

        showToast("Added to cart!");
    });
}

//FAVOURITES PAGE
function renderFavouritesPage() {
    const favoritesList = document.getElementById("favoritesList");
    const addSelectedBtn = document.getElementById("addSelectedToCart");

    if (!favoritesList || !addSelectedBtn) return;

    const favourites = getFavourites();

    if (favourites.length === 0) {
        favoritesList.innerHTML = "<p>No favourites yet.</p>";
        addSelectedBtn.disabled = true;
        return;
    }

    addSelectedBtn.disabled = false;
    favoritesList.innerHTML = "";

    favourites.forEach(function (item, index) {
        const favItem = document.createElement("div");
        favItem.className = "fav-item";

        favItem.innerHTML = `
            <label class="fav-row">
                <input type="checkbox" class="fav-check" data-index="${index}">
                <img src="${item.img}" alt="${item.alt || item.name}">
                <div class="fav-info">
                    <h3>${item.name}</h3>
                    <p>$${Number(item.price).toFixed(2)}</p>
                </div>
                <div class="fav-price">$${Number(item.price).toFixed(2)}</div>
            </label>
        `;

        favoritesList.appendChild(favItem);
    });

    addSelectedBtn.onclick = function () {
        const checkedBoxes = document.querySelectorAll(".fav-check:checked");

        if (checkedBoxes.length === 0) {
            showModal("Please select at least one favourite item.");
            return;
        }

        for (let checkbox of checkedBoxes) {
            const index = checkbox.dataset.index;
            const item = favourites[index];
            const details = getProductDetails(Number(item.id));

            if (details.type === "clothing" || details.type === "shoes") {
                saveSelectedProduct(item);
                localStorage.setItem("sizeNotice", "true");
                localStorage.setItem("sizeRedirectMessage", "A size is missing for this item. Please choose a size before adding it to the cart.");
                window.location.href = "product.html";
                return;
            }

            addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                oldPrice: item.oldPrice || "",
                img: item.img,
                alt: item.alt || item.name,
                size: "",
                quantity: 1
            });
        }

        localStorage.setItem("cartToast", "Selected items added to cart!");
        window.location.href = "cart.html";
    };
}

//CART PAGE
function renderCartPage() {
    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");
    const buyNowBtn = document.getElementById("buyNowBtn");

    if (!cartList || !cartTotal) return;

    function updateCartDisplay() {
        let cart = getCart();

        if (cart.length === 0) {
            cartList.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
            cartTotal.textContent = "$0.00";
            return;
        }

        cartList.innerHTML = "";
        let total = 0;

        cart.forEach(function (item, index) {
            const quantity = item.quantity || 1;
            total += Number(item.price) * quantity;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="cart-left">
                    <img src="${item.img}" alt="${item.alt || item.name}">
                    <div class="cart-info">
                        <h3>${item.name}</h3>
                        <p>${item.size ? "Size: " + item.size : "No size needed"}</p>
                    </div>
                </div>

                <div class="cart-right">
                    <div class="cart-price">$${(Number(item.price) * quantity).toFixed(2)}</div>

                    <div class="qty-controls">
                        <button class="qty-btn decrease-btn" type="button" data-index="${index}" aria-label="Decrease quantity">-</button>
                        <span class="qty-value">${quantity}</span>
                        <button class="qty-btn increase-btn" type="button" data-index="${index}" aria-label="Increase quantity">+</button>
                    </div>

                    <button class="remove-btn" data-index="${index}" type="button">Remove</button>
                </div>
            `;

            cartList.appendChild(cartItem);
        });

        cartTotal.textContent = "$" + total.toFixed(2);

        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const index = Number(button.dataset.index);
                let updatedCart = getCart();
                updatedCart.splice(index, 1);
                saveCart(updatedCart);
                updateCartDisplay();
                showToast("Item removed from cart");
            });
        });

        const increaseButtons = document.querySelectorAll(".increase-btn");
        increaseButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const index = Number(button.dataset.index);
                let updatedCart = getCart();
                updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
                saveCart(updatedCart);
                updateCartDisplay();
            });
        });

        const decreaseButtons = document.querySelectorAll(".decrease-btn");
        decreaseButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const index = Number(button.dataset.index);
                let updatedCart = getCart();
                const currentQty = updatedCart[index].quantity || 1;

                if (currentQty > 1) {
                    updatedCart[index].quantity = currentQty - 1;
                } else {
                    updatedCart.splice(index, 1);
                }

                saveCart(updatedCart);
                updateCartDisplay();
            });
        });
    }

    updateCartDisplay();

    if (buyNowBtn) {
        buyNowBtn.addEventListener("click", function () {
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const address = document.getElementById("address").value.trim();
            const cardNumber = document.getElementById("cardNumber").value.trim();
            const cardMonth = document.getElementById("cardMonth").value.trim();
            const cardCvc = document.getElementById("cardCvc").value.trim();

            if (!firstName || !lastName || !address || !cardNumber || !cardMonth || !cardCvc) {
                showModal("Please fill in all checkout fields before buying.");
                return;
            }

            if (getCart().length === 0) {
                showModal("Your cart is empty.");
                return;
            }

            localStorage.removeItem("cart");
            updateCartDisplay();
            showModal("Purchase complete! Thank you for shopping with Pump Nation.");
        });
    }
}

//SEARCH BAR
function searchCurrentPage(query) {
    const products = document.querySelectorAll(".product");
    const message = document.getElementById("searchResultsMessage");
    const searchText = query.trim().toLowerCase();
    let found = 0;

    if (!products.length) return false;

    products.forEach(function (product) {
        const name = product.dataset.name.toLowerCase();

        if (name.includes(searchText) || searchText === "") {
            product.classList.remove("hidden-product");
            found++;
        } else {
            product.classList.add("hidden-product");
        }
    });

    if (message) {
        if (searchText === "") {
            message.textContent = "";
        } else if (found === 0) {
            message.textContent = "No results";
        } else {
            message.textContent = "";
        }
    }

    return true;
}

function handleLiveSearch(event) {
    const query = event.target.value;
    searchCurrentPage(query);
}

function handleSearchKey(event) {
    if (event.key !== "Enter") return;

    const query = event.target.value.trim();
    const workedOnCurrentPage = searchCurrentPage(query);

    if (!workedOnCurrentPage && query !== "") {
        localStorage.setItem("searchQuery", query);
        window.location.href = "index.html";
    }
}

function applySavedSearch() {
    const savedQuery = localStorage.getItem("searchQuery");
    const input = document.getElementById("globalSearch");

    if (savedQuery && input) {
        input.value = savedQuery;
        searchCurrentPage(savedQuery);
        localStorage.removeItem("searchQuery");
    }
}

//MODAL THINGS
function setupModalEvents() {
    const closeModalBtn = document.getElementById("closeModal");
    const modalOkBtn = document.getElementById("modalOkBtn");
    const modal = document.getElementById("customModal");

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    if (modalOkBtn) {
        modalOkBtn.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

//CLOSE MENU
document.addEventListener("click", function (event) {
    const sideMenu = document.getElementById("sideMenu");
    const menuIcon = document.querySelector(".menu-icon");

    if (!sideMenu || !menuIcon) {
        return;
    }

    const clickedInsideMenu = sideMenu.contains(event.target);
    const clickedMenuIcon = menuIcon.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuIcon) {
        sideMenu.classList.remove("open");
        menuIcon.setAttribute("aria-expanded", "false");
    }
});

//STARTUP
document.addEventListener("DOMContentLoaded", function () {
    setupProductButtons();
    updateIcons();
    loadProductPage();
    renderFavouritesPage();
    renderCartPage();
    setupModalEvents();
    applySavedSearch();

    const pendingToast = localStorage.getItem("cartToast");
    if (pendingToast) {
        showToast(pendingToast);
        localStorage.removeItem("cartToast");
    }
});

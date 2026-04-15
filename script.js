//MENU
function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    if (sideMenu) {
        sideMenu.classList.toggle("open");
    }
}

//READ PRODCUTS&SAVE TO FAVOURITES&CART
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


//PRODUCT CHECKS FAV&CART
function isFavourite(productId) {
    const favourites = getFavourites();
    return favourites.some(function (item) {
        return item.id === productId;
    });
}

function isInCart(productId) {
    const cart = getCart();
    return cart.some(function (item) {
        return item.id === productId;
    });
}

//ALL PRODUCTS
function getProductDetails(productId) {
    const productInfo = {
        1: { desc: "Heavy-duty 15kg dumbbells for strength training and home workouts.", type: "equipment" },
        2: { desc: "Resistance bands for stretching, strength work, and mobility exercises.", type: "equipment" },
        3: { desc: "Workout gloves for better grip and hand protection during lifting.", type: "equipment" },
        4: { desc: "Protein shaker bottle for smooth mixing before or after workouts.", type: "equipment" },
        5: { desc: "Comfortable yoga mat for stretching, yoga, and floor exercises.", type: "equipment" },
        6: { desc: "Jump rope for cardio, warmups, and endurance training.", type: "equipment" },
        7: { desc: "Lightweight windbreaker for training outdoors in cooler weather.", type: "clothing" },
        8: { desc: "Flexible women's leggings designed for comfort and movement.", type: "clothing" },
        9: { desc: "Breathable t-shirt for training or everyday casual wear.", type: "clothing" },
        10: { desc: "Running shoes built for comfort, grip, and daily training support.", type: "shoes" },
        11: { desc: "Premium running shoes with extra support and cushioning.", type: "shoes" },
        12: { desc: "Women's tank top made for workouts, layering, and comfort.", type: "clothing" },
        13: { desc: "5kg dumbbells for beginner strength training and toning sessions.", type: "equipment" },
        14: { desc: "10kg dumbbells for intermediate training and home gym workouts.", type: "equipment" },
        15: { desc: "20kg dumbbells for heavier strength and resistance training.", type: "equipment" },
        16: { desc: "Strong barbell bar for compound lifts and serious training sessions.", type: "equipment" },
        17: { desc: "12kg kettlebell for swings, squats, presses, and full-body training.", type: "equipment" },
        18: { desc: "Multi-functional bench for presses, seated work, and home gym setups.", type: "equipment" }
    };

    return productInfo[productId] || {
        desc: "No description available.",
        type: "equipment"
    };
}

//SIZE POPUP
function openProduct(productId, showSizeMessage) {
    const product = document.querySelector('.product[data-id="' + productId + '"]');

    if (!product) return;

    const productData = {
        id: product.dataset.id,
        name: product.dataset.name,
        price: product.dataset.price,
        oldPrice: product.dataset.oldprice || "",
        img: product.dataset.img
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
    cart.push(productData);
    saveCart(cart);
}

//UPDATE FAV&CART
function updateIcons() {
    const products = document.querySelectorAll(".product");

    products.forEach(function (product) {
        const productId = product.dataset.id;
        const heartIcon = product.querySelector(".fav-icon");
        const cartIcon = product.querySelector(".cart-icon");

        if (heartIcon) {
            if (isFavourite(productId)) {
                heartIcon.classList.remove("fa-regular");
                heartIcon.classList.add("fa-solid");
                heartIcon.style.color = "red";
            } else {
                heartIcon.classList.remove("fa-solid");
                heartIcon.classList.add("fa-regular");
                heartIcon.style.color = "";
            }
        }

        if (cartIcon) {
            if (isInCart(productId)) {
                cartIcon.classList.add("active-cart");
            } else {
                cartIcon.classList.remove("active-cart");
            }
        }
    });
}

//FAV&CART CLICKABLES
function setupProductButtons() {
    const products = document.querySelectorAll(".product");

    products.forEach(function (product) {
        const heartIcon = product.querySelector(".fav-icon");
        const cartIcon = product.querySelector(".cart-icon");

        const productData = {
            id: product.dataset.id,
            name: product.dataset.name,
            price: product.dataset.price,
            oldPrice: product.dataset.oldprice || "",
            img: product.dataset.img
        };

        if (heartIcon) {
            heartIcon.addEventListener("click", function (event) {
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
                    updateIcons();
                    showToast("Removed from favourites");
                } else {
                    favourites.push(productData);
                    saveFavourites(favourites);
                    updateIcons();
                    showToast("Added to favourites");
                }
            });
        }

        if (cartIcon) {
            cartIcon.addEventListener("click", function (event) {
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
                    size: ""
                });

                localStorage.setItem("cartToast", "Added to cart!");
                window.location.href = "cart.html";
            });
        }
    });
}

//PRODUCT PG
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
    productImg.alt = selectedProduct.name;
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

        const cartItem = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            oldPrice: selectedProduct.oldPrice || "",
            img: selectedProduct.img,
            size: chosenSize
        };

        addToCart(cartItem);
        showToast("Added to cart!");
    });
}

//FAVOURITES PG
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
            <div class="fav-left">
                <input type="checkbox" class="fav-check" data-index="${index}">
                <img src="${item.img}" alt="${item.name}">
                <div class="fav-info">
                    <h3>${item.name}</h3>
                    <p class="price">$${Number(item.price).toFixed(2)}</p>
                </div>
            </div>
        `;

        favoritesList.appendChild(favItem);
    });

    addSelectedBtn.onclick = function () {
        const checkedBoxes = document.querySelectorAll(".fav-check:checked");

        if (checkedBoxes.length === 0) {
            showModal("Please select at least one favourite item.");
            return;
        }

        let cart = getCart();

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

            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                oldPrice: item.oldPrice || "",
                img: item.img,
                size: ""
            });
        }

        saveCart(cart);
        localStorage.setItem("cartToast", "Selected items added to cart!");
        window.location.href = "cart.html";
    };
}

//CART PG
function renderCartPage() {
    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");
    const buyNowBtn = document.getElementById("buyNowBtn");

    if (!cartList || !cartTotal) return;

    let cart = getCart();

    function updateCartDisplay() {
        cart = getCart();

        if (cart.length === 0) {
            cartList.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
            cartTotal.textContent = "$0.00";
            return;
        }

        cartList.innerHTML = "";
        let total = 0;

        cart.forEach(function (item, index) {
            total += Number(item.price);

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="cart-left">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-info">
                        <h3>${item.name}</h3>
                        <p>${item.size ? "Size: " + item.size : "No size needed"}</p>
                    </div>
                </div>

                <div class="fav-right">
                    <div class="cart-price">$${Number(item.price).toFixed(2)}</div>
                    <button class="remove-btn" data-index="${index}">&times;</button>
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

//MODAL INTERACTION
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
}

//CLOSE MENU IF CLICK OUTSIDE
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
    }
});


//SETUP
document.addEventListener("DOMContentLoaded", function () {
    setupProductButtons();
    updateIcons();
    loadProductPage();
    renderFavouritesPage();
    renderCartPage();
    setupModalEvents();

    const pendingToast = localStorage.getItem("cartToast");
    if (pendingToast) {
        showToast(pendingToast);
        localStorage.removeItem("cartToast");
    }
});

// TOGGLE SIDE MENU
function toggleMenu() {
    let menu = document.getElementById("sideMenu");
    menu.classList.toggle("open");
}

function openProduct(id) {
    window.location.href = "product.html?id=" + id;
}


// PRODUCT CAROUSEL SCROLL
function scrollProducts(direction) {
    const slider = document.getElementById("productSlider");

    if (!slider) return;

    const card = slider.children[0];
    if (!card) return;

    const style = window.getComputedStyle(slider);
    const gap = parseInt(style.gap) || 20;

    const cardWidth = card.offsetWidth + gap;

    // 👉 If going LEFT at the start → jump to end
    if (direction === -1 && slider.scrollLeft <= 0) {
        slider.scrollLeft = slider.scrollWidth;
        return;
    }

    // 👉 If going RIGHT at the end → jump to start
    if (
        direction === 1 &&
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5
    ) {
        slider.scrollLeft = 0;
        return;
    }

    // 👉 Normal scroll
    slider.scrollBy({
        left: direction * cardWidth,
        behavior: "smooth"
    });
}

document.addEventListener("DOMContentLoaded", () => {

    // ❤️ FAVORITES
    document.querySelectorAll(".fav-icon").forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();

            icon.classList.toggle("active");

            if (icon.classList.contains("active")) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
            } else {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
            }
        });
    });

    // 🛒 CART
    document.querySelectorAll(".cart-icon").forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();

            icon.classList.toggle("active");
        });
    });

});

const products = {

    // 🟢 HOMEPAGE (1–6)
    1: {
        name: "15kg Dumbbells (2pcs)",
        price: "$49.99",
        img: "imgs/dumbbells.jpg",
        desc: "Set of 2x 15kg dumbbells made from solid cast iron with a protective rubber coating. Ergonomic anti-slip handles. Ideal for strength training, hypertrophy, and progressive overload workouts."
    },
    2: {
        name: "Resistance Bands",
        price: "$14.99",
        img: "imgs/bands.jpg",
        desc: "Set of elastic resistance bands made from durable latex material. Includes multiple resistance levels (light to heavy). Perfect for full-body workouts, mobility, and rehabilitation exercises."
    },
    3: {
        name: "Workout Gloves",
        price: "$12.00",
        img: "imgs/gloves.jpg",
        desc: "Breathable workout gloves made from microfiber and mesh fabric. Padded palm for grip and protection. Adjustable wrist strap. Available sizes: S, M, L.",
        sizes: ["S", "M", "L"]
    },
    4: {
        name: "Protein Shaker",
        price: "$7.00",
        img: "imgs/shaker.jpg",
        desc: "600ml BPA-free plastic shaker bottle with leak-proof lid and mixing ball. Ideal for protein shakes, pre-workout, and hydration on the go."
    },
    5: {
        name: "Yoga Mat",
        price: "$19.99",
        img: "imgs/mat.jpg",
        desc: "Non-slip yoga mat made from eco-friendly TPE material. 6mm thickness for comfort and joint support. Suitable for yoga, pilates, stretching, and home workouts."
    },
    6: {
        name: "Jump Rope",
        price: "$9.99",
        img: "imgs/rope.jpg",
        desc: "Adjustable speed jump rope with steel cable and foam handles. Length: up to 3m. Perfect for cardio, endurance training, and fat burning workouts."
    },

    // 🔵 GEAR (7–12)
    7: {
        name: "Windbreaker",
        price: "$69.99",
        img: "imgs/jacket.jpg",
        desc: "Lightweight windbreaker made from water-resistant polyester. Breathable inner lining and zip closure. Ideal for outdoor workouts. Available sizes: S, M, L, XL.",
        sizes: ["S", "M", "L", "XL"]
    },
    8: {
        name: "Women's Leggings",
        price: "$19.99",
        img: "imgs/leg.jpg",
        desc: "High-waisted leggings made from stretchable nylon-spandex blend. Sweat-wicking and breathable. Designed for gym training, yoga, and everyday wear. Sizes: XS–XL.",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    9: {
        name: "T-Shirt",
        price: "$25.00",
        img: "imgs/shirt.jpg",
        desc: "Athletic fit t-shirt made from cotton-polyester blend. Soft, breathable, and moisture-wicking. Perfect for workouts or casual wear. Available sizes: S–XL.",
        sizes: ["S", "M", "L", "XL"]
    },
    10: {
        name: "Running Shoes",
        price: "$129.99",
        img: "imgs/shoe.jpg",
        desc: "High-performance running shoes with breathable mesh upper and cushioned sole. Anti-slip rubber outsole for stability. Available sizes: EU 38–45.",
        sizes: ["38", "39", "40", "41", "42", "43", "44", "45"]
    },
    11: {
        name: "Running Shoes (Pro)",
        price: "$115.00",
        img: "imgs/shoe2.jpg",
        desc: "Advanced running shoes featuring reinforced sole support and shock absorption technology. Lightweight design for speed and endurance. Sizes: EU 38–45.",
        sizes: ["38", "39", "40", "41", "42", "43", "44", "45"]
    },
    12: {
        name: "Women's Tank Top",
        price: "$15.00",
        img: "imgs/tank.jpg",
        desc: "Lightweight tank top made from breathable polyester fabric. Slim fit design for comfort and mobility. Ideal for intense workouts. Sizes: XS–XL.",
        sizes: ["XS", "S", "M", "L", "XL"]   
    },

    // 🔴 EQUIPMENT (13–18)
    13: {
        name: "5kg Dumbbells (2pcs)",
        price: "$30.00",
        img: "imgs/5kg.jpg",
        desc: "Set of 2x 5kg dumbbells made from cast iron with rubber coating. Compact and durable. Perfect for beginners and light resistance training."
    },
    14: {
        name: "10kg Dumbbells (2pcs)",
        price: "$49.99",
        img: "imgs/10kg.jpg",
        desc: "Set of 2x 10kg dumbbells with anti-slip grip handles. Rubber-coated for floor protection. Ideal for intermediate strength workouts."
    },
    15: {
        name: "20kg Dumbbells (2pcs)",
        price: "$99.99",
        img: "imgs/20kg.jpg",
        desc: "Set of 2x 20kg heavy-duty dumbbells made from solid steel core with rubber coating. Designed for advanced strength training and heavy lifting."
    },
    16: {
        name: "Barbell Bar",
        price: "$179.99",
        img: "imgs/barb.jpg",
        desc: "Olympic barbell made from hardened steel. Length: 180cm. Weight capacity: up to 300kg. Ideal for squats, bench press, and deadlifts."
    },
    17: {
        name: "12kg Kettlebell",
        price: "$40.00",
        img: "imgs/kettle.jpg",
        desc: "12kg kettlebell made from cast iron with textured grip handle. Perfect for strength, conditioning, and functional training."
    },
    18: {
        name: "Multi-Functional Bench",
        price: "$50.00",
        img: "imgs/bench.jpg",
        desc: "Adjustable workout bench with multiple incline positions. Steel frame with padded cushioning. Suitable for full-body strength training."
    }

};

window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (products[id]) {

        // 🧠 LOAD PRODUCT DATA
        document.getElementById("productName").textContent = products[id].name;
        document.getElementById("productPrice").textContent = products[id].price;
        document.getElementById("productImg").src = products[id].img;
        document.getElementById("productDesc").textContent = products[id].desc;

        // 📏 SIZE SELECTOR
        const sizeContainer = document.getElementById("sizeContainer");
        const sizeSelect = document.getElementById("sizeSelect");

        if (products[id].sizes) {
            sizeContainer.style.display = "block";

            products[id].sizes.forEach(size => {
                const option = document.createElement("option");
                option.value = size;
                option.textContent = size;
                sizeSelect.appendChild(option);
            });
        }

        // 🛒 ADD TO CART BUTTON
        const addBtn = document.querySelector(".add-cart");

        if (addBtn) {
            addBtn.addEventListener("click", () => {

                const product = products[id];

                if (product.sizes) {
                    const selectedSize = document.getElementById("sizeSelect").value;

                    if (!selectedSize) {
                        alert("Please select a size!");
                        return;
                    }
                }

                alert("Added to cart!");
            });
        }

    }

});
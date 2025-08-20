const data = [
    {
        image: {
            thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
            mobile: "./assets/images/image-waffle-mobile.jpg",
            tablet: "./assets/images/image-waffle-tablet.jpg",
            desktop: "./assets/images/image-waffle-desktop.jpg",
        },
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.5,
    },
    {
        image: {
            thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
            mobile: "./assets/images/image-creme-brulee-mobile.jpg",
            tablet: "./assets/images/image-creme-brulee-tablet.jpg",
            desktop: "./assets/images/image-creme-brulee-desktop.jpg",
        },
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.0,
    },
    {
        image: {
            thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
            mobile: "./assets/images/image-macaron-mobile.jpg",
            tablet: "./assets/images/image-macaron-tablet.jpg",
            desktop: "./assets/images/image-macaron-desktop.jpg",
        },
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.0,
    },
    {
        image: {
            thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
            mobile: "./assets/images/image-tiramisu-mobile.jpg",
            tablet: "./assets/images/image-tiramisu-tablet.jpg",
            desktop: "./assets/images/image-tiramisu-desktop.jpg",
        },
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.5,
    },
    {
        image: {
            thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
            mobile: "./assets/images/image-baklava-mobile.jpg",
            tablet: "./assets/images/image-baklava-tablet.jpg",
            desktop: "./assets/images/image-baklava-desktop.jpg",
        },
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.0,
    },
    {
        image: {
            thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
            mobile: "./assets/images/image-meringue-mobile.jpg",
            tablet: "./assets/images/image-meringue-tablet.jpg",
            desktop: "./assets/images/image-meringue-desktop.jpg",
        },
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.0,
    },
    {
        image: {
            thumbnail: "./assets/images/image-cake-thumbnail.jpg",
            mobile: "./assets/images/image-cake-mobile.jpg",
            tablet: "./assets/images/image-cake-tablet.jpg",
            desktop: "./assets/images/image-cake-desktop.jpg",
        },
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.5,
    },
    {
        image: {
            thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
            mobile: "./assets/images/image-brownie-mobile.jpg",
            tablet: "./assets/images/image-brownie-tablet.jpg",
            desktop: "./assets/images/image-brownie-desktop.jpg",
        },
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 4.5,
    },
    {
        image: {
            thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
            mobile: "./assets/images/image-panna-cotta-mobile.jpg",
            tablet: "./assets/images/image-panna-cotta-tablet.jpg",
            desktop: "./assets/images/image-panna-cotta-desktop.jpg",
        },
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.5,
    },
];
const items = document.querySelector(".items");
const bascketItems = document.querySelector(".basket-items");
const modal = document.querySelector(".modal-h");
let cart = [];
data.forEach((d) => {
    items.innerHTML += `
            <div class="item col-md-4 col-sm-6 col-12">
                <div class="img-holder">
                    <img
                        class="item-img"
                        src=${d.image.desktop}
                        alt="waffle"
                    />
                    <div class="btn-holder">
                        <button class="add-btn show">
                            <img
                                src="./assets/images/icon-add-to-cart.svg"
                                alt="add"
                            />
                            <span class="add-cart">Add to Cart</span>
                            
                        </button>
                        <div class="add-div hide">
                            <button id="decrement">
                                <img
                                    src="./assets/images/icon-decrement-quantity.svg"
                                    alt="decrement"
                                />
                            </button>
                            <span class="count">1</span>
                            <button id="increment" >
                                <img
                                    src="./assets/images/icon-increment-quantity.svg"
                                    alt="increment"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <span class="item-kind"> ${d.category} </span>
                <h3 class="item-name">${d.name}</h3>
                <span class="item-price">${d.price}</span>
            </div>
            `;
});
const empty = document.querySelector(".empty");
const totalDiv = document.querySelector("#total-div");
const itemHolder = document.querySelectorAll(".item");

itemHolder.forEach((item) => {
    const btn = item.querySelector(".add-btn");
    const addDiv = item.querySelector(".add-div");
    const btnHolder = item.querySelector(".btn-holder");
    const counter = item.querySelector(".count");
    const img = item.querySelector(".item-img");
    const imgSrc = img.getAttribute("src");
    const name = item.querySelector(".item-name").textContent;
    const price = parseFloat(item.querySelector(".item-price").textContent);
    let count = 1;
    btn.addEventListener("click", () => {
        cart.push({ name, price, count, imgSrc });
        console.log(cart);
        updateBasket();
        btnHolder.classList.add("added");
        img.classList.add("added");
        addDiv.className = "add-div added";
        btn.className = "add-btn hide";
        empty.className = "empty hide";
        totalDiv.className = "";
    });

    const inc = item.querySelector("#increment");
    const dec = item.querySelector("#decrement");
    inc.addEventListener("click", () => {
        count++;
        counter.textContent = count;
        let product = cart.find((p) => p.name === name);
        if (product) product.count = count;
        updateBasket();
    });
    dec.addEventListener("click", () => {
        if (count > 1) {
            count--;
            counter.textContent = count;
            let product = cart.find((p) => p.name === name);
            if (product) product.count = count;
            updateBasket();
        } else {
            cart = cart.filter((p) => p.name !== name);
            updateBasket();
            count = 1;
            counter.textContent = 1;
            btnHolder.classList.remove("added");
            img.classList.remove("added");
            addDiv.className = "add-div hide";
            btn.className = "add-btn show";
            if (cart.length === 0) {
                empty.className = "empty shof";
                totalDiv.className = "hide";
            }
        }
    });
});
function updateBasket() {
    modal.innerHTML = "";
    let t = 0;
    cart.forEach((p) => {
        t += p.count;
    });
    if (t == 0) bascketItems.innerHTML = "";
    else {
        bascketItems.innerHTML = `<h2 class="basket-title">Your Card (${t})</h2>`;
    }
    let total = 0;
    cart.forEach((p) => {
        total += p.price * p.count;
        t += p.count;

        bascketItems.innerHTML += `
            <div class="basket-item">
                    <div class="item-holder">
                        <h4 class="item-title"> ${p.name}</h4>
                        <span class="number">${p.count}x</span>
                        <span class="rate">@ $${p.price}</span>
                        <span class="total">$${(p.price * p.count).toFixed(
                            2
                        )}</span>
                    </div>
                    <button class="remove-btn">
                        <img
                            class="remove"
                            src="./assets/images/icon-remove-item.svg"
                            alt="remove"
                        />
                    </button>
            </div>
            `;
        document.querySelector(".total-price").textContent =
            "$" + total.toFixed(2);
        modal.innerHTML += `
            <div class="basket-item modal-basket">
                <div class="item-holder modal-holder">
                    <img
                        class="modal-img"
                        src=${p.imgSrc}
                        alt="tiramisu"
                    />
                    <div>
                        <h4 class="item-title">
                            ${p.name}
                        </h4>
                        <span class="number">${p.count}x</span>
                        <span class="rate">@ $${p.price}</span>
                    </div>
                </div>
                <span class="total">${(p.price * p.count).toFixed(2)}</span>
            </div>
        `;
        document.querySelector(".total-m").textContent = "$" + total.toFixed(2);
    });
}

bascketItems.addEventListener("click", (e) => {
    if (e.target.closest(".remove-btn")) {
        const basketItem = e.target.closest(".basket-item");
        const name = basketItem.querySelector(".item-title").textContent.trim();

        cart = cart.filter((p) => p.name !== name);
        updateBasket();

        itemHolder.forEach((item) => {
            if (item.querySelector(".item-name").textContent.trim() === name) {
                const btn = item.querySelector(".add-btn");
                const addDiv = item.querySelector(".add-div");
                const btnHolder = item.querySelector(".btn-holder");
                const counter = item.querySelector(".count");
                const img = item.querySelector(".item-img");

                counter.textContent = 1;
                btnHolder.classList.remove("added");
                img.classList.remove("added");
                addDiv.className = "add-div hide";
                btn.className = "add-btn show";
            }
        });

        if (cart.length === 0) {
            empty.className = "empty shof";
            totalDiv.className = "hide";
        }
    }
});

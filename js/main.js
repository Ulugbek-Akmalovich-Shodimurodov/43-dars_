const elGadgetCardTemplate = document.querySelector(".gadget-card-template");

const elCardWrapper = document.querySelector(".card-list")
const createGadgetCard = (product) => {
    const { id } = product
    const elGadgetCard = elGadgetCardTemplate.cloneNode(true).content;

    const elGadgetTitle = elGadgetCard.querySelector(".gadget_title");
    elGadgetTitle.textContent = product.title;

    const elGadgetMark = elGadgetCard.querySelector(".gadget-mark");
    elGadgetMark.textContent = product.price;

    const elGadgetBadge = elGadgetCard.querySelector(".badge");
    elGadgetBadge.textContent = product.model;



    const elDate = new Date(product.addedDate);
    const elGadgetDate = elGadgetCard.querySelector(".card-date");
    elGadgetDate.textContent = `${elDate.getDate()}.${elDate.getDate()+1}.${elDate.getFullYear()}`;

    const elGadgetROM = elGadgetCard.querySelector(".operativ-xotira");
    elGadgetROM.textContent = product.benefits[0];

    const elGadgetRAM = elGadgetCard.querySelector(".doimiy-xotira");
    elGadgetRAM.textContent = product.benefits[1];

    const elGadgetWaterFlov = elGadgetCard.querySelector(".chidamlilik");
    elGadgetWaterFlov.textContent = product.benefits[2];

    const elGadgetXusuiyat = elGadgetCard.querySelector(".xususiyati");
    elGadgetXusuiyat.textContent = product.benefits[3];

    const elDeleteBtn = elGadgetCard.querySelector(".delete-btn");
    elDeleteBtn.dataset.id = id

    const elEditBtn = elGadgetCard.querySelector(".btn-secondary");
    elEditBtn.dataset.id = id;

    return elGadgetCard;

}

const renderProduct = () => {
    elCardWrapper.innerHTML = "";
    products.forEach((product) => {

        elCardWrapper.append(createGadgetCard(product))
    })

}

renderProduct();

const elAddNewProduct = document.querySelector("#add-product-form");


elAddNewProduct.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formElements = evt.target.elements;
    console.log(formElements);
    const elNameInputValue = formElements[0].value.trim();
    const elProductPriceValue = +formElements.price.value.trim();
    const elProductManufacturer = formElements[2].value.trim();
    const elProductBenefits = formElements.benefits.value.trim();

    if (elNameInputValue && elProductManufacturer && elProductBenefits && elProductPriceValue > 0) {
        const addingProduct = {
            id: Math.floor(Math.random() * 1000),
            title: elNameInputValue,
            img: "https://picsum.photos/300/200",
            price: elProductPriceValue,
            model: elProductManufacturer,
            addedDate: new Date().toISOString(),
            benefits: elProductBenefits.split(' ')
        }

        products.unshift(addingProduct);
        const elNewProduct = createGadgetCard(addingProduct);
        elCardWrapper.prepend(elNewProduct);

        elAddNewProduct.reset();
    }
})

const elEditProductForm = document.querySelector("#edit-product-form");
const elEditProductName = elEditProductForm.querySelector("#edit-product-title");
const elEditProductPrice = elEditProductForm.querySelector("#edit-price");
const elEditProductManufacturer = elEditProductForm.querySelector(".edit-product-manufacturer");
const elEditProductBenefits = elEditProductForm.querySelector("#edit-benefits");
const elProductModal = document.querySelector("#edit-product-modal")
const elProductManufacturer = document.querySelector("#edit-product-manufacturer");
const editProductModal = new bootstrap.Modal(elProductModal)

elCardWrapper.addEventListener("click", (evt) => {
    if (evt.target.matches(".delete-btn")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnIndex = products.findIndex((product) => {
            return product.id === clickedBtnId;
        })
        products.splice(clickedBtnIndex, 1);

        renderProduct();
    }

    if (evt.target.matches(".btn-secondary")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnObj = products.find((product) => product.id === clickedBtnId)

        if (clickedBtnObj) {

            elEditProductName.value = clickedBtnObj.title || "";
            elEditProductPrice.value = clickedBtnObj.price || "";
            elEditProductBenefits.value = clickedBtnObj.benefits.join(" ") || "";
            elEditProductForm.dataset.id = clickedBtnId;
            elProductManufacturer.value = clickedBtnObj.model;
        }
    }
})

elEditProductForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const submittingItemId = +evt.target.dataset.id;
    const nameValue = elEditProductName.value.trim();
    const elProductPrice = elEditProductPrice.value.trim();
    const elBenefits = elEditProductBenefits.value.trim();
    const elManufacturerValue = elProductManufacturer.value
    console.log(elManufacturerValue);
    if (nameValue && elBenefits && elManufacturerValue && elProductPrice > 0) {
        const submittingProductIndex = products.findIndex(student => student.id === submittingItemId)

        const editingProduct = {
            id: submittingItemId,
            title: nameValue,
            img: "https://picsum.photos/300/200",
            price: elProductPrice,
            model: elManufacturerValue,
            addedDate: new Date().toISOString(),
            benefits: elEditProductBenefits.value.split(' ')
        }

        products.splice(submittingProductIndex, 1, editingProduct);
        renderProduct();

        editProductModal.hide();
    }
})
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

    return elGadgetCard;

}

const renderProduct = () => {
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

elCardWrapper.addEventListener("click", (evt) => {
    if (evt.target.matches(".delete-btn")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnIndex = products.findIndex((product) => {
            return product.id === clickedBtnId
        })
        console.log(clickedBtnIndex);
        products.splice(clickedBtnIndex, 1);
        elCardWrapper.innerHTML = ""
    }
    renderProduct();
})
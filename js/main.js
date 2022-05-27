const elGadgetCardTemplate = document.querySelector(".gadget-card-template");

const elCardWrapper = document.querySelector(".card-list")

const createGadgetCard = (product) => {
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

    return elGadgetCard;

}
products.forEach((product) => {

    elCardWrapper.append(createGadgetCard(product))
})
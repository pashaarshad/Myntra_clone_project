let bagItemObj;
onLoad();

function onLoad() {
    loadBagItemsObj();
    displayBagItems();
    dispayBag();
}

function loadBagItemsObj() {
    console.log(bagItems);
    bagItemObj = bagItems.map(itemID => {
        for (let i = 0; i < items.length; i++) {
            if (itemID == items[i].id) {
                return items[i];
            }
        }
    });
    console.log(bagItemObj);

}

function displayBagItems() {
    let bagCon = document.querySelector(".items");

    let innerHTML12 = ``;
    bagItemObj.forEach(bagItems => {
        innerHTML12 += generateItemHTML(bagItems);
    });
    bagCon.innerHTML = innerHTML12;
}
function removeBagItem(itemID){
    console.log("Remove Item", itemID);
   bagItems = bagItems.filter(id => id != itemID);
   localStorage.setItem('bagItems', JSON.stringify(bagItems));
   onLoad();
}

function generateItemHTML(item) {

    return `
             <div class="item">
                  <img class="img_item" src="../${item.image}" alt="itmes">
                    <div class="itme-con">
                        <div class="comapny-name">${item.company}</div>
                        <div class="item-name"> ${item.item_name}</div>
                        <div class="price">
                            <span class="current-price">${item.current_price}</span>
                            <span class="org-price">Rs ${item.original_price}</span>
                            <span class="discount">(${item.discount_percentage}% OFF)</span>
                        </div>
                        <div> <span class="days"> ${item.return_period} Days </span> Return Avaliable</div>
                        <div>Delivery By <span class="delivery">${item.delivery_date}</span></div>

                    </div>
                     <div class="remove-item" onclick="removeBagItem(${item.id})">X</div>

                </div>
    
    `;
}
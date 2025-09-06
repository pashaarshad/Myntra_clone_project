let bagItemObj;
onLoad();

function onLoad() {
    loadBagItemsObj();
    displayBagItems();
    displayBagSummary();
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

    if (bagItemObj.length === 0) {
        bagCon.innerHTML = `
            <div class="empty-bag">
                <img src="../images/bag.png" alt="Empty Bag" class="empty-bag-icon">
                <h3>Your bag is empty!</h3>
                <p>Add some items to get started</p>
                <a href="../index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        return;
    }

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
            <img class="img_item" src="../${item.image}" alt="items">
            <div class="itme-con">
                <div class="comapny-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">${item.current_price}</span>
                    <span class="org-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
                </div>
                <div><span class="days">${item.return_period} Days</span> Return Available</div>
                <div>Delivery By <span class="delivery">${item.delivery_date}</span></div>
            </div>
            <div class="remove-item" onclick="removeBagItem(${item.id})">X</div>
        </div>
    `;
}

function displayBagSummary() {
    let bagSummary = {
        totalItems: bagItemObj.length,
        totalMRP: 0,
        totalDiscount: 0,
        convenienceFee: 99,
        finalPayment: 0
    };

    bagItemObj.forEach(item => {
        bagSummary.totalMRP += item.original_price;
        bagSummary.totalDiscount += item.original_price - item.current_price;
    });

    // Update convenience fee logic for empty bag
    if (bagSummary.totalItems === 0) {
        bagSummary.convenienceFee = 0;
    }

    bagSummary.finalPayment = bagSummary.totalMRP - bagSummary.totalDiscount + bagSummary.convenienceFee;

    // Update the DOM elements
    document.querySelector('.item-count').textContent = bagSummary.totalItems;
    document.querySelector('.total-mrp').textContent = 'Rs ' + bagSummary.totalMRP;
    document.querySelector('.discount-amount').textContent = '-Rs ' + bagSummary.totalDiscount;
    document.querySelector('.convenience-fee').textContent = 'Rs ' + bagSummary.convenienceFee;
    document.querySelector('.total-amount').textContent = 'Rs ' + Math.max(0, bagSummary.finalPayment);
}
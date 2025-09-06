let bagItemObj;
const CONVENIENCE_FEE = 99;
onLoad();

function onLoad() {
    loadBagItemsObj();
    displayBagItems();
    dispayBag();
    dispayBagSummary();
}



function dispayBagSummary() {
    let bagSummary = document.querySelector(".summary");
    let totalItems = bagItemObj.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    let finalPaymet = 0;

   bagItemObj.forEach(bagItems => {
        totalMRP += bagItems.original_price;
        totalDiscount += (bagItems.original_price - bagItems.current_price);
    });

    finalPaymet = totalMRP - totalDiscount + CONVENIENCE_FEE;

    bagSummary.innerHTML = `
              <h3>PRICE DETAILS (${totalItems} Items)</h3>
                <br>
                <h5>Total MRP <span class="summary-amm">₹ ${totalMRP}</span></h5>
                <h5>Discount on MRP <span class="summary-amm">₹ ${totalDiscount}</span></h5>
                <h5>Convenience Fee <span class="summary-amm">₹ 99 </span> </h5>
                <hr>
                <h2>Total Amount <span class="summary-amm">₹ ${finalPaymet}</span></h2>
                <br>
                <button class="btn-po"> PLACE ORDER</button>
    `;
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


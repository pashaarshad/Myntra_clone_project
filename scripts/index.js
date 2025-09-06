let bagItems;
onLoad();

function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr): [] ;
    displayItemsOnHomePage()
    dispayBag()

}

function dispayBag(){
    let bagCount = document.querySelector(".bag-count");
     bagCount.innerText = bagItems.length;

     if(bagItems.length === 0)
     {
        bagCount.style.visibility = 'hidden';


     }
     else{
      bagCount.style.visibility = 'visible';
     }
}

function addToBag(itemID){
// alert("Bag")
bagItems.push(itemID);
localStorage.setItem('bagItems', JSON.stringify(bagItems));
console.log(bagItems);
dispayBag();
}




function displayItemsOnHomePage(){
let itemsConEle = document.querySelector(".items-con");

if(!itemsConEle )
{
    return;
}

let innerHTML = '';
items.forEach(item => {
    innerHTML += `   
<div class="item-con">
                <img class="items-img" src="${item.image}" alt="img 1">
                <div class="rating">
                    ${item.rating.stars} ⭐ | ${item.rating.count}
                </div>
                <div class="comapny-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">Rs ${item.current_price} </span>
                    <span class="org-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
            </div>
    `;
});
itemsConEle.innerHTML = innerHTML;
}


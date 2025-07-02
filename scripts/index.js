let bagItems;
onLoad();
function onLoad(){
let bagItemStr=localStorage.getItem('bagItems');
bagItems=bagItemStr?JSON.parse(bagItemStr):[];
displayItemsOnPage();
displayBagIconCount();
}


function addtobag(itemId){
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIconCount();
}



function displayBagIconCount(){
  let bagCountIconElement=document.querySelector('.bag-item-count');
   if (bagItems.length > 0) {
    console.log('I am here');
    bagCountIconElement.style.visibility = 'visible';
    bagCountIconElement.innerText = bagItems.length;
  } else {
    bagCountIconElement.style.visibility = 'hidden';
  }
 

}

function displayItemsOnPage(){
    let itemsContainer=document.querySelector('.items-container');
if(!itemsContainer){
  return;
}
let innerHTML='';



items.forEach(item=>{
  innerHTML+=`
    <div class="item-container">
      <img src="${item.image}">
      <div class="product-rating-container">
        ${item.rating.stars} ⭐ | ${item.rating.count}
      </div>
      <div class="product-productMetaInfo">
        <h3 class="product-brand">${item.company}</h3>
        <h4 class="product-product">${item.item_name}</h4>

          <div class="product-price">
            <span>
              <span class="product-discountedPrice">
              ${item.current_price}</span>
               <span class="product-strike">
                ${item.original_price}</span>
              </span>
              <span class="product-discountPercentage">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="add-to-bag" onclick="addtobag(${item.id})">Add to Bag</button>

            
      </div>
    </div>
    `
});
itemsContainer.innerHTML=innerHTML;
}




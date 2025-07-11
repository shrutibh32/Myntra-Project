const CONVNIENCE_FEE=99;
let bagItemsObjects;
onLoad();

function onLoad(){
  loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function loadBagItemObjects(){
console.log(bagItems);

bagItemsObjects=bagItems.map(itemId=>{
  for(let i=0;i<items.length;i++){
    if(itemId==items[i].id){
      return items[i];
    }
  }
});
console.log( bagItemsObjects);
}
function displayBagItems(){
  
  let bagItemsContainerElement=document.querySelector('.bag-items-container');
  let innerHTML='';
  bagItemsObjects.forEach(bagItem => {
    innerHTML+=generateHtml(bagItem);
  });
  bagItemsContainerElement.innerHTML=innerHTML
         
}


function generateHtml(item){
  return  `
            <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">${item.current_price}</span>
                <span class="product-strike">${item.original_price}</span>
                <span class="product-discountPercentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removefromCart(${item.id})">X</div>
          </div>
          `;
}


function removefromCart(itemId){
    bagItems=bagItems.filter(bagItemsId=> bagItemsId!=itemId);
      localStorage.setItem('bagItems',JSON.stringify(bagItems));
      loadBagItemObjects();
      displayBagIconCount();
      displayBagItems();
      displayBagSummary();
}


function displayBagSummary(){
  let bagSummaryElemnent=document.querySelector('.bag-summary');
  let totalItem=bagItemsObjects.length;
let totalMRP=0;
let discountamount=0;
let finalamount=0;


bagItemsObjects.forEach(bagItem=>{
  totalMRP+=bagItem.original_price;
  discountamount+=bagItem.original_price-bagItem.current_price;
});


finalamount=(totalMRP+CONVNIENCE_FEE)-discountamount;
  bagSummaryElemnent.innerHTML=`
            <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹ ${discountamount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹  ${finalamount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
          `;
}
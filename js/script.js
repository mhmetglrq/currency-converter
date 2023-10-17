const dropList=document.querySelectorAll(".drop-list select"),
 fromCurrency=document.querySelector(".from select"),
 toCurrency=document.querySelector(".to select"),
 getButton=document.querySelector("form button");

const apiKey="f32732d09585c50348c515fe";

for (let i = 0; i < dropList.length; i++) {
   for(var currency_code in country_code){
      let selected;
      if (i==0) {
         selected=currency_code == "USD" ? "selected" : "";
      }
      else if(i== 1){
         selected=currency_code == "TRY" ? "selected" : "";

      }
      let optionTag=`<option value="${currency_code}">${currency_code}</option>`
      dropList[i].insertAdjacentHTML("beforeend",optionTag);
   }
   dropList[i].addEventListener("change", e=>{
      loadFlag(e.target);
   })
    
}

function loadFlag(element) {
   for(code in country_code){
      if (code== element.value) {
         let imgTag =element.parentElement.querySelector("img");
         imgTag.src=`https://flagsapi.com/${country_code[code]}/flat/64.png`;
      }
   }
}

window.addEventListener(("onload"),()=>{
   getExchangeRate();
});

getButton.addEventListener(("click"),e=>{
   e.preventDefault();
   getExchangeRate();
});

const exchangeIcon=document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click",()=>{
   let tempCode=fromCurrency.value;
   fromCurrency.value=toCurrency.value;
   toCurrency.value=tempCode;
   loadFlag(fromCurrency);
   loadFlag(toCurrency);
   getExchangeRate();
})

function getExchangeRate() {
   const amount=document.querySelector(".amount input");
   let amountVal=amount.value;
    exchangeRateTxt=document.querySelector(".exchange-rate");
   if (amountVal=="" || amountVal=="0") {
      amount.value="1";
      amountVal=1;
   }
   exchangeRateTxt.innerText=`Getting Exchange Rate...`;
   let url=`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
   fetch(url).then(response=> response.json().then(result=>{
      let exchangeRate=result.conversion_rates[toCurrency.value];
      let totalExchangeRate=(amountVal * exchangeRate).toFixed(3);
      exchangeRateTxt.innerText= `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
   })).catch(()=>{
      exchangeRateTxt.innerText =`Something went wrong`;
   })
}
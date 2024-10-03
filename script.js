const dropdowns = document.querySelectorAll(".dropdown select")
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const fromCurrency = document.querySelector(".from select")
const toCurrency = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for(let select of dropdowns){
  for(code in countryList){
    let newOption = document.createElement("option")
    newOption.innerText = code
    newOption.value = code
    if(select.name==="from" &&  code==="USD"){
      newOption.selected = "selected"
    }
    else if(select.name==="to" &&  code==="INR"){
      newOption.selected = "selected"
    }
    select.append(newOption)
  }

  select.addEventListener("change",(evt)=>{
    console.log(evt)
    updateFlag(evt.target)
  })
}


const updateFlag = (element) => {
   let currCode = element.value
   let countryName = countryList[currCode]
   let newImg = element.parentElement.querySelector("img")   // getting select as an element
   newImg.src = `https://flagsapi.com/${countryName}/flat/64.png`
}

const btn = document.querySelector("form button")

btn.addEventListener(("click"),(evt)=>{
  evt.preventDefault();
  updateExhangeRate()
  
})

window.addEventListener("load",()=>{
  updateExhangeRate()
})


const updateExhangeRate = async  () =>{
  let amount = document.querySelector(".amount input")
  let amtVal = amount.value
  if(amtVal<1 || amtVal ===""){
    amtVal=1
    amount.value="1"
  }
  // console.log(fromCurrency.value,toCurrency.value) 

  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`
  let response = await fetch(URL)
  let json = await response.json()
  let rate = json[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()]
  let finalAmount = amtVal * rate

  msg.innerText = `${amtVal}${fromCurrency.value} = ${finalAmount}${toCurrency.value}`
}




const data = null;
var query = "";
let moneys = Array.from(document.getElementsByClassName("money"));
let signs = Array.from(document.getElementsByClassName("sign"))
let currentCurrency = "USD";


function convertToEuros() {
    //console.log("converting to euros");
    conversionRate(currentCurrency, "EUR")
    currentCurrency = "EUR";
    for (let i = 0; i < signs.length; i++) {
        signs[i].textContent = "\u20AC"
    }
}

function conversionRate(fromCurrency, toCurrency) {
    var apiKey = 'e6af0bda214a8ec5e3a6';

    let xhr = new XMLHttpRequest();
    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    query = fromCurrency + '_' + toCurrency;

    var url = 'https://free.currconv.com/api/v7/convert?q='
        + query + '&compact=ultra&apiKey=' + apiKey;

   // console.log(url);

    xhr.addEventListener("load", function () {
        let jsonres = JSON.parse(this.response);
        //console.log(jsonres)
        if (jsonres.hasOwnProperty('error')) {
            console.log(jsonres.error);
        } else {
            let converted = jsonres[query];
            for (let i = 0; i < moneys.length; i++) {
                let old = moneys[i].textContent
                moneys[i].textContent = Math.round(old * converted * 100) / 100
                moneys[i].textContent;
            }
        }
    });


    xhr.open("GET", url);
    xhr.send();
}

document.getElementById("euroButton").addEventListener("click", convertToEuros);

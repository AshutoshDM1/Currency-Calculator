let input1 = document.querySelector("#input1");
let submitBtn = document.querySelector(".submitBtn");
let selectDiv = document.querySelectorAll(".selects");
let yourValue = document.querySelector("#yourValue");
let finalValueDis = document.querySelector("#finalValue");
let fromCountry = document.querySelector("#fromCountry");
let toCountry = document.querySelector("#toCountry");
let selectFrom = document.querySelector("#selectFrom");
let selectTo = document.querySelector("#selectTo");
let song = document.querySelector(".song");
let morediv = document.querySelector("#morediv");
let morefuction = document.querySelector(".morefuction");
let soundbtn = document.querySelector(".soundbtn");
let songdiv = document.querySelector(".songdiv");


function actionBtn() {
    console.log();
    let value = input1.value ;
    if (input1.value === "") {
        yourValue.innerText = "1";
        value = 1;
    }
    console.log(value);
    yourValue.innerText = value ;
    input1.value = "";
    selectDisplay(); 
    getRates(value);
    song.play();

}
submitBtn.addEventListener ("click" , actionBtn);


for ( let select of selectDiv) {
    for (let country in countryList) {
        let countryCodes = document.createElement("option");
        countryCodes.innerText = country;
        countryCodes.value = country;
        select.append(countryCodes);

        if (select.name==="From" && country==="USD") {
            countryCodes.selected ="selected"; 
        }
        if (select.name==="To" && country==="INR") {
            countryCodes.selected ="selected";
        }
    }
}
 
//  a   q    1    `    z 


function selectDisplay() {
    for (let option of selectFrom) {
        if (option.selected ===true) {
            console.log( "from =",option.innerText);
            fromCountry.innerText = option.innerText ;
        } 
    }
    for (let option of selectTo) {
        if (option.selected ===true) {
            console.log( "to =",option.innerText);
            toCountry.innerText = option.innerText ;
        } 
    }
    return fromCountry.innerText ,toCountry.innerText;

}

async function  getRates(value) {

    let Country1 = fromCountry.innerText.toLowerCase();
    let Country2 = toCountry.innerText.toLowerCase();
    
    let apiURL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${Country1}/${Country2}.json` ;
    
    let promise = await fetch(apiURL);
    console.log(promise); 
    let data = await promise.json();
    let lastData = data[Country2];
    console.log("Price on = ",data["date"]);
    console.log(data);
    console.log(`1 ${Country1} = ${data[Country2]} ${Country2}`);
    let fValue = value * lastData;
    let sValue = fValue.toString();
    // console.log(sValue.length);
    if (sValue.length > 4 && fValue > 5) {
        fValue = Math.floor(fValue);
    }
    console.log (fValue);
    finalValueDis.innerText = fValue;

}

function moreDivFun() {
    morediv.classList.remove("moredivHide");
    morediv.classList.add("morediv");     
}
function moreDivFun2() {
    morediv.classList.add("moredivHide");
    morediv.classList.remove("morediv");
}
let clickCount = 0;

function moredivclicks() {
    clickCount++;
    if (clickCount%2==0){
        moreDivFun2();
    }
    else {
        moreDivFun();
    }
}
morefuction.addEventListener("click",moredivclicks);

song.volume = 0.2;

function  pause() {
    song.volume =0;
    soundbtn.classList.remove("soundbtnclicked");
}
function play() {
   song.volume =0.2;
   song.play();
   soundbtn.classList.add("soundbtnclicked");
}
let songCount = 1;

function songclicks() {
    songCount++;
    if (songCount%2==0){
        play();
    }
    else {
        pause();
    }
}
soundbtn.addEventListener("click",songclicks);

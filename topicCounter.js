const inputField = document.getElementById("topicName");
var countDisplay = document.getElementById("countDisplay");
var enterSearch = document.getElementById("enterSearch");

inputField.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        enterSearch.click();
    }
});

/*
async funksjon sender en GET request til Wikipedia sitt api. Den bruker await slik at man vet at promise blir returnet.
Videre sjekker man om responsen var gyldig. Så henter man ut tekstfilen på det temaet man har søkt på fra JSON objektet.
Lagrer ønsket tekst som en konstant og teller antall ganger temaet dukker opp i teksten ved hjelp av regex.
*/
async function getTopic() {
    var input = inputField.value.toLowerCase();

    if (input == "" || input == null) {
        alert("Husk å søke på en STRENG!");
    } else {
        //La til &origin=*
        countDisplay.innerHTML = "Laster inn resultat...";
        const textResponse = await fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=parse&section=0&prop=text&format=json&page=" + input, {
                method: "GET",
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Could not reach website.");
                }
                return response.json();
            })
            .then(json => { var textFile = json["parse"]["text"]["*"].toLowerCase(); return textFile; })
            .catch(err => console.error(err));

        console.log(textResponse);

        const inputString = input.toString();

        //Regular Expression brukes her for å finne hvor mange ganger ordet [topic] dukker opp i teksten vi søker på.
        const countWords = (str) => {
            let re = new RegExp(inputString, "g");
            let result = (str || "");
            result = (result.match(re) || []);
            topicCount = result.length;
            return topicCount;
        }

        const displayInput = countWords(textResponse);
        if (displayInput == 0) {
            countDisplay.innerText = "Det finnes ingen artikkel med tema " + inputString;
        } else {
            countDisplay.innerText = inputString + " finnes " + displayInput + " ganger i Wikipedia artikkelen.";
        }
    }

};
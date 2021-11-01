//asynf funksjon som returnerer en promise og etter dette da fetcher apien til Wikipedia.
async function getTopic() {
    const input = document.getElementById("topicName").value.toLowerCase();


    if (input == "" || input == null) {
        alert("Husk å søke på en STRENG!");
    } else {
        //La til &origin=*
        const textResponse = await fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=parse&section=0&prop=text&format=json&page=" + input, {
                method: "GET",
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Could not reach website.");
                }
                return response.json();
            })
            .then(json => { var textFile = json['parse']['text']['*'].toLowerCase(); return textFile })
            .catch(err => console.error(err));

        console.log(textResponse);

        const inputString = input.toString();

        //Regular Expression brukes her for å finne hvor mange ganger ordet [topic] dukker opp i teksten vi søker på.
        const countWords = (str) => {
            let re = new RegExp(inputString, "g");
            let result = (str || '');
            result = (result.match(re) || []);
            topicCount = result.length;
            return topicCount;
        }

        const displayInput = countWords(textResponse);
        console.log(displayInput);









    }

};
async function getTopic() {
    var input = document.getElementById("topicName").value;

    if (input == "" || input == null) {
        alert("Husk å søke på strenger");
    } else {
        //La til &origin=*
        var textResponse = await fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=parse&section=0&prop=text&format=json&page=" + input, {
                method: "GET",
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Could not reach website.");
                }
                return response.json();
            })
            .then(json => { var textFile = json['parse']['text']['*']; return textFile })
            .catch(err => console.error(err));

        console.log(textResponse)

    }
};
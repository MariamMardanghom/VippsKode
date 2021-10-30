var text = null;


fetch("https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=dog")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not reach website.");
        }
        return response.json();
    })
    .then(json => console.log(json))
    .catch(err => console.error(err));
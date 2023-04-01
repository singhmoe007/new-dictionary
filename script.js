const inputField = document.getElementById("word")
const submit = document.getElementById("submit")
const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

let Meaning;
let Phonetic;
let Example;
 


async function meaningFinder() {
    
     

    const word = inputField.value;
    //const word = "money";

    if (word === "") {
        throw new Error("error")
    }

    const urlToFetch = baseUrl + word

    try {
    let response = await fetch(urlToFetch)
    if (response.ok) {
        let resJson = await response.json();
        console.log(resJson)
        //added Phonetic
         
        Phonetic = resJson[0].phonetic
        if (Phonetic) {
            document.getElementById("Phonetic").innerHTML =  Phonetic;
            document.getElementById("Phonetic1").style.display = "block";
         }

        //adding Meaning
        Meaning = resJson[0].meanings[0].definitions[0]["definition"]
        document.getElementById("Meaning").innerHTML = Meaning;

        //addingExample
        Example = resJson[0].meanings[0].definitions[1]["example"]
        if (Example) {
            document.getElementById("Example").innerHTML =  Example;
        }
         
 
    } else if (response.status === 404) {
        document.getElementById("Meaning").innerHTML = "This word does not exist";
        document.getElementById("Phonetic1").style.display = "none";
        document.getElementById("Example1").style.display = "none";
    }

    } catch(error) {
       
       console.log(error)
       
    }


    inputField.value= "";


    
}

 

submit.onclick = meaningFinder;

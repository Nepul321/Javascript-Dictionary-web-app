const URL = "https://api.dictionaryapi.dev/api/v2/entries/en_US/"
const form = document.getElementById("form")
const meanings = document.getElementById("meanings")

async function fetchData(word) {
    let response = await fetch(URL + word);
    let data = await response.json();
    insert(data[0])
    console.log(data[0])
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let word = e.target[0].value
    e.target[0].value = ""
    fetchData(word)
})


function insert(data) {
    const source = "https:" + data.phonetics[0].audio
    const meanings_array = data.meanings
    let code = ""
    let def2 = ""
    let def3 = ""
    meanings_array.forEach(element => {
          code += "<h4 class='my-3'>" + element.partOfSpeech + "</h4>" + `
            ${element.definitions[0].definition}
            <br /> <br />
            ${element.definitions[1] ? element.definitions[1].definition : def2}
            ${def2}
            ${element.definitions[2] ? element.definitions[2].definition : def3}
            ${def3}
          `;
    })
    meanings.innerHTML = `
      <h3 class="my-3">${data.word} (${data.phonetic})</h3>
      <audio controls>
      <source src=${source} type="audio/mpeg">
      </audio>
      <hr />
      <h3>Origin</h3>
      <p>${data.origin}</p>
      <hr/>
      <h3 class="my-3">Meanings</h3>
    ` + code

}


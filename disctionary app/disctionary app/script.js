const form = document.querySelector('form');
const description = document.querySelector('.description');
const input = form.elements[0]; 

form.addEventListener('submit', (e) => {
    e.preventDefault();
   
    getWordInfo(input.value);
});

input.addEventListener('input', () => {
    if (input.value.trim() === '') {
        description.innerHTML = ''; 
    }
});

const getWordInfo = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        let definitions = data[0].meanings[0].definitions[0];

       
        description.innerHTML = 
        `<h2><strong>Word:</strong> ${data[0].word}</h2>
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong> ${definitions.definition || "Not Found"}</p>
        <p><strong>Example:</strong> ${definitions.example || "Not Found"}</p>
        <p><strong>Antonyms:</strong> ${!definitions.antonyms || definitions.antonyms.length === 0 ? "Not Found" : ""}</p>`;

        if (definitions.antonyms && definitions.antonyms.length > 0) {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                description.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
            }
        }

        description.innerHTML += `<div style="margin-top: 10px;"><a href="https://dictionaryapi.dev/" target="_blank"> Read More</a></div>`;
    } catch (error) {
        description.innerHTML = `<p> Sorry, the word could not be found</p>`;
    }
    console.log(data);
};

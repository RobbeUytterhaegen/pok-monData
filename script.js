const url = "https://pokeapi.co/api/v2/"
const gamesDiv = document.getElementById("Pokemon-data");

async function getData() 
{
    try 
    {
        const response = await fetch(url);
        console.log(response);
        if(!response.ok){
            throw new Error(`http error: ${response.status} `);
        };
        const data = await response.json();
        console.log("data, met results titel: ", data);
        const Pokemon = data.results;
        console.log(Pokemon);
        displayData(Pokemon);
    } 
    catch (error) 
    {
        console.error("er ging iets fout met het verkrijgen van de data", error);
        parkingDiv.innerHTML=`<p style = "color:red;">oeps... Het werkt even niet. Kom later terug</p>`;
    } 
    finally 
    {
        console.log("getData finished");
    }
};

function displayData(Pokemon) 
{
    console.log("Pokemon in display functie: ", Pokemon);
    Pokemon.forEach(Pokemon => {
        // const type = Pokemon.type;
        // const naam = Pokemon.name;
        const { name, type} = Pokemon;
        console.log(`name: ${name} | type: ${type}`);
        const parkingCard = document.createElement("div");
        PokemonCard.className = "secondEvolution";
        PokemonCard.innerHTML = `
            <h2>${name}</h2>
            <p>type: ${type}</p>
        `;
        PokemonDiv.appendChild(PokemonCard);
    });
};


getData();
const url = "https://pokeapi.co/api/v2/pokemon/";
const PokemonDiv = document.getElementById("Pokemon-data");

async function getData() {
    try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        console.log("data, met results titel: ", data);
        const Pokemon = data.results; // Use `results` instead of `values`
        console.log(Pokemon);
        displayData(Pokemon);
    } catch (error) {
        console.error("Er ging iets fout met het verkrijgen van de data", error);
        PokemonDiv.innerHTML = `<p style="color:red;">Oeps... Het werkt even niet. Kom later terug</p>`;
    } finally {
        console.log("getData finished");
    }
}

async function fetchPokemonDetails(detailUrl) {
    try {
        const response = await fetch(detailUrl);
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return await response.json();
    } catch (error) {
        console.error("Fout bij ophalen van details: ", error);
        return null;
    }
}

async function displayData(Pokemon) {
    for (let poke of Pokemon) {
        const { name, url: detailUrl } = poke;

        // Haal details van de pokemon op
        const details = await fetchPokemonDetails(detailUrl);
        if (!details) continue;

        // Extract relevante gegevens
        const weight = details.weight;
        const height = details.height;
        const cryurl = details.sprites?.front_default || ""; // Assuming the image URL or sprite

        console.log(`Name: ${name}, Weight: ${weight}, Height: ${height}`);

        const PokemonCard = document.createElement("div");
        PokemonCard.classList.add("PokemonCard");
        PokemonCard.innerHTML = `
            <h2>${name}</h2>
            <p>Weight: ${weight}</p>
            <p>Height: ${height}</p>
            <img src="${cryurl}" alt="${name}">
        `;
        PokemonDiv.appendChild(PokemonCard);
    }
}

getData();

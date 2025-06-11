const GRAPHQL_URL = "http://localhost:4000/graphql";

async function fetchCountries() {
    const query = `{ countries { code name } }`;
    const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const result = await response.json();
    const list = document.getElementById("countries");
    list.innerHTML = result.data.countries.map(c => `<li>${c.code}: ${c.name}</li>`).join("");
}

window.onload = fetchCountries;

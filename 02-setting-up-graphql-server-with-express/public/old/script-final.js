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

async function addCountry() {
    const code = document.getElementById("code").value;
    const name = document.getElementById("name").value;
    const query = `mutation { addCountry(code: "${code}", name: "${name}") { code name } }`;

    await fetch(GRAPHQL_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) });
    fetchCountries();
}

async function editCountry() {
    const code = document.getElementById("editCode").value;
    const name = document.getElementById("editName").value;
    const query = `mutation { editCountry(code: "${code}", name: "${name}") { code name } }`;

    await fetch(GRAPHQL_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) });
    fetchCountries();
}

async function deleteCountry() {
    const code = document.getElementById("deleteCode").value;
    const query = `mutation { deleteCountry(code: "${code}") }`;

    await fetch(GRAPHQL_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) });
    fetchCountries();
}

window.onload = fetchCountries;

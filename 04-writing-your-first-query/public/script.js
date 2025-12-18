const GRAPHQL_URL = "http://localhost:4000/graphql";

async function runQuery(query, variables = {}) {
    try {
        const response = await fetch(GRAPHQL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables })
        });

        const result = await response.json();

        if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            return null;
        }

        return result.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

async function demonstrateQueries() {
    const output = document.getElementById("output");

    // 1. Simple Query
    const continents = await runQuery(`
        query {
            continents {
                code
                name
            }
        }
    `);
    output.innerHTML += "<h3>1. Simple Query - Continents</h3><pre>" + JSON.stringify(continents, null, 2) + "</pre>";

    // 2. Query with Arguments
    const continent = await runQuery(`
        query {
            continent(code: "AF") {
                name
                code
            }
        }
    `);
    output.innerHTML += "<h3>2. Query with Arguments - Africa</h3><pre>" + JSON.stringify(continent, null, 2) + "</pre>";

    // 3. Nested Query
    const nested = await runQuery(`
        query {
            continents {
                name
                countries {
                    name
                    capital
                }
            }
        }
    `);
    output.innerHTML += "<h3>3. Nested Query - Continents with Countries</h3><pre>" + JSON.stringify(nested, null, 2) + "</pre>";

    // 4. Query with Variables
    const variableQuery = await runQuery(`
        query GetContinent($code: String!) {
            continent(code: $code) {
                name
                countries {
                    name
                }
            }
        }
    `, { code: "EU" });
    output.innerHTML += "<h3>4. Query with Variables - Europe</h3><pre>" + JSON.stringify(variableQuery, null, 2) + "</pre>";
}

window.onload = demonstrateQueries;
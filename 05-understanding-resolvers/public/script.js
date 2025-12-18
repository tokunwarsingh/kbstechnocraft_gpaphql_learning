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

async function demonstrateResolvers() {
    const output = document.getElementById("output");

    // 1. Root Query Resolver
    const continents = await runQuery(`
        query {
            continents {
                name
                countryCount
            }
        }
    `);
    output.innerHTML += "<h3>1. Root Query Resolver - Continents with Country Count</h3><pre>" + JSON.stringify(continents, null, 2) + "</pre>";

    // 2. Query with Arguments
    const continent = await runQuery(`
        query {
            continent(code: "AF") {
                name
                countryCount
            }
        }
    `);
    output.innerHTML += "<h3>2. Query with Arguments - Africa</h3><pre>" + JSON.stringify(continent, null, 2) + "</pre>";

    // 3. Field Resolver
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
    output.innerHTML += "<h3>3. Field Resolver - Nested Countries</h3><pre>" + JSON.stringify(nested, null, 2) + "</pre>";

    // 4. Computed Field
    const computed = await runQuery(`
        query {
            country(code: "US") {
                name
                stateCount
            }
        }
    `);
    output.innerHTML += "<h3>4. Computed Field - State Count</h3><pre>" + JSON.stringify(computed, null, 2) + "</pre>";

    // 5. Reverse Relationship
    const reverse = await runQuery(`
        query {
            country(code: "US") {
                name
                continent {
                    name
                }
            }
        }
    `);
    output.innerHTML += "<h3>5. Reverse Relationship - Country's Continent</h3><pre>" + JSON.stringify(reverse, null, 2) + "</pre>";

    // 6. Search Resolver
    const search = await runQuery(`
        query {
            searchCountries(search: "india") {
                name
                capital
            }
        }
    `);
    output.innerHTML += "<h3>6. Search Resolver - Countries with 'India'</h3><pre>" + JSON.stringify(search, null, 2) + "</pre>";
}

window.onload = demonstrateResolvers;
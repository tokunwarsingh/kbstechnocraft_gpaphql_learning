const GRAPHQL_URL = "http://localhost:4000/graphql";

async function runMutation(mutation, variables = {}) {
    try {
        const response = await fetch(GRAPHQL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: mutation, variables })
        });

        const result = await response.json();

        if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            return { error: result.errors[0].message };
        }

        return result.data;
    } catch (error) {
        console.error("Error:", error);
        return { error: error.message };
    }
}

async function demonstrateMutations() {
    const output = document.getElementById("output");

    // 1. Create Country
    const createResult = await runMutation(`
        mutation {
            createCountry(input: {
                code: "XX"
                name: "Test Country"
                capital: "Test City"
                currency: "TST"
                phone: "999"
            }) {
                code
                name
                capital
            }
        }
    `);
    output.innerHTML += "<h3>1. Create Country</h3><pre>" + JSON.stringify(createResult, null, 2) + "</pre>";

    // 2. Update Country
    const updateResult = await runMutation(`
        mutation {
            updateCountry(code: "XX", input: {
                name: "Updated Test Country"
                capital: "Updated City"
            }) {
                code
                name
                capital
            }
        }
    `);
    output.innerHTML += "<h3>2. Update Country</h3><pre>" + JSON.stringify(updateResult, null, 2) + "</pre>";

    // 3. Create Continent
    const createContinentResult = await runMutation(`
        mutation {
            createContinent(input: {
                code: "YY"
                name: "Test Continent"
            }) {
                code
                name
            }
        }
    `);
    output.innerHTML += "<h3>3. Create Continent</h3><pre>" + JSON.stringify(createContinentResult, null, 2) + "</pre>";

    // 4. Create State
    const createStateResult = await runMutation(`
        mutation {
            createState(input: {
                code: "TS"
                name: "Test State"
                countryCode: "US"
            }) {
                code
                name
            }
        }
    `);
    output.innerHTML += "<h3>4. Create State</h3><pre>" + JSON.stringify(createStateResult, null, 2) + "</pre>";

    // 5. Query to verify changes
    const queryResult = await runMutation(`
        query {
            countries(code: "XX") {
                name
                capital
            }
            continents(code: "YY") {
                name
            }
            states(countryCode: "US") {
                code
                name
            }
        }
    `, {}, "query");
    output.innerHTML += "<h3>5. Query to Verify Changes</h3><pre>" + JSON.stringify(queryResult, null, 2) + "</pre>";

    // 6. Delete operations
    const deleteStateResult = await runMutation(`
        mutation {
            deleteState(countryCode: "US", code: "TS")
        }
    `);
    output.innerHTML += "<h3>6. Delete State</h3><pre>" + JSON.stringify(deleteStateResult, null, 2) + "</pre>";

    const deleteCountryResult = await runMutation(`
        mutation {
            deleteCountry(code: "XX")
        }
    `);
    output.innerHTML += "<h3>7. Delete Country</h3><pre>" + JSON.stringify(deleteCountryResult, null, 2) + "</pre>";
}

window.onload = demonstrateMutations;
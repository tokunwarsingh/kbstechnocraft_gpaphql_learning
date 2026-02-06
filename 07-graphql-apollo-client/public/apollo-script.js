const { ApolloClient, InMemoryCache, HttpLink, gql } = Apollo;

const GRAPHQL_URL = "http://localhost:4000/graphql";

const client = new ApolloClient({
    link: new HttpLink({ uri: GRAPHQL_URL }),
    cache: new InMemoryCache()
});

async function runMutation(mutation, variables = {}) {
    try {
        const response = await client.mutate({
            mutation: gql`${mutation}`,
            variables
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return { error: error.message };
    }
}

async function demonstrateMutations() {
    const output = document.getElementById("output");

    // 1. Create Country
    const createResult = await runMutation(`
        mutation CreateCountry($input: CountryInput!) {
            createCountry(input: $input) {
                code
                name
                capital
            }
        }
    `, {
        input: {
            code: "XX",
            name: "Test Country",
            capital: "Test City",
            currency: "TST",
            phone: "999"
        }
    });
    output.innerHTML += "<h3>1. Create Country</h3><pre>" + JSON.stringify(createResult, null, 2) + "</pre>";

    // 2. Update Country
    const updateResult = await runMutation(`
        mutation UpdateCountry($code: String!, $input: CountryUpdateInput!) {
            updateCountry(code: $code, input: $input) {
                code
                name
                capital
            }
        }
    `, {
        code: "XX",
        input: {
            name: "Updated Test Country",
            capital: "Updated City"
        }
    });
    output.innerHTML += "<h3>2. Update Country</h3><pre>" + JSON.stringify(updateResult, null, 2) + "</pre>";

    // 3. Create Continent
    const createContinentResult = await runMutation(`
        mutation CreateContinent($input: ContinentInput!) {
            createContinent(input: $input) {
                code
                name
            }
        }
    `, {
        input: {
            code: "YY",
            name: "Test Continent"
        }
    });
    output.innerHTML += "<h3>3. Create Continent</h3><pre>" + JSON.stringify(createContinentResult, null, 2) + "</pre>";

    // 4. Create State
    const createStateResult = await runMutation(`
        mutation CreateState($input: StateInput!) {
            createState(input: $input) {
                code
                name
            }
        }
    `, {
        input: {
            code: "TS",
            name: "Test State",
            countryCode: "US"
        }
    });
    output.innerHTML += "<h3>4. Create State</h3><pre>" + JSON.stringify(createStateResult, null, 2) + "</pre>";

    // 5. Query to verify changes
    const queryResult = await client.query({
        query: gql`
            query GetDetails($countryCode: String, $continentCode: String, $stateCountryCode: String) {
                countries(code: $countryCode) {
                    name
                    capital
                }
                continents(code: $continentCode) {
                    name
                }
                states(countryCode: $stateCountryCode) {
                    code
                    name
                }
            }
        `,
        variables: {
            countryCode: "XX",
            continentCode: "YY",
            stateCountryCode: "US"
        }
    }).then(result => result.data);
    output.innerHTML += "<h3>5. Query to Verify Changes</h3><pre>" + JSON.stringify(queryResult, null, 2) + "</pre>";

    // 6. Delete operations
    const deleteStateResult = await runMutation(`
        mutation DeleteState($countryCode: String!, $code: String!) {
            deleteState(countryCode: $countryCode, code: $code)
        }
    `, {
        countryCode: "US",
        code: "TS"
    });
    output.innerHTML += "<h3>6. Delete State</h3><pre>" + JSON.stringify(deleteStateResult, null, 2) + "</pre>";

    const deleteCountryResult = await runMutation(`
        mutation DeleteCountry($code: String!) {
            deleteCountry(code: $code)
        }
    `, {
        code: "XX"
    });
    output.innerHTML += "<h3>7. Delete Country</h3><pre>" + JSON.stringify(deleteCountryResult, null, 2) + "</pre>";
}

window.onload = demonstrateMutations;

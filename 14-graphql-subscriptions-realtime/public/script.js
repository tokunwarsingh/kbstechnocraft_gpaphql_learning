const GRAPHQL_URL = "http://localhost:4000/graphql";
const WS_URL = "ws://localhost:4000/graphql"; // WebSocket endpoint for Subscriptions

// --- ORIGINAL CODE (PRESERVED) ---
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

// --- NEW SUBSCRIPTION LOGIC ---
function setupSubscription() {
    const logContainer = document.getElementById("subscription-log");
    const statusLabel = document.getElementById("sub-status");
    
    try {
        const socket = new WebSocket(WS_URL, 'graphql-ws');

        socket.onopen = () => {
            statusLabel.innerText = "Status: Connected. Listening for real-time events...";
            statusLabel.style.color = "#2ecc71";
            
            // Initialize the connection
            socket.send(JSON.stringify({ type: 'connection_init', payload: {} }));

            // Start the subscription for countryAdded
            socket.send(JSON.stringify({
                id: '1',
                type: 'start',
                payload: {
                    query: `subscription { countryAdded { name code capital } }`
                }
            }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'data') {
                const country = data.payload.data.countryAdded;
                const entry = document.createElement("div");
                entry.className = "sub-log-item";
                entry.innerHTML = `
                    <strong>🔔 Subscription Event: New Country Added!</strong><br>
                    Name: ${country.name} (${country.code})<br>
                    Capital: ${country.capital}
                `;
                logContainer.prepend(entry);
            }
        };

        socket.onerror = () => {
            statusLabel.innerText = "Status: Connection Error (WebSocket failed)";
            statusLabel.style.color = "#e74c3c";
        };
    } catch (e) {
        console.error("WebSocket setup failed:", e);
    }
}

// --- ORIGINAL DEMO FUNCTION (PRESERVED) ---
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
            country(code: "XX") {
                name
                capital
            }
            continent(code: "YY") {
                name
            }
            states(countryCode: "US") {
                code
                name
            }
        }
    `);
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

// Start both existing demo and new subscription listener
window.onload = () => {
    setupSubscription();
    demonstrateMutations();
};
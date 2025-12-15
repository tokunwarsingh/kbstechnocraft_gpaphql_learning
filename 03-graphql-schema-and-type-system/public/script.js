const GRAPHQL_URL = "http://localhost:4000/graphql";

async function fetchCountries() {
    const query = `
        {
            countries {
                code
                name
                capital
                currency
                phone
            }
        }
    `;

    try {
        const response = await fetch(GRAPHQL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        });

        const result = await response.json();

        if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            document.getElementById("countries").innerHTML = "<p>Error fetching data</p>";
            return;
        }

        const countries = result.data.countries;
        const container = document.getElementById("countries");

        container.innerHTML = countries.map(country => `
            <div class="country">
                <h3>${country.name} (${country.code})</h3>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Currency:</strong> ${country.currency}</p>
                <p><strong>Phone Code:</strong> +${country.phone}</p>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("countries").innerHTML = "<p>Error loading countries</p>";
    }
}

window.onload = fetchCountries;
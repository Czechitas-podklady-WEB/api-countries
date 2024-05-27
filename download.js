const resp = await fetch("https://raw.githubusercontent.com/apilayer/restcountries/master/src/main/resources/countriesV2.json");
if (!resp.ok) {
    throw new Error("Failed to download countries list.");
}
let countries = await resp.json();
countries = countries.map(({ alpha2Code, alpha3Code, area, callingCodes, capital, name, population, region, topLevelDomain }) => ({ alpha2Code, alpha3Code, area, callingCodes, capital, name, population, region, topLevelDomain }));
//const json = JSON.stringify(countries);
const json = JSON.stringify(countries, null, 2);
Deno.writeTextFile("countries.json", json);
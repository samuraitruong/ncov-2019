const axios = require("axios");
const sheetURL = "https://docs.google.com/spreadsheets/d/1yZv9w9zRKwrGTaR-YzmAqMefw4wMlaXocejdxZaTs6w/htmlview?usp=sharing"
const cheerio = require("cheerio");
const fs = require("fs")
const path = require("path")
const handlebars = require("handlebars")

function getSheets($) {
    const sheets = $("#sheet-menu li")
        .toArray()
        .map(x => {
            const sheet = {
                name: $(x).text(),
                id: $(x).attr("id").replace("sheet-button-", "")
            }
            return sheet;
        });
    writeFile(sheets, "sheets");
    return sheets;
}
async function writeFile(data, name) {
    const fileName = path.join(__dirname, "data", name + ".json");
    console.log("wring file", fileName);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
}
function readSheet($, sheet) {

    const rows = $(`#${sheet.id} tbody tr`).toArray();
    const list = rows.map((r) => {
        const td = $("td", r).toArray();
        return {
            "state_provine": $(td[0]).text(),
            "country_region": $(td[1]).text(),
            "last_update": $(td[2]).text(),
            "confirmed": toNumber($(td[3]).text()),
            "deaths": toNumber($(td[4]).text()),
            "recovered": toNumber($(td[5]).text())
        }
    });
    list.splice(0, 1)
    writeFile(list, sheet.name);
    writeFile(list, sheet.id);
    return list;
}
function toNumber(str) {
    if (!str) return 0;
    return parseInt(str, 10)
}
function updateIndex(data) {
    const sourceIndex = fs.readFileSync("README.md", "utf8");
    const template = handlebars.compile(sourceIndex);
    const html = template({ data })
    fs.writeFileSync("index.md", html);
}
async function main() {
    const res = await axios.get(sheetURL);
    const $ = cheerio.load(res.data);
    const sheets = getSheets($);
    const dict = {};
    sheets.forEach((sheet) => {
        dict[sheet.name] = readSheet($, sheet);
    });
    writeFile(dict, "data_dictionary");
    writeFile(dict[sheets[0].name], "latest")
    updateIndex(sheets);
}

main();

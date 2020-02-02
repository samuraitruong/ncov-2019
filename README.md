# ncov-2019
A json format of official publish data related to Ncov - 2019 virus in China

Official data: [https://docs.google.com/spreadsheets/d/1yZv9w9zRKwrGTaR-YzmAqMefw4wMlaXocejdxZaTs6w/htmlview?usp=sharing]https://docs.google.com/spreadsheets/d/1yZv9w9zRKwrGTaR-YzmAqMefw4wMlaXocejdxZaTs6w/htmlview?usp=sharing)



## Data list
- list all sheet [data/sheets.json](https://samuraitruong.github.io/ncov-2019/data/sheets.json)
- all sheet data in dictionary format [/data_dictionary.json](https://samuraitruong.github.io/ncov-2019/data/data_dictionary.json)
- Lasted sheet [/data/latest.json](https://samuraitruong.github.io/ncov-2019/data/latest.json)
{{#each data}}
- [{{name}}](https://samuraitruong.github.io/ncov-2019/data/{{name}}.json)
{{/each}}

## Notice
- This data is 1 to 1 transform from speadsheet, no modification
- Data maybe out of sync for 10 mins as sync job run every 10 mins
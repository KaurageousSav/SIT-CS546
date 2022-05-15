const people = require("./people");
const stocks = require("./stocks")

async function main(){
    try{
        const getPersonById = await people.getPersonById('7989fa5e-8f3f-458d-ad58-23c8d9ef5a10');
        console.log(getPersonById);
    }catch(e){
        console.log (e);
    }
}


async function main(){
    try{
        const sameStreet = await people.sameStreet("Sutherland", "Point");
        console.log(sameStreet);
    }catch(e){
        console.log (e);
    }
}

async function main(){
    try{
        const manipulateSsn = await people.manipulateSsn();
        console.log(manipulateSsn)
    }catch(e)
    {
        console.log(e)
    }
}

async function main(){
    try{
        const sameBirthday =  await people.sameBirthday("9", '25')
        console.log(sameBirthday)
    }catch(e)
    {
        console.log(e)
    }
}

async function main(){
    try{
        const listShareholders = await stocks.listShareholders()
        console.log(listShareholders)
    }catch(e)
    {
        console.log(e)
    }
}

async function main(){
    try{
        const topShareholder = await stocks.topShareholder('Aeglea BioTherapeutics, Inc.')
        console.log(topShareholder)

    }catch(e)
    {
        console.log(e)
    }
}

async function main(){
    try{
        const listStocks = await stocks.listStocks("Grenville", "Pawelke")
        console.log(listStocks)
    }catch(e)
    {
        console.log(e)
    }
}

async function main(){
    try{
        const getStockById = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0")
        console.log(getStockById)
    }catch(e)
    {
        console.log(e)
    }
}
//call main
main();
const restaurants = require('./restaurants');
const connection = require('./mongoConnection');

const main = async () =>{
    const create = await restaurants.create("Olive Bistro", "Los Angeles, California", "999-129-2599", "http://www.olivebistro.com", "$", ["Italian", 'Indian' , 'Norwayerian'], 5, {dineIn: true, takeOut: false, delivery: false})
    console.log('New Restaurant has been added')
    console.log(create)

    const letsdance = await restaurants.create("OldMcDonald", "Los Angeles, California", "999-129-2299", "http://www.oldMcdonald.com", "$$", ["Italian" ], 5, {dineIn: true, takeOut: false, delivery: false})
    console.log('New Restaurant has been added')
    console.log(letsdance)

    const allResturants = await restaurants.getAll();
    console.log(allResturants)

    const newR = await restaurants.create("Wok On", "Brooklyn, New York", "748-129-2299", "http://www.WokOnAsia.com", "$$$", ["Asian" ], 5, {dineIn: true, takeOut: false, delivery: false})
    console.log('New Restaurant has been added')
    console.log(newR)

    const renamedRest = await restaurants.rename(create._id, "http://www.theolivebistro.com"); 
    console.log(renamedRest);

    const removeRest = await restaurants.remove(letsdance._id)
    console.log(removeRest)

    const alldelights = await restaurants.getAll();
    console.log(alldelights)

    try{
      const letstrynew = await restaurants.create("Punjabi Affair", 'Brooklyn, New York', "748-129-2299", "//www.PunjabiAffair.com", "$", ['Indian' ], 5 , {dineIn: true, takeOut: false, delivery: false})
    console.log('New Restaurant has been added')
    console.log(letstrynew)
    }catch(e)
    {
      console.log (e);
    }


    try{
    const sample = await restaurants.remove("615dc018440e44259cbf4443")
    console.log(sample)
    }catch(e)
    {
      console.log (e);
    }

    try{
    const renamedelight = await restaurants.rename("615dc018440e44259cbf4444" , "http://www.theolivebistro.com"); 
    console.log(renamedelight);
    }catch(e)
    {
      console.log(e)
    }

    try{
      const renamespicy = await restaurants.rename("615f482b099a423ac0352fe7", "h://www.dcvkauCVa.com"); 
    console.log(renamespicy);
    }catch(e)
    {
      console.log(e)
    }

    try{
      const trysample = await restaurants.get('615dc018440e44259cbf4333')
      console.log(trysample);

    }catch(e)
    {
      console.log(e)
    }
    
    
    const db = await connection();
    await db.serverConfig.close();
}

main().catch((error) => {
    console.log(error);
  });
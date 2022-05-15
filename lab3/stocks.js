const axios = require('axios');

async function people(){
const {data} =await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
return data}

async function stock(){
const {data} =await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
return data}


const listShareholders = async function listShareholders()
{
    
    var p = await people() 
    var s= await stock()
    var l=0

    //console.log(s)
    for(var x in s){
    
        var y = s[x].shareholders
        for(var i=0; i<y.length; i++)
        {
            //console.log(y[i])
            for(var a in p)
            {
                if(p[a].id==y[i].userId)
                {
                    l=1

                    delete s[x].shareholders[i].userId
                    s[x].shareholders[i]['first_name']=p[a].first_name
                    s[x].shareholders[i]['last_name']= p[a].last_name
                }
                
            }
            if(l==0)
            {
                throw 'Error'
            }
            l=0
        }
        //console.log(s[x])
        //break

    }
    return s


}

const topShareholder = async function topShareholder(stockName)
{

    var p = await people()
    var s= await stock()
    if(typeof stockName!='string' || stockName==null)
    {
        throw 'ERROR-'+stockName+' is not valid stockname'
    }
    //console.log(stockName.trim())
    if(stockName.trim()=='')
    {
        throw 'ERROR- Empty spaces are not valid stockname'
    }
    var count=0
    for(var x in s){
        //console.log(s[x])
        //console.log(stockName)
        if(s[x].stock_name==stockName)
        {
            var y=s[x].shareholders
            if(y.length<1)
            {
                throw stockName+' currently has no shareholders'
            }
            var m=0
            var name=''
            //console.log(y)
            //break
            for(var i=0; i<y.length; i++)
            {
                //console.log(y[i].number_of_shares)
                //break
                if(y[i].number_of_shares>m)
                {
                    m=y[i].number_of_shares
                    name = y[i].userId
                }
            
            }
            //console.log(name)
            //console.log(p[0].id)
            for(var a in p)
             {
                 //console.log(p[a].Id)
                if(p[a].id==name)
                {
                    return 'with '+ m.toString()+' shares in '+stockName+', '+p[a].first_name+' '+p[a].last_name+' is the top shareholder'
                    //console.log(p[a].id)
                }
                count = count + 1
             }
            
        }
        //else{
        //  throw 'StockName cant be found'}

    }
    if(count==0)
    {
        throw 'ERROR-StockName '+stockName+' cant be found'
    }

}

const listStocks = async function listStocks(fname, lname)
{
    var p = await people()
    var s= await stock()
    if(typeof fname!='string' || fname==null || typeof lname!='string' || lname==null)
       {
           throw 'ERROR- Not valid firstname or lastname'
       }
       //console.log(stockName.trim())
       if(fname.trim()=='' || lname.trim()=='')
       {
           throw 'ERROR- Empty spaces is not valid name'
       }
       flag=0
       var i
       obj = []
       for(var a in p)
       {
           if(fname==p[a].first_name && lname==p[a].last_name)
           {
               i=p[a].id
               flag=1
           }
           
       }
       if(flag==0)
       {
           throw 'ERROR- Person not present in stock.json'
       }
       //console.log(i)
       for(var x in s){
           var y = s[x].shareholders
           //console.log(y)
           
           for(var k=0; k<y.length; k++)
           {
               
               if(i==y[k].userId)
               {
                   obj[obj.length]= {stock_Name: s[x].stock_name, number_of_shares: y[k].number_of_shares}
               }
           }

       }
       if(obj.length<1)
       {
           throw 'Error'
       }
       else{
           return obj
       }

}
const getStockById = async function getStockById(id)
{
    var s= await stock()
    if(typeof id!='string' || id.length==0)  
    {
        throw 'ERROR- ID is not proper or is of 0 length'
    }
    if(id==null){
        throw 'ERROR- provided ID is null'
    }
    if(id.trim()=='')
    {
        throw 'ERROR- provided ID is empty space'
    }

    var flag=0
    for(var x in s)
    {
        if(s[x].id==id)
        {
            flag=1
            return s[x]

        }
    }
    if(flag==0)
    {
        throw 'ERROR-'+id+' Stock not found'
    }

}

module.exports = {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById,
  }
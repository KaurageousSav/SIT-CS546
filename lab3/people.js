const axios = require('axios');


async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
}

const getPersonById = async function getPersonById(id)
{  
  if(id == null || id.length==0)
  {
    throw 'ID is not valid'
  }
  if(typeof id != 'string')
  {
    throw 'ID is not valid'
  }
  if(id.trim()=='')
  {
    throw 'Error, empty spaces are provided in ID'
  }
  //var result = await getPeople()
  //console.log(result)

  var p= await getPeople()
    var person=0
    var x
    var flag=0
    for(var x in p){
      if(p[x].id == id)
     {
       flag =1 
       return p[x]
       
      }
    }

    if(flag==0)
    {
      throw 'Person not found'

    }
    

}
const sameStreet = async function sameStreet(streetName, streetSuffix)
{
  if(streetName==null || streetName.length==0)
  {
    throw 'ERROR-StreetName is null or not provided'
  }
  if(typeof streetName!='string')
  {
    throw 'ERROR-StreetName not appropriate'
  }
  if(streetName.trim()=='')
  {
    throw 'ERROR-Empty spaces are provided in StreetName'
  }
  if(streetSuffix==null || streetSuffix.length==0)
  {
    throw 'ERROR-StreetSuffix is null or not provided'
  }
  if(typeof streetSuffix!='string')
  {
    throw 'ERROR-StreetSuffix not appropriate'
  }
  if(streetSuffix.trim()=='')
  {
    throw 'ERROR- Empty spaces are provided in StreetSuffix'
  }
  var result= await getPeople()
  var people = []
  var count = 0
  //if('aaa'=='AAA'.toLowerCase())
  //{
  //  console.log('Hi')
  //}

  for(var x in result)
  {
    //console.log(result[x].address.home.street_name.toLowerCase())
    //console.log(streetName.toLowerCase())
    //if(result[x].address.home.street_name.toLowerCase()==streetName.toLowerCase()){
    //  console.log('qbvalisf')}
    if((result[x].address.home.street_name.toLowerCase() == streetName.toLowerCase() && result[x].address.home.street_suffix.toLowerCase() == streetSuffix.toLowerCase()) || (result[x].address.work.street_suffix.toLowerCase() == streetSuffix.toLowerCase() && result[x].address.work.street_name.toLowerCase() ==streetName.toLowerCase()))
    {
      //console.log('vqboyub')
      people[people.length] = result[x]
    
      count = count+1
    }
  }
  if(count>=2)
  {
    return people
  }
  else{
    throw 'Error since there are not at least two people that live or work on '+streetName+' '+streetSuffix
  }

}
//
const manipulateSsn = async function manipulateSsn()
{
  var highest = {}
  var arr1= []
  var arr2= []
  var arr3= []
  var arr4 = []
  var lowest = {}
  var obj = {}
  var sum=0
  var result= await getPeople()
  var test = result.slice()
  //console.log(test)
  //console.log
  for(var x in test){
    //var res = test.ssn
    //console.log(typeof test[x])
    arr1[arr1.length] = x
    //console.log(test[x].ssn)
    arr2[arr2.length] = parseInt(test[x].ssn.split("-").sort().join("").split("").sort().join(""))
    //test[x].ssn= parseInt(test[x].ssn.split("-").sort().join("").split("").sort().join(""))
    //console.log(typeof test[x].ssn)
    arr3[arr3.length]= test[x].first_name
    arr4[arr4.length]= test[x].last_name
    //test.ssn = res.split("-").sort().join("")
    sum = sum + parseInt(test[x].ssn.split("-").sort().join("").split("").sort().join(""))
    }
    //console.log(Math.max(...arr2))
    //console.log(Math.min(...arr2))
  



    highest['firstName']= arr3[arr2.indexOf(Math.max(...arr2))]
    highest['lastName']= arr4[arr2.indexOf(Math.max(...arr2))]

    lowest['firstName']= arr3[arr2.indexOf(Math.min(...arr2))]
    lowest['lastName']= arr4[arr2.indexOf(Math.min(...arr2))]

    
    //var result1= {highest: highest, lowest:lowest}
    //console.log(Math.floor(sum/arr2.length))
    obj['highest']=highest
    obj['lowest']=lowest
    obj['average']=Math.floor(sum/arr2.length)
    //console.log(obj)


  return obj



}


const sameBirthday = async function sameBirthday(month, day)
{
  if(month==null)
  {
    throw 'ERROR- Month provided is NULL'
  }
  
  if(day==null)
  {
    throw 'ERROR- day is null or not provided'
  }
  if(month.trim()=='')
  {
    throw 'ERROR- blank space is provided in month'
  }
  if(day.trim()=='')
  {
    throw 'ERROR- blank space is provided in day'
  }
  
  if(typeof month=='string')
  {
    month=parseInt(month)
  }
  if(typeof month!='number')   
  {
    throw 'ERROR- month is not a number'
  }
  
  if(typeof day=='string')
  {
    day=parseInt(day)
  }
  if(typeof day!='number')
  {
    throw 'ERROR- day is not a number'
  }
  
  if(month<1 || month>12)
  {
    throw 'ERROR- month is not valid'
  }
  if(month==1 || month==3 || month==5 || month==8 || month==7 || month==10 || month==12)
  {

    if(day<1 || day>31)
    {
      throw 'ERROR- There are not ' +day+'days in '+month+'th month'
    }
  }
  if(month==4 || month==6 || month==9 || month==11)
  {

    if(day<1 || day>30)
    {
      throw 'ERROR- day is not in 1-30 days for '+month+'th month'
    }
  }
  if(month==2)
  {
    if(day<1 || day>28)
    {
      throw 'ERROR- day given is not in 1-28days of February'
    }
  }
  
  var result= await getPeople()
  var test = result.slice()
  var y
  var arr1=[]
  for(var x in test){
    y= test[x].date_of_birth.split('/')
    //console.log(y)
    if(y[0]==month && y[1]==day)
    {
      //console.log(y)


      arr1[arr1.length]= test[x].first_name + ' ' + test[x].last_name

    }

  }
  //console.log(arr1)
  return arr1

}

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday
}
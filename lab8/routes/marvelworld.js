const express = require('express');
const axios = require('axios');
const router = express.Router();

const md5 = require('blueimp-md5');
const publickey = '71a177c6f50337f8e0933f7b3deb1fac';
const privatekey = '5a76761507dc954f2434064763560a0c1de6ac16';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;


router.get('/', async(req,res) => {
    const test = await axios.get(url);
    res.render('marvelworld/new', {test: test})
})


router.post('/search', async(req,res)=>{
    const test = req.body;
    const url = baseUrl + '?nameStartsWith=' + test.title + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    // if(test.trim==''){
    //     errormessage = {
    //         className : "Black space provided",
    //         message : `Black space was provided`,
    //         hasErrors :   "Error",
    //         title: 'Characters Found'
    //     }
    //     res.status(400).render("marvelworld/error",errormessage);
    // }
    if(!test.title || test.title==null)
    {
        errormessage = {
            className : "No search item supplied",
            message : "No serch item was supplied, directly Search button was clicked.",
            hasErrors :   "Error",
            title: "Error"
        }
        res.status(400).render("marvelworld/error",errormessage);
    }
    
    try{
        const charactertobeFound = await axios.get(url);
        
        res.render("marvelworld/search" ,{ charactertobeFound: charactertobeFound.data.data.results, test});
    }

catch(e){
    res.status(400).render("No search item was supplied, directly submit button was clicked or blank spaces were provided.");
    }
    
});


router.get('/characters/:id', async (req, res) => {    
    const url = baseUrl + '/' + req.params.id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    
    try {
    const test = await axios.get(url);
    let counter = 0
    var arr = []
    var obj = {}; 
    
    const demo = test.data.data.results[0].thumbnail.path + '.' + test.data.data.results[0].thumbnail.extension;
    const ListofComics = test.data.data.results;
    for(var test1 of ListofComics) {
        obj = test1.comics.items;
        counter = 1
    }
    arr = obj
    if(counter == 0)
    {
        errormessage = {
            className : "No id matches the supplied ID",
            message : `No id matches the supplied ID ${test.id}, please provide a different ID.`,
            hasErrors :   "Error",
            title: 'Character Finder'
        }
        res.status(404).render("marvelworld/error",errormessage);
        //return;
    }
    res.render('marvelworld/characterbyid', { test: test.data.data.results[0], demo, arr});
    } catch (errormessage) {
        errormessage = {
            className : "No id matches the supplied ID",
            message : `No id matches the supplied ID, please provide a different ID.`,
            hasErrors :   "Error"
        }
        res.status(404).render('marvelworld/error',errormessage)
    }
});


module.exports = router;
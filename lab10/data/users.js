const mongoCollections = require('../config/mongoCollections');
const bcrypt = require("bcryptjs");
const users = mongoCollections.users;
const saltRounds = 16;

module.exports = {
    async createUser(username, password)
    {
        try{
        if (username == null || username.length == 0) throw 'You must provide Username'
        if (typeof username != 'string') throw 'Username is not String'
        if (username.trim() == '') throw 'Blank spaces are provided in Username'
        if(username.length < 4) throw 'Userame should have atleast 4 characters'
        //if (username.substring(username.length - 4) <= 0) throw 'Userame should have atleast 4 characters'
        var regex = /^[A-Za-z0-9]+$/;
        if(!username.match(regex)) throw 'Username should be alphanumeric'
        for(var i=0; i< username.length; i++)
        {
            if (username[i] == ' ') throw 'Empty spaces are provided in Username'
        }

        if(!password) throw 'Password is not provided'
        if(typeof password!= 'string') throw 'Password must be string'
        if(password.length< 6) throw 'Password should be minimum 6 characters long'
        if(password.trim()== '') throw 'Blank spaces are provided in Password'
        for(var i=0; i< password.length; i++)
        {
            if (password[i] == ' ') throw 'Empty spaces are provided in Password'
        }

        const hash = await bcrypt.hash(password, saltRounds);

        const usersCollection = await users();

        var nameLowerCase = username.toLowerCase();

        const userExists = await usersCollection.findOne({ username: username});
        //console.log(userExists, 'userExists')
        if (userExists) throw "There is already a user with that username";


        let newUser = {
            username: nameLowerCase,
            password: hash
        };

        //var nameLowerCase = username.toLowerCase();
        //console.log(newUser, 'newUser')
        
        const insertInfo = await usersCollection.insertOne(newUser);

        if (insertInfo.insertedCount === 0) throw 'Could not add User';
        let demo = insertInfo.insertedId
        return {userInserted: true}

        }catch(error){
            console.log(error)
        }


    },


    async checkUser(username, password){
        console.log(username, 'username')
        console.log(password, 'password')
        try{
        if (username == null || username.length == 0) throw 'You must provide Username'
        if (typeof username != 'string') throw 'Username is not String'
        if(username.length < 4) throw 'Username should be atleast 4 characters long'
        //if (username.substring(username.length - 4) == 0) throw 'Username should have atleast 4 characters'
        if (username.trim() == '') throw 'Blank spaces are provided in Username'

        if(!password) throw 'Password is not provided'
        if(typeof password!= 'string') throw 'Password must be string'
        if(password.length< 6) throw 'Password should be minimum 6 characters long'
        if(password.trim()== '') throw 'Blank spaces are provided in Password'
        for(var i=0; i< password.length; i++)
        {
            if (password[i] == ' ') throw 'Empty spaces are provided in Password'
        }
    }catch(error)
    {
        console.log(error)
    }

        const usersCollection = await users();

        var nameLowerCase = username.toLowerCase();
        //console.log(nameLowerCase)

        const userData = await usersCollection.findOne({ username: nameLowerCase});
        //console.log(userData)

        try{
            if (!userData) throw "Either the username or password is invalid";
        }catch(error)
        {
            console.log(error)
        }

        let compareToMatch = await bcrypt.compare(password, userData.password);
        console.log(compareToMatch)
        if(compareToMatch)
        {
            return {authenticated: true}
        }
        else{
            throw "Either the username or password is invalid"
        }


    }
}

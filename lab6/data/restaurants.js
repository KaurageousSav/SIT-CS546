const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;

module.exports = {

    async create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (name == null || name.length == 0) throw 'You must provide name for your restaurant'
        if (typeof name != 'string') throw 'Name is not String'
        if (name.trim() == '') throw 'Blank spaces are provided in Name'

        if (location == null || location.length == 0) throw 'You must provide location for your restaurant'
        if (typeof location != 'string') throw 'Location is not string'
        if (location.trim() == '') throw 'Blank spaces are provided in location'

        if (phoneNumber == null || phoneNumber.length == 0) throw 'You must provide Phone number of the restaurant'
        if (typeof phoneNumber != 'string') throw 'Phone number is not of String type'
        if (phoneNumber.trim() == '') throw 'Blank spaces are provided in Phone Number'
        var regex = /^[1-9]\d{2}-\d{3}-\d{4}/;
        if ((!phoneNumber.match(regex))) throw 'Not valid format of Phone number, format should be xxx-xxx-xxxx'

        if (website == null || website.length == 0) throw 'You must provde a website'
        if (typeof website != 'string') throw 'Website type is not String'
        if (website.trim() == '') throw 'Blank spaces are provided in website'
        if (website.substring(0, 11) != 'http://www.') throw 'Website format is not correct, Website should begin with http://www.'
        if (website.substring(website.length - 4, website.length) != '.com') throw 'Website format is not correct, Website should end with .com'
        if (website.length - 15 < 5) throw 'Not proper format of website, Website should have minimum 5 characters between HTTP and .COM'

        if (priceRange == null || priceRange.length == 0) throw 'You must provde a Price range'
        if (typeof priceRange != 'string') throw 'Price type is not String'
        if (priceRange.trim() == '') throw 'Blank spaces are provided in Price range'
        if (priceRange < '$' || priceRange > '$$$$') throw 'Price is not in valid range'

        if (cuisines == null || !Array.isArray(cuisines)) throw 'You must provide an array of Cuisines'
        if (cuisines.length == 0) throw 'You must provide atleast one Cuisine'
        for (var i = 0; i < cuisines.length; i++) {
            if (typeof cuisines[i] != 'string') throw 'Cuisine element is not String'
            if (cuisines[i].trim() == '') throw 'Empty space is provided in Cuisine type'
        }

        if (serviceOptions == null || serviceOptions.length == 0) throw 'You must provide a Service Option'
        if (typeof serviceOptions != 'object') throw 'Service Option is not Object type'
        if (typeof serviceOptions.dineIn != 'boolean') throw 'Dine in value is not appropriate'
        if (typeof serviceOptions.takeOut != 'boolean') throw 'TakeOut value is not appropriate'
        if (typeof serviceOptions.delivery != 'boolean') throw 'Delivery in value is not appropriate'

        const RestCollection = await restaurants();

        let newRest = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: 0,
            serviceOptions: serviceOptions,
            reviews: []
        };

        const insertInfo = await RestCollection.insertOne(newRest);

        if (insertInfo.insertedCount === 0) throw 'Could not add Restaurant';
        let demo = insertInfo.insertedId
        let xyz = await this.get(demo.toString());
        return JSON.parse(JSON.stringify(xyz))

    },



    async getAll() {
        const RestCollection = await restaurants();
        const RestList = await RestCollection.find({}).toArray();

        console.log(RestList)
        return JSON.parse(JSON.stringify(RestList));
    },



    async get(id) {
        if (id == null || id.length == 0) throw 'No ID is provided'
        if (typeof id != 'string') throw 'ID is not string'
        if (id.trim() == '') throw 'Blank space is provided in ID'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'

        let x = newObjId.toString();
        let parsedId = ObjectId(id);

        const RestCollection = await restaurants()

        const checkRest = await RestCollection.findOne({ _id: parsedId })
        if (checkRest === null) throw 'No Restaurant is present with that id'
        return JSON.parse(JSON.stringify(checkRest));

    },



    async remove(id) {
        if (typeof id == null || id.length == 0) throw 'No ID is provided'
        if (typeof id != 'string') throw 'ID is not string'
        if (id.trim() == '') throw 'Blank space is provided in ID'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(id);

        const RestCollection = await restaurants();
        const checkRest = await RestCollection.findOne({ _id: parsedId })
        if (checkRest === null) {
            throw `Could not delete Restaurant with id of ${id} as it is not present`;
        }
        const obj = JSON.parse(JSON.stringify(checkRest))
        const n = obj.name


        const deletionInfo = await RestCollection.deleteOne({ _id: parsedId });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete Restaurant with id of ${id} as it is not present`;
        }
        return { deleted: true };

    },



    async update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (typeof id == null || id.length == 0) throw 'No ID is provided'
        if (typeof id != 'string') throw 'ID is not string'
        if (id.trim() == '') throw 'Blank space is provided in ID'


        if (name == null || name.length == 0) throw 'You must provide name for your restaurant'
        if (typeof name != 'string') throw 'Name is not String'
        if (name.trim() == '') throw 'Blank spaces are provided in Name'


        if (location == null || location.length == 0) throw 'You must provide location for your restaurant'
        if (typeof location != 'string') throw 'Location is not string'
        if (location.trim() == '') throw 'Blank spaces are provided in location'


        if (phoneNumber == null || phoneNumber.length == 0) throw 'You must provide Phone number of the restaurant'
        if (typeof phoneNumber != 'string') throw 'Phone number is not of String type'
        if (phoneNumber.trim() == '') throw 'Blank spaces are provided in Phone Number'
        var regex = /^[1-9]\d{2}-\d{3}-\d{4}/;
        if ((!phoneNumber.match(regex))) throw 'Not valid format of Phone number, format should be xxx-xxx-xxxx'


        if (website == null || website.length == 0) throw 'You must provde a website'
        if (typeof website != 'string') throw 'Website type is not String'
        if (website.trim() == '') throw 'Blank spaces are provided in website'
        if (website.substring(0, 11) != 'http://www.') throw 'Website format is not correct, Website should begin with http://www.'
        if (website.substring(website.length - 4, website.length) != '.com') throw 'Website format is not correct, Website should end with .com'
        if (website.length - 15 < 5) throw 'Not proper format of website, Website should have minimum 5 characters between HTTP and .COM'


        if (priceRange == null || priceRange.length == 0) throw 'You must provde a Price range'
        if (typeof priceRange != 'string') throw 'Price type is not String'
        if (priceRange.trim() == '') throw 'Blank spaces are provided in Price range'
        if (priceRange < '$' || priceRange > '$$$$') throw 'Price is not in valid range'


        if (cuisines == null || !Array.isArray(cuisines)) throw 'You must provide an array of Cuisines'
        if (cuisines.length == 0) throw 'You must provide atleast one Cuisine'
        for (var i = 0; i < cuisines.length; i++) {
            if (typeof cuisines[i] != 'string') throw 'Cuisine element is not String'
            if (cuisines[i].trim() == '') throw 'Empty space is provided in Cuisine type'
        }


        if (serviceOptions == null || serviceOptions.length == 0) throw 'You must provide a Service Option'
        if (typeof serviceOptions != 'object') throw 'Service Option is not Object type'
        if (typeof serviceOptions.dineIn != 'boolean') throw 'Dine in value is not appropriate'
        if (typeof serviceOptions.takeOut != 'boolean') throw 'TakeOut value is not appropriate'
        if (typeof serviceOptions.delivery != 'boolean') throw 'Delivery in value is not appropriate'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(id);

        const RestCollection = await restaurants();
        const checkRest = await RestCollection.findOne({ _id: parsedId })
        if (checkRest === null) {
            throw `Could not delete Restaurant with id of ${id} as it is not present`;
        }
        let updatedRestData = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            serviceOptions: serviceOptions
        };

        //console.log(JSON.stringify(updatedRestData) +'For updated Rest Data')  
        const updateInfo = await RestCollection.updateOne(
            { _id: parsedId },
            { $set: updatedRestData }
        );
        //console.log(updateInfo+'For update info')

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

        const getid = await this.get(parsedId.toString());

        return JSON.parse(JSON.stringify(getid))
    }
}
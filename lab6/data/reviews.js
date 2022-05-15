const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
//let {ObjectId} = require('mongodb').ObjectId;

const exportedMethods = {
    async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
      if(restaurantId==null || restaurantId.length==0) throw 'No restaurant ID has been provided'
      if(typeof restaurantId!='string') throw 'Restaurant ID is not provided'
      if(restaurantId.trim()=='') throw 'Restaurant Id provided contains empty spaces'
      
        if(title==null || title.length==0) throw 'You must provide Title of the Review'
        if (typeof title !== 'string') throw 'Not valid type of title provided';
        if(title.trim()=='') throw 'Blank spaces are provided in Title'

        if(reviewer==null || reviewer.length==0) throw 'You must provide a valid Reviewer'
        if (typeof reviewer !== 'string') throw 'Not valid typeof Reviewer provided';
        if(reviewer.trim()=='') throw 'Blank spaces are provided in Reviewer'

        if(rating==null || rating.length==0) throw 'You must provide a valid Rating'
        if(typeof rating!='number') throw 'Rating should be a number' 
        if(rating<1 || rating>5) throw 'Rating should be between 1-5'

        if(dateOfReview==null || dateOfReview.length==0) throw 'You must provide a valid Date of review'
        if(typeof dateOfReview!='string') throw 'Date of review is not string'
        var regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if((!dateOfReview.match(regex))) throw 'Not valid format of date, format should be MM/DD/YYYY'
        //Check for date format
        let date = new Date()
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let fullDate = `${month}/${day}/${year}`;
        //console.log(fullDate);
        if(!dateOfReview.match(fullDate)) throw 'you cant leave a review yesterday or before, and you cant leave a review in the future'

        if(review==null || review.length==0) throw 'You must provide a valid Reviewer'
        if (typeof review !== 'string') throw 'Not valid type of Reviewer provided';
        if(review.trim()=='') throw 'Blank spaces are provided in Reviewer'
    
        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if(!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(restaurantId);

        const Rest = await restaurants();       
        const checkRest = await Rest.findOne({_id: parsedId})
        if (checkRest === null) throw 'No Restaurant is present with that id'
        
        let newReview = {
          _id: ObjectId(),
          title: title,
          reviewer: reviewer,
          rating: rating,
          dateOfReview: dateOfReview,
          review: review,
        }
        //console.log(newReview,'newReview')
        var demo
        var sum = 0
        const OverallRatingNew = await Rest.updateOne({_id: parsedId},{$addToSet:{reviews: newReview} })

        const reviewofOneRest = await Rest.findOne({ _id: parsedId });

        if(reviewofOneRest){
          var ReviewList = reviewofOneRest.reviews
          for(var i =0; i<ReviewList.length; i++)
          {
            demo = ReviewList[i].rating
            sum = sum + demo
            
          }
          //console.log(sum)
          //var newSum = sum + rating
          var newLength = ReviewList.length 
          //console.log(newLength,'newLength')
          var newOverallRating = Number((sum/newLength).toFixed(2));

          //console.log(newOverallRating,"newOverallRating")
        }
        else{
          var newOverallRating = rating
        }
    
        await Rest.updateOne({_id: parsedId},{$set: {overallRating: newOverallRating}});
    
        return JSON.parse(JSON.stringify(newReview))
      },



      async getAll(restaurantId){
        if(restaurantId==null || restaurantId.length==0) throw 'You must provide a restaurant ID '
        if (typeof restaurantId !== 'string') throw 'Not valid type of RestaurantId provided';
        if(restaurantId.trim()=='') throw 'Blank spaces are provided in RestaurantId'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if(!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(restaurantId);

        const Rest = await restaurants();
        const AllReviewsofaRest = await Rest.findOne({ _id: parsedId});
        if(AllReviewsofaRest==null) throw 'Restaurant ID is not present'

        var ReviewList = AllReviewsofaRest.reviews
        if (!ReviewList) throw 'Reviews of this restaurant not found';
        return JSON.parse(JSON.stringify(ReviewList));

      },


      async get(reviewId) {
        if(reviewId==null || reviewId.length==0) throw 'Reviw ID is null'
        if(typeof reviewId!='string') throw 'Review ID is not of proper type'
        if(reviewId.trim()=='') throw 'Blank spaces are provided in Review Id'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if(!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(reviewId);

        const Rest = await restaurants();
        
        const reviewofOneRest = await Rest.findOne({ "reviews._id": parsedId });
        if(!reviewofOneRest) throw 'No review found with the supplied review ID'

        let demo = {}
        let count = 0;
        for( var i=0; i<reviewofOneRest.reviews.length; i++)
        {
          if(reviewofOneRest.reviews[i]._id == reviewId)
          {
            demo = reviewofOneRest.reviews[i]
            count = 1
            break
          }
        }
    
        if (count ==0) throw 'Review not found';
        return demo;
      },


      async remove(reviewId){
        if(reviewId==null || reviewId.length==0) throw 'Reviw ID is null'
        if(typeof reviewId!='string') throw 'Review ID is not of proper type'
        if(reviewId.trim()=='') throw 'Blank spaces are provided in Review Id'

        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();
        if(!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
        let x = newObjId.toString();
        let parsedId = ObjectId(reviewId);

        const Rest = await restaurants();
        const reviewofOneRest = await Rest.findOne({ "reviews._id": parsedId });
        if (!reviewofOneRest) throw 'No Review is present with that id'

        const DeleteReview = await Rest.updateOne(
          {_id: reviewofOneRest._id},
          {$pull:{reviews:{_id:parsedId}}}
        );

        if (!DeleteReview.matchedCount && !DeleteReview.modifiedCount) throw 'Update failed';

        let newOverallRating = 0
        if(reviewofOneRest!=null && reviewofOneRest.reviews!= null && reviewofOneRest.reviews.length>0)
        {
          var sum = 0;
          var demo
          var ReviewList = reviewofOneRest.reviews
          //console.log(ReviewList.length)
          for(var i =0; i<ReviewList.length; i++)
          {
            if(ReviewList[i]._id != reviewId){
              //console.log(ReviewList[i]._id, 'ReviewList[i]._id')
            demo = ReviewList[i].rating
            //console.log(demo,'demo')
            sum = sum + demo
            }
          }
          //console.log(sum,'sum')
          newOverallRating = Number((sum/(ReviewList.length-1)).toFixed(2));
          //console.log(newOverallRating)
        }
        else{
          //console.log('Hi checking for 0')
          newOverallRating = 0
        }
    
        await Rest.updateOne({_id: reviewofOneRest._id},{$set: {overallRating: newOverallRating}});
        return {deleted: true};
      }
  
}

module.exports = exportedMethods;
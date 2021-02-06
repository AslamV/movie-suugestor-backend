import mongoose from 'mongoose';

const favMovieSchema = mongoose.Schema({
   movieName:{
       type:String,
       required:true
   },
   movieUrl:{
       type:String,
       required:true
   },
   movieId:{
    type:Number,
},
   movieGenre:{
       type:[String]
   },
   creator:String,
   createdAt:{
    type:Date,
    default: new Date()
}
});

const FavMovie = mongoose.model('FavMovie', favMovieSchema);
export default FavMovie;
import FavMovie from "../models/FavroutieMovie.js";



export const getFavmovi = async (req,res) => {
    try{
        const favMovie = await FavMovie.find();

        res.status(200).json(favMovie)
    }
    catch (errors){
        res.status(501).json({message:errors.message})
    }
}

export const createFavmovi = async (req,res) => {
    const movie = req.body;
    const newMovie = new FavMovie({...movie,creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newMovie.save();

        res.status(200).json(newMovie)
        console.log(newMovie)
        console.log('message created')
    }
    catch (error){
        res.status(501).json({message:errors.message})
    }
}

export const deleteFavmovi = async (req,res) => {
    const {id} = req.params;
    await FavMovie.findByIdAndDelete(id);
    console.log('Movie removed')

}
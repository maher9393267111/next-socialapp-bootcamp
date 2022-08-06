import mongoose from 'mongoose';

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    mongoose.connect(
        'mongodb+srv://maher:maher9326@cluster0.nf63j.mongodb.net/bootcamp?retryWrites=true&w=majority'
       // process.env.DB_URI
        ,
         {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       // useUnifiedTopology: true,
      //  useFindAndModify: false,
    //    useCreateIndex: true
    }).then(() => {
        console.log('MongoDB connected');
    })

}

export default dbConnect
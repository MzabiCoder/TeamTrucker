const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MongoURI')

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology',true )

const DBconnection = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        })
        console.log("MongoDB Connected...")
    } catch (err) {
        console.log(err.message)
        // Exit Process with failue
        process.exit(1)
    }
   

}

module.exports=DBconnection
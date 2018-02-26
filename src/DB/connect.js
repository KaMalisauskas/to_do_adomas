import mongoose from "mongoose"
import config from "./config.json"

const connect = mongoose.connect(`mongodb://${config.mongo.username}:${config.mongo.pass}@ds249718.mlab.com:49718/to_do_limsa`,
    (err) => {
    if(err) return err
    console.log("<<<<Connected to Mongo")
    })

export default connect
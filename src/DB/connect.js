import mongoose from "mongoose"
import config from "./config.json"
const user = process.env.username || config.mongo.username
const pass = process.env.pass || config.mongo.pass
const connect = mongoose.connect(`mongodb://${user}:${pass}@ds249718.mlab.com:49718/to_do_limsa`,
    (err) => {
    if(err) return err
    console.log("<<<<Connected to Mongo")
    })


export default connect
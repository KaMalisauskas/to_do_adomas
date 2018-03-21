import mongoose, {Schema} from "mongoose"


const EventModel =  new Schema({
    userId: {
        type: String
    },
    event: {
        type: Schema.Types.Mixed
    },
})

export default mongoose.model("EventModel", EventModel)
import mongoose, {Schema} from "mongoose"
import UniqueValidator from "mongoose-unique-validator"

const ToDoModel = new Schema({
    userId: {
        type: String
    },
    name: {
        type: String,
        trim: true
    },
    tasks: {
            type: [Schema.Types.Mixed],
    },

})
ToDoModel.plugin(UniqueValidator, {
    message: `{Value} already exist`
})
ToDoModel.methods = {
    toJson() {
        return {
            _id: this.id,
            name: this.name,
            tasks: this.tasks
        }
    }
}
export default mongoose.model("todomodel", ToDoModel)
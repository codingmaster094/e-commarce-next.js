import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    resetToken: {
        type: String,
    },
    resetTokenUsed: {
        type: Boolean,
        default: false,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, { timestamps: true })

UserSchema.methods.gettoken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.SCRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
}

const User_model = mongoose.model('users', UserSchema)
export default User_model




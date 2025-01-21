import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    cartData: { type: Object, default: {} },
    role: { type: String, enum: ["admin", "user"], default: "user" }, // Thêm role
}, { minimize:false })

const userModel = mongoose.models.user || mongoose.model("user", useSchema)

export default userModel;
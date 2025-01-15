const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            // required: [true, "Email is required"],
            unique: [true, "Email already taken"]
        },
        imageURL: {
            type: String
        },
        projects: [
            {
                type: Schema.Types.ObjectId,
                ref: "Project"
            }
        ]
    },
    {
        timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;

import User from "../../../models/users.model.js";

const profileGetService = async (req) => {
    const user = await User.findById(req.user.id);

    let userInfo = user.toObject() // Convert user to object
    delete userInfo.password // Hide password before sending response

    return userInfo; // Return response
};

const profilePutService = async (req) => {
    const updates = { // New data from client
        name: req.body.name,
        email: req.body.email
    };

    // Update data
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
        new: true,
        runValidators: true
    })

    let userInfo = user.toObject() // Convert user to object
    delete userInfo.password // Hide password before sending response

    return userInfo; // Return response
};

const profileDeleteService = async (req) => {
    // Delete user
    await User.findByIdAndDelete(req.user.id);
};

export { profileGetService, profilePutService, profileDeleteService }

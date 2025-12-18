import User from "../../../models/users.model.js";


const adminGetService = async (req) => {
    const user = await User.findById(req.user.id); // Check if user exists or not

    // If user does not exist
    if (!user) {
        const error = {
            message: 'User not found',
            status: 404
        }
        throw error;
    }

    // If user exists
    let userInfo = user.toObject() // Convert user to object

    // If user is not admin
    if (!userInfo.isAdmin) {
        const error = {
            message: 'Access denied',
            status: 403
        }
        throw error;
    }

    // If user is admin
    const users = await User.find().select('-password'); 
    //Get all users & remove passwords from all docs before sending response

    return users; // Return response
};

export { adminGetService }


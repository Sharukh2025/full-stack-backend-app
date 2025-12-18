import bcrypt from 'bcryptjs';
import User from '../../models/users.model.js';

const registerService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email }); // Find user by email

  // Check if existing user
  if (existingUser) {
    const error = {
      message: "Email already exists",
      status: 409
    }
    throw error; // Throw err which will reach controller => main error handler middleware
  }

  // If not existing user/new user
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Hash password before inserting into db

  const user = await User.create({  // Insert new doc in db
    name,
    email,
    password: hashedPassword
  });

  const userResponse = user.toObject(); // Convert user to object

  delete userResponse.password; // Remove password before sending response

  return userResponse; // Return response to register controller
};

export { registerService }

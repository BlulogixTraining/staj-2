import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity'; // Assuming you have a User entity
import AppDataSource from '../config/database'; // Assuming you have a data-source file

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Create the DataSource instance
const userRepository = AppDataSource.getRepository(User);

// Function to register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'Please provide all fields' });
    return;
}

  // Check if the user already exists
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
}

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;

    await userRepository.save(newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: { username: newUser.username, email: newUser.email },
    
    });
    return;
} catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
    return;
}
};

// Function to log in a user
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Please provide email and password' });
    return;
  }

  // Find user by email
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  // Compare the password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  res.cookie('token', token, {
  httpOnly: true,
  sameSite: 'lax',  // Use 'strict' for production
  maxAge: 60 * 60 * 1000,
});
res.status(200).json({ message: 'Login successful' });
  return;
};

// Function to check the token
export const checkToken = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    const user = await userRepository.findOne({ where: { id: decoded.userId } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return user information
    res.status(200).json({
      message: 'Token is valid',
      user: { userId: user.id, role: user.role, email: user.email },
    });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'Logout successful' });
};

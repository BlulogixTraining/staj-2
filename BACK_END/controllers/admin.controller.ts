import { Request, Response } from 'express';
import { User, UserRole } from '../entities/user.entity'; // Assuming you have a User entity
import AppDataSource from '../config/database'; // Your data-source configuration
import bcrypt from 'bcrypt';

const userRepository = AppDataSource.getRepository(User);

// Controller method to get a list of all employees (managers and salesmen)
export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    // Query to get all users with the roles 'manager' or 'salesman'
    const employees = await userRepository.find({
      where: [
        { role: UserRole.MANAGER },
        { role: UserRole.SALESMAN }
      ],
      select: ['id', 'username', 'email', 'role'],  // Only select necessary fields
    });

    if (!employees || employees.length === 0) {
      res.status(404).json({ message: 'No employees found' });
      return;
    }

    // Return the list of employees
    res.status(200).json({
      message: 'Employees retrieved successfully',
      employees,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body;
    let newRole : UserRole;
    
    if (role == "manager") {
        newRole = UserRole.MANAGER;
    } else {
        newRole = UserRole.SALESMAN;
    }

    if (!username || !email || !password || !role) {
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
        newUser.role = newRole;

        await userRepository.save(newUser);

        res.status(201).json({
        message: 'User created successfully',
        user: { username: newUser.username, email: newUser.email, role: newUser.role },
        
        });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
        return;
    }
}

import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req: any, res: any) => {
    const { firstName, lastName, email, password } = req.body;
    console.log("test", req.body);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating user' });
    }
};
const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;
    console.log("text", req.body);

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

const userProfile = async (req: any, res: Response) => {
    try {
        console.log(" (decoded as any).id;", req.userId)
        const user = await User.findOne({ where: { id: req.userId } });


        console.log("user Profile::::::::::", user);

        res.status(200).json({
            success: true,
            user,
            message: "User Data Fetch successfully"
        })
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch details"
        })
    }
}

const updateProfile = async (req: any, res: Response) => {
    try {
        const { user } = req;
        const { firstName, lastName, email, dob, gender, phoneNumber } = req.body;
        const fetchUser: any = await User.findByPk(user.id);

        fetchUser.firstName = firstName;
        fetchUser.lastName = lastName;
        fetchUser.email = email;
        fetchUser.dob = dob;
        fetchUser.gender = gender;
        fetchUser.phoneNumber = phoneNumber;

        await fetchUser.save();

        res.status(200).json({
            success: true,
            message: "update value successfull"
        })
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "not updated"
        })
    }
}
export { registerUser, loginUser, userProfile, updateProfile };

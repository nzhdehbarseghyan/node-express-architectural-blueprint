import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../dataAccess/user.repository.js';
import logger from '../config/logging.js';

class AuthService {
    /**
     * Registers a new user with the provided name, password, and email.
     *
     * @param {string} name - The name of the user.
     * @param {string} password - The password of the user.
     * @param {string} email - The email of the user.
     * @returns {Object} An object containing the status and data of the registration process.
     */
    static async registerUser(name, password, email) {
        try {
            const existingUser = await UserRepository.findOne({ email });

            if (existingUser) {
                return {
                    status: 'error',
                    message: 'User already exists'
                };
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await UserRepository.create({
                name,
                password: hashedPassword,
                email
            });

            return { status: 'success', data: { user } };
        } catch (err) {
            logger.error('[Register the User Error] : ', err);
            throw new Error('Error registering user');
        }
    }

    /**
     * Logs in a user with the provided email and password.
     *
     * @param {string} email - The email of the user to log in.
     * @param {string} password - The password of the user to log in.
     * @returns {Object} An object indicating the status of the login attempt.
     */
    static async loginUser(email, password) {
        try {
            const user = await UserRepository.findOne({ email });

            if (!user) {
                return { status: 'error', message: 'User not found' };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return { status: 'error', message: 'Invalid password' };
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return { status: 'success', data: { token } };
        } catch (err) {
            logger.log('[Login Error] :', err);
            throw new Error('Error logging in user');
        }
    }
}

export default AuthService;
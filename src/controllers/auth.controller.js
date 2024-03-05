import AuthService from '../services/auth.service.js';
import logger from '../config/logging.js';

/**
 * Handles user signup
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const signup = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const result = await AuthService.registerUser(name, password, email);

        res.status(200).json(result);
    } catch (err) {
        logger.error('[SignUp Error] : ', err);

        res.status(500).json({message: 'Something went wrong!'});
    }
};

/**
 * Sign in the user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.loginUser(email, password);

        res.status(200).json(result);
    } catch (err) {
        logger.error('[SignIn Error] : ', err);

        res.status(500).json({message: err});
    }
};

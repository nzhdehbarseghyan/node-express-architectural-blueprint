import { User } from '../models/index.js';

class UserRepository {
    /**
     * Find a single user based on the provided query
     * @param {Object} query - The query object to search for the user
     * @returns {Promise} A promise that resolves with the found user
     */
    static async findOne (query) {
        return User.findOne(query, null, { lean: true });
    }

    /**
     * Create a new user.
     *
     * @param {Object} userData - The user data to create.
     * @param {string} userData.name - The name of the user.
     * @param {string} userData.email - The email of the user.
     * @param {string} userData.password - The password of the user.
     * @returns {Promise<Object>} - A promise that resolves with the newly created user.
     */
    static async create (userData) {
        const newUser = new User(userData);

        return newUser.save();
    }
}

export default UserRepository;

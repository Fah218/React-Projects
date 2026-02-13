import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Return login promise
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            await this.logout();
            const session = await this.account.createEmailPasswordSession(email, password);
            // Small delay to ensure localStorage is updated before next request
            // This fixes a common race condition in some environments
            await new Promise(resolve => setTimeout(resolve, 100));
            return session;
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser(retries = 0) {
        try {
            return await this.account.get();
        } catch (error) {
            // If we get a 401/403 and we haven't retried too many times, wait and try again
            // This handles the specialized race condition with local storage persistence on localhost
            if (retries < 3) {
                console.warn(`Appwrite service :: getCurrentUser :: attempt ${retries + 1} failed, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 200 * (retries + 1))); // 200ms, 400ms, 600ms
                return this.getCurrentUser(retries + 1);
            }
            console.error("Appwrite service :: getCurrentUser :: final error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            // Clear any local state if needed (though SDK handles this)
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


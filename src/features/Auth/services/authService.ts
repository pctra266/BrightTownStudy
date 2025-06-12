import api from "../../../api/api";
import { setCookie, getCookie, eraseCookie } from "../../../utils/cookieUtils";
import type { Account, Role, LoginResponse, RegisterResponse, TokenRefreshResponse } from "../types";

export const authService = {
    async login(username: string, password: string, rememberMe: boolean = false): Promise<LoginResponse> {
        try {
            const accountResponse = await api.get('/account');
            const accounts: Account[] = accountResponse.data;

            const account = accounts.find(
                (acc: Account) => acc.username === username && acc.password === password
            );

            if (!account) {
                return {
                    success: false,
                    error: "Invalid username or password"
                };
            }

            const userData = {
                id: account.id,
                username: account.username,
                role: account.role // Use the role ID directly ("1" for admin, "2" for user)
            };

            const token = this.generateToken(userData, rememberMe);
            const refreshToken = this.generateRefreshToken(userData, rememberMe);

            if (rememberMe) {
                setCookie('accessToken', token, 7);
                setCookie('refreshToken', refreshToken, 30);
                setCookie('rememberMe', 'true', 30);
                setCookie('user', JSON.stringify(userData), 7);
            } else {
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshToken);
                setCookie('user', JSON.stringify(userData));
                eraseCookie('rememberMe');
            }

            return {
                success: true,
                user: userData,
                token,
                refreshToken
            };
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                error: "An error occurred during login"
            };
        }
    },

    async register(username: string, password: string): Promise<RegisterResponse> {
        try {
            const accountResponse = await api.get('/account');
            const accounts: Account[] = accountResponse.data;

            const existingAccount = accounts.find(
                (acc: Account) => acc.username === username
            );

            if (existingAccount) {
                return {
                    success: false,
                    message: "Username already exists. Please choose a different username."
                };
            }

            const maxId = accounts.reduce((max, acc) => {
                const currentId = parseInt(acc.id);
                return currentId > max ? currentId : max;
            }, 0);

            const newId = (maxId + 1).toString();

            const newAccount = {
                id: newId,
                username: username,
                password: password,
                role: "2"
            };

            await api.post('/account', newAccount);


            const userData = {
                id: newId,
                username: username,
                role: "2" // Use role ID directly
            };

            const token = this.generateToken(userData);
            const refreshToken = this.generateRefreshToken(userData);

            return {
                success: true,
                message: "Account created successfully!",
                token,
                refreshToken
            };
        } catch (error) {
            console.error("Register error:", error);
            return {
                success: false,
                message: "An error occurred during registration"
            };
        }
    },

    async refreshToken(): Promise<TokenRefreshResponse> {
        try {
            const isRemembered = getCookie('rememberMe') === 'true';
            const refreshToken = getCookie('refreshToken');

            if (!refreshToken) {
                return {
                    success: false,
                    error: "No refresh token available"
                };
            }

            const userData = this.verifyToken(refreshToken);
            if (!userData) {
                return {
                    success: false,
                    error: "Invalid refresh token"
                };
            }

            const newToken = this.generateToken(userData, isRemembered);


            if (isRemembered) {
                setCookie('accessToken', newToken, 7);
            } else {
                setCookie('accessToken', newToken);
            }

            return {
                success: true,
                token: newToken
            };
        } catch (error) {
            console.error("Token refresh error:", error);
            return {
                success: false,
                error: "Failed to refresh token"
            };
        }
    },

    async checkUsernameExists(username: string): Promise<{ exists: boolean }> {
        try {
            const accountResponse = await api.get('/account');
            const accounts: Account[] = accountResponse.data;

            const existingAccount = accounts.find(
                (acc: Account) => acc.username === username
            );

            return {
                exists: !!existingAccount
            };
        } catch (error) {
            console.error("Check username error:", error);
            return {
                exists: false
            };
        }
    },

    async resetPassword(username: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
        try {
            const accountResponse = await api.get('/account');
            const accounts: Account[] = accountResponse.data;

            const account = accounts.find(
                (acc: Account) => acc.username === username
            );

            if (!account) {
                return {
                    success: false,
                    message: "Account does not exist"
                };
            }


            const updatedAccount = {
                ...account,
                password: newPassword
            };

            await api.put(`/account/${account.id}`, updatedAccount);

            return {
                success: true,
                message: "Password changed successfully"
            };
        } catch (error) {
            console.error("Reset password error:", error);
            return {
                success: false,
                message: "An error occurred while changing password"
            };
        }
    },

    generateToken(userData: any, rememberMe: boolean = false): string {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const expiration = rememberMe
            ? Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
            : Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Changed from 1 hour to 24 hours

        const payload = btoa(JSON.stringify({
            ...userData,
            exp: expiration,
            iat: Math.floor(Date.now() / 1000)
        }));
        const signature = btoa('mock-signature');
        return `${header}.${payload}.${signature}`;
    },

    generateRefreshToken(userData: any, rememberMe: boolean = false): string {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const expiration = rememberMe
            ? Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
            : Math.floor(Date.now() / 1000) + (24 * 60 * 60);

        const payload = btoa(JSON.stringify({
            ...userData,
            exp: expiration,
            iat: Math.floor(Date.now() / 1000)
        }));
        const signature = btoa('mock-refresh-signature');
        return `${header}.${payload}.${signature}`;
    },

    verifyToken(token: string): any {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;

            const payload = JSON.parse(atob(parts[1]));


            if (payload.exp < Math.floor(Date.now() / 1000)) {
                return null;
            }

            return payload;
        } catch (error) {
            return null;
        }
    },

    logout(): void {
        eraseCookie('accessToken');
        eraseCookie('refreshToken');
        eraseCookie('user');
        eraseCookie('rememberMe');
    },

    getToken(): string | null {
        return getCookie('accessToken');
    },

    getUser(): any {
        const userCookie = getCookie('user');
        return userCookie ? JSON.parse(userCookie) : null;
    }
};

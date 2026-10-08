import { AuthService } from './auth.service.js';
import { AuthResponse, MessageResponse } from './dto/auth.response.js';
import { RegisterInput } from './dto/register.input.js';
import { LoginInput } from './dto/login.input.js';
import { User } from '../users/user.schema.js';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    register(registerInput: RegisterInput): Promise<AuthResponse>;
    login(loginInput: LoginInput): Promise<AuthResponse>;
    sendOtp(email: string): Promise<MessageResponse>;
    me(user: User): Promise<User>;
}

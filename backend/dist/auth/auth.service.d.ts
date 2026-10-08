import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/user.schema.js';
import { OtpDocument } from './otp.schema.js';
import { RegisterInput } from './dto/register.input.js';
import { LoginInput } from './dto/login.input.js';
import { AuthResponse, MessageResponse } from './dto/auth.response.js';
export declare class AuthService {
    private userModel;
    private otpModel;
    private jwtService;
    private transporter;
    constructor(userModel: Model<UserDocument>, otpModel: Model<OtpDocument>, jwtService: JwtService);
    private generateToken;
    register(registerInput: RegisterInput): Promise<AuthResponse>;
    login(loginInput: LoginInput): Promise<AuthResponse>;
    sendOtp(email: string): Promise<MessageResponse>;
}

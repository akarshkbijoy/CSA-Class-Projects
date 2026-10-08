var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.schema.js';
import { Otp } from './otp.schema.js';
import * as nodemailer from 'nodemailer';
let AuthService = class AuthService {
    userModel;
    otpModel;
    jwtService;
    transporter;
    constructor(userModel, otpModel, jwtService) {
        this.userModel = userModel;
        this.otpModel = otpModel;
        this.jwtService = jwtService;
        this.transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: process.env.BREVO_SMTP_USER || 'your-email@example.com',
                pass: process.env.BREVO_SMTP_PASS || 'your-smtp-password',
            },
        });
    }
    generateToken(user) {
        const payload = { email: user.email, sub: user._id };
        return this.jwtService.sign(payload);
    }
    async register(registerInput) {
        const { name, email, password } = registerInput;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const newUser = new this.userModel({ name, email, password });
        await newUser.save();
        return {
            token: this.generateToken(newUser),
            user: newUser,
        };
    }
    async login(loginInput) {
        const { email, password } = loginInput;
        const user = await this.userModel.findOne({ email });
        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return {
            token: this.generateToken(user),
            user,
        };
    }
    async sendOtp(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.otpModel.findOneAndUpdate({ email }, { otp, createdAt: new Date() }, { upsert: true, new: true });
        const mailOptions = {
            from: 'your-email@example.com',
            to: email,
            subject: 'Your Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. It will expire in 5 minutes.`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return { message: 'OTP sent to your email' };
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send OTP email');
        }
    }
};
AuthService = __decorate([
    Injectable(),
    __param(0, InjectModel(User.name)),
    __param(1, InjectModel(Otp.name)),
    __metadata("design:paramtypes", [Model,
        Model,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map
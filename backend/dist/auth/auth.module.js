var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { JwtStrategy } from './jwt.strategy.js';
import { GqlAuthGuard } from './gql-auth.guard.js';
import { User, UserSchema } from '../users/user.schema.js';
import { Otp, OtpSchema } from './otp.schema.js';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        imports: [
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register({
                secret: process.env.JWT_SECRET || 'super_secret_default_key',
                signOptions: { expiresIn: '7d' },
            }),
            MongooseModule.forFeature([
                { name: User.name, schema: UserSchema },
                { name: Otp.name, schema: OtpSchema },
            ]),
        ],
        providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard],
        exports: [AuthService, JwtModule, PassportModule, GqlAuthGuard],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map
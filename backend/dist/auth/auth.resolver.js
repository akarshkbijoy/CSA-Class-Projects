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
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthResponse, MessageResponse } from './dto/auth.response.js';
import { RegisterInput } from './dto/register.input.js';
import { LoginInput } from './dto/login.input.js';
import { GqlAuthGuard } from './gql-auth.guard.js';
import { User } from '../users/user.schema.js';
import { CurrentUser } from './current-user.decorator.js';
let AuthResolver = class AuthResolver {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerInput) {
        return this.authService.register(registerInput);
    }
    async login(loginInput) {
        return this.authService.login(loginInput);
    }
    async sendOtp(email) {
        return this.authService.sendOtp(email);
    }
    async me(user) {
        return user;
    }
};
__decorate([
    Mutation(() => AuthResponse),
    __param(0, Args('registerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    Mutation(() => AuthResponse),
    __param(0, Args('loginInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    Mutation(() => MessageResponse),
    __param(0, Args('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "sendOtp", null);
__decorate([
    UseGuards(GqlAuthGuard),
    Query(() => User),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
AuthResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [AuthService])
], AuthResolver);
export { AuthResolver };
//# sourceMappingURL=auth.resolver.js.map
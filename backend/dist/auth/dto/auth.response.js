var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/user.schema.js';
let AuthResponse = class AuthResponse {
    token;
    user;
};
__decorate([
    Field(),
    __metadata("design:type", String)
], AuthResponse.prototype, "token", void 0);
__decorate([
    Field(() => User),
    __metadata("design:type", User)
], AuthResponse.prototype, "user", void 0);
AuthResponse = __decorate([
    ObjectType()
], AuthResponse);
export { AuthResponse };
let MessageResponse = class MessageResponse {
    message;
};
__decorate([
    Field(),
    __metadata("design:type", String)
], MessageResponse.prototype, "message", void 0);
MessageResponse = __decorate([
    ObjectType()
], MessageResponse);
export { MessageResponse };
//# sourceMappingURL=auth.response.js.map
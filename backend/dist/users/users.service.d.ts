import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema.js';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<UserDocument | null>;
}

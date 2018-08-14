import { User } from './../../auth/login/user/user';
export class Baby {
    id: number;
    name: string;
    age: number;
    gender: number;
    avatarPath: string;
    status: number;
    primaryUser: User;
}
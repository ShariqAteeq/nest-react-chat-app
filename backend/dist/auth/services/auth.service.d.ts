import { JwtService } from '@nestjs/jwt';
import { UserI } from 'src/models';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJWT(user: UserI): Promise<string>;
}

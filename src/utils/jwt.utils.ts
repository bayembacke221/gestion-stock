import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Utilisateur} from "../models/utilisateur";
dotenv.config();


interface JwtPayload {
    id: number;
    email: string;
    roles: string[];
}


class AuthService {
    private static readonly jwtSecret = process.env.JWT_SIGN_SECRET!;

    public static generateTokenForUser(user: Utilisateur, roles: string[]): string {
        return jwt.sign(
          {
            id: user.id,
            email: user.email,
            roles: roles || [] 
          },
          AuthService.jwtSecret,
          { expiresIn: '48h' }
        );
      }
    



    public static parseAuthorization(authorizationHeader: string | null): string | null {
        if (authorizationHeader == null) {
            return null;
        }

        const tokenRegex = /Bearer (.+)/;
        const match = authorizationHeader.match(tokenRegex);
        return match != null ? match[1] : null;
    }

    public static getUserId(authorization: string | null): { userId: number; roles: string[] } {
        let userId = -1;
        let roles: string[] = [];
        const token = AuthService.parseAuthorization(authorization);
        if (token !== null) {
            try {
                const jwtToken = jwt.verify(token, AuthService.jwtSecret) as JwtPayload;
                if (jwtToken !== null) {
                    userId = jwtToken.id;
                    roles = jwtToken.roles ?? [];
                }
            } catch (err) {
                return { userId, roles };
            }
        }
        return { userId, roles };
    }

}

export default AuthService;
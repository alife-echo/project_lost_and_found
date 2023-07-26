import JWT, { JwtPayload } from 'jsonwebtoken'
import { User } from "../models/User";
export const getUserRef = async (token:string,secretKey:string) => {
    const decodedToken = JWT.verify(token, secretKey as string) as JwtPayload;
    const userRef = await User.findOne({ where: { email: decodedToken.email } });
    return {id : userRef?.id, name:userRef?.name}
}
import {User} from '../actors';
import {Configuration} from '../chook';
import {Token} from '.';

export interface JWTSettings{
	secret: string;
	expiration_hours: number;
}

export const generateToken = ( user: User ): string => {
	let jwt: Token = new Token( user );
	return jwt.get();
};

export const getCookieMaxAge = () => {
	let jwtSettings: JWTSettings = Configuration.get( 'security', 'jwt' );
	return jwtSettings.expiration_hours * 60 * 60 * 1000;
};
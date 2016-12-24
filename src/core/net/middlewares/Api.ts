import {Request, Response, NextFunction} from 'express';

export const api = ( request: Request, response: Response, next: NextFunction ) => {
	response.set({
		"Cache-Control": "no cache, no-store, must-revalidate",
		"Pragma": "no-cache",
		"Expires": 0
	});
	next();
};
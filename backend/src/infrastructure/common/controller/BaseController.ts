
import { Response } from 'express'

export class BaseController {
	constructor() { }


	protected async setCookie(name: string, value: string, response: Response) {
		response.cookie(name, value, {
			// httpOnly: true,
			// secure: true,
			// sameSite: 'strict',
			maxAge: 24 * 60 * 60 * 1000,
		})
	}
}
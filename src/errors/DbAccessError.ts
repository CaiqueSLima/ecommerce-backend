import { CustomError } from "./CustomError"

export class DbAccessError extends CustomError {

    constructor(message: string) {
        super(message, 500)
    }
}
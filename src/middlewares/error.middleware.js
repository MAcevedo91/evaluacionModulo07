import { AppError, InternalServerError } from '../utils/errors.util.js'
import { Logger } from '../utils/logger.js'

const logger = new Logger()

export const errorHandler = (err, req, res, next) => {
    if(!(err instanceof AppError)) {
        err = new InternalServerError(err.message || 'Error inesperado')
    }
    logger.error(err.message)
    res.status(err.statusCode).json({
        message: err.message,
        statusCode: err.statusCode,
        error: err.details
    })
}
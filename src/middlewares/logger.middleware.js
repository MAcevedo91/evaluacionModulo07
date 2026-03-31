import { performance } from 'node:perf_hooks'
import { Logger } from '../utils/logger.js'

const logger = new Logger('HTTP')

export const httpLogger = (req, res, next) => {
    const start = performance.now()
    res.on('finish', () => {
        const duration = `${Math.round(performance.now() - start)}ms`
        const message = `${req.method} ${req.originalUrl} ${res.statusCode} +${duration}`
        if(res.statusCode >= 500) return logger.error(message)
        if(res.statusCode >= 400) return logger.warn(message)
        logger.info(message)
    })
    next()
}
import express, { urlencoded } from "express";
import { env } from '../../config/env.config.js';
import { Logger } from '../../utils/logger.js';
import { httpLogger } from '../../middlewares/logger.middleware.js';
import { DB } from '../../routes/index.js';
import appRouter from '../../routes/index.js';
import { errorHandler } from '../../middlewares/error.middleware.js';

const { server } = env

export class Server {
    static app = express()
    static environment = server.environment
    static port = server.port
    static logger = new Logger('SERVER')

    static async bootstrap(config = {}) {

        server.environment === 'PROD'
            ? this.logger.info('Servidor inicializando en producción')
            : this.logger.info('Servidor inicializando en modo desarrollo')

        this.app.use(express.json())

        if(config.multiFormat) {
            this.logger.info('Iniciando logger de performance')
            this.app.use(urlencoded({ extended: true }))
        }

        if(config.loggerPerformance) {
            this.logger.info('Inicializando looger de performance')
            this.app.use(httpLogger)
        }

        this.app.use('/api/v1', appRouter)

        this.app.use(errorHandler)

        try {
            await DB.init()

            this.app.listen(this.port, () => {
                this.logger.info(`Servidor escuchando en el puerto ${this.port}`)
            })
        } catch (error) {
            this.logger.error(`Error al inicializar el servidor: ${error.message}`, error.message)
            throw new Error('Error al arrancar el servidor')
        }
    }
}
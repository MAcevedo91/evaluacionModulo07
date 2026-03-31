import { Logger } from "sequelize/lib/utils/logger";
import { dbConfig } from "../../config/db.config.js";
import { defineAssociation } from "../../models/association/StudentLab.association.js";
import { initStudent } from "../../models/Student.model.js";
import { initLab } from "../../models/Lab.model.js";

export class DB {

    static logger = new Logger('DATABASE')

    static async init() {
        try {
            this.logger.info('Inicializando base de datos')
            this.logger.debugContext('Comenzando Autenticación en DB')

            await dbConfig.authenticate()
            this.logger.debug('Autenticación exitosa')

            this.initModels(dbConfig)
            this.logger.info('Sincronizando con la base de datos')

            await dbConfig.sync()
            this.logger.info('Sincronización completa')
        } catch (error) {
            this.logger.error('No pudimos conectarnos a la base de datos', error)
            process.exit(1)
        }
    }

    static initModels(config) {
        try {
            this.logger.info('Iniciando modelos')

            this.logger.debug('Iniciando Modelo Student')
            initStudent(config)
            this.logger.debug('Student iniciado con éxito')

            this.logger.debug('Iniciando Modelo Lab')
            initLab(config)
            this.logger.debug('Lab iniciado con éxito')

            this.logger.debug('Iniciando asociaciones')
            defineAssociation()
            this.logger.debug('Asociaciones creadas con éxito')

        } catch (error) {
            this.logger.error(`Error al incializar los modelos: ${error.message}`)
            throw new DatabaseError('Error al inicializar los modelos')
        }
    }
}
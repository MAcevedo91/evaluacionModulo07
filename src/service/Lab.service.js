import { Lab } from "../models/Lab.model.js";
import { Student } from "../models/Student.model.js";
import { LabError, NotFoundError } from "../utils/errors.util.js";
import { Logger } from "../utils/logger.js";


export class LabService {

    static logger = new Logger('LAB_SERVICE')

    static async create(data) {
        try {
            this.logger.info('Inicializando servicio de creación de Lab')

            const lab = await Lab.create(data)
            this.logger.debug('Lab creado con éxito', lab)

            return lab
        } catch (error) {
            this.logger.error(`Error al crear el lab: ${error.message}`)
            throw new LabError('Error al crear el laboratorio')
        }
    }

    static async findAll() {
        try {
            this.logger.info('Iniciando servicio de obtención de laboratorios')

            const labs = await Lab.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            })

            if (!labs || labs.length === 0) {
                this.logger.warn('No se encontraron laboratorios en la base de datos')
                throw new NotFoundError('No se encontraron laboratorios')
            }

            this.logger.info('Laboratorios encontrados con éxito')
            return labs
        } catch (error) {
            this.logger.error(`Error al obtener los laboratorios: ${error.message}`)
            throw new LabError('Error al obtener los laboratorios')
        }
    }

    static async findById(id) {
        try {
            this.logger.info('Iniciando búsqueda de laboratorio por ID')

            const lab = await Lab.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            })

            if (!lab) {
                this.logger.warn(`Laboratorio con id ${id} no encontrado`)
                throw new NotFoundError('No pudimos encontrar el laboratorio', `${id}`)
            }

            this.logger.debug('Laboratorio encontrado con éxito')
            return lab
        } catch (error) {
            this.logger.error(`Error al encontrar el laboratorio con ID: ${id} - ${error.message}`)
            throw new LabError('Error al encontrar el laboratorio')
        }
    }

    static async update(id, newData) {
        try {
            this.logger.info('Iniciando servicio de actualización de Lab')

            const [updatedRows, [labUpdated]] = await Lab.update(newData, {
                where: { id },
                returning: true,
            })

            if (updatedRows === 0) {
                this.logger.warn(`No se encontró el laboratorio con id ${id} para actualizar`)
                throw new NotFoundError(`No se encontró el laboratorio ${id}`)
            }

            this.logger.debug('Laboratorio actualizado con éxito', labUpdated)

            const updatedLab = await Lab.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            })

            return updatedLab
        } catch (error) {
            this.logger.error(`Error al actualizar el laboratorio: ${error.message}`)
            throw new LabError('Error al actualizar el laboratorio')
        }
    }

    static async delete(id) {
        try {
            this.logger.info('Iniciando servicio de eliminación de Lab')
            this.logger.info('Buscando el laboratorio')

            const lab = await Lab.findByPk(id)

            if (!lab) {
                this.logger.error(`No encontramos el laboratorio con ID: ${id}`)
                throw new NotFoundError(`No encontramos el laboratorio con ID: ${id}`)
            }

            this.logger.debug('Laboratorio encontrado con éxito')

            await lab.destroy()

            // Recargamos con paranoid:false para obtener el deletedAt actualizado
            await lab.reload({ paranoid: false })
            this.logger.warn(`Laboratorio con ID: ${id} eliminado lógicamente`)

            return lab
        } catch (error) {
            this.logger.error(`Error al eliminar el laboratorio: ${error.message}`)
            throw new LabError('Error al eliminar el laboratorio')
        }
    }

    static async restore(id) {
        try {
            this.logger.info('Inicializando servicio de restauración de laboratorio por id')
            this.logger.info('Buscando el laboratorio')

            const lab = await Lab.findByPk(id, { paranoid: false })

            if (!lab) {
                this.logger.error(`No encontramos ningún laboratorio con id: ${id}`)
                throw new NotFoundError(`No encontramos ningún laboratorio con id: ${id}`)
            }

            await lab.restore()
            this.logger.info(`Laboratorio con ID: ${id} restaurado con éxito`)

            return lab
        } catch (error) {
            this.logger.error(`Error al restaurar el laboratorio: ${error.message}`)
            throw new LabError('Error al restaurar el laboratorio')
        }
    }

    static async permaDelete(id) {
        try {
            this.logger.info('Inicializando servicio de eliminación permanente de laboratorio por id')
            this.logger.info('Buscando el laboratorio')

            const lab = await Lab.findByPk(id, { paranoid: false })

            if (!lab) {
                this.logger.error(`No encontramos ningún laboratorio con id: ${id}`)
                throw new NotFoundError(`No encontramos ningún laboratorio con id: ${id}`)
            }

            this.logger.debug('Laboratorio encontrado y listo para eliminar permanentemente')

            await lab.destroy({ force: true })
            this.logger.warn(`Laboratorio con ID: ${id} eliminado permanentemente`)

            return { message: `Laboratorio con ID ${id} eliminado permanentemente` }
        } catch (error) {
            this.logger.error(`Error al eliminar permanentemente el laboratorio: ${error.message}`)
            throw new LabError('Error al eliminar permanentemente el laboratorio')
        }
    }

    static async assignStudents(labId, studentIds) {
        try {
            this.logger.info(`Asignando estudiantes al laboratorio ${labId}`)

            this.logger.info('Buscando laboratorio')
            const lab = await Lab.findByPk(labId)
            if (!lab) {
                this.logger.error('Laboratorio no encontrado')
                throw new LabError('Laboratorio no encontrado')
            }
            this.logger.debug('Laboratorio encontrado con éxito')

            this.logger.info('Verificando estudiantes')
            const students = await Student.findAll({
                where: { id: studentIds }
            })

            if (students.length !== studentIds.length) {
                this.logger.error('Algunos estudiantes no fueron encontrados')
                throw new LabError('Algunos estudiantes no fueron encontrados')
            }
            this.logger.debug('Estudiantes verificados con éxito')

            this.logger.info('Asignando estudiantes al laboratorio')
            await lab.setStudents(studentIds)

            const labWithStudents = await Lab.findByPk(labId, {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                include: [
                    {
                        model: Student,
                        as: 'students',
                        attributes: ['id', 'name', 'email', 'level']
                    }
                ]
            })

            return labWithStudents
        } catch (error) {
            this.logger.error(`Error al asignar estudiantes al laboratorio: ${error.message}`)
            throw new LabError('Error al asignar estudiantes al laboratorio')
        }
    }
}

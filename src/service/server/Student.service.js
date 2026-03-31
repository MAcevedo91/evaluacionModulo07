import { Student } from "../../models/Student.model";
import { NotFoundError, StudentError } from "../../utils/errors.util.js";
import { Logger } from "../../utils/logger.js";


export class StudentService {

    static logger = new Logger('STUDENT_SERVICE')

    static async create(data)  {
        try {
            this.logger.info('Inicializando servicio de creación de Student')

            const student = await Student.create(data);
            this.logger.debug('Student creado con éxito', student)
            return student
        } catch (error) {
            this.logger.error(`Error al crear nuevo student: ${error.message}`);
            throw new StudentError('Error al crear el estudiante');
        }
    }

    static async findAll() {
        try {
            this.logger.info('Iniciando servicio de obtención de estudiantes');
            const student = await Student.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            })
    
            if (!student || student.length === 0) {
                this.logger.warn('No se encontraron estudiantes en la base de datos')
                throw new NotFoundError('No se encontraron estudiantes')
            }
    
            this.logger.info('Estudiantes encontrados con éxito')
            return student
        
            
        } catch (error) {
            this.logger.error(`Error al encontrar los estudiantes: ${error.massage}`);
            throw new StudentError('Error al encontrar los estudiantes')
        }
    }

    static async findById(id) {
        try {
            this.logger.info('Iniciando busqueda de estudiante por ID')
            const student = await Student.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            });

            if(!student) {
                this.logger.warn(`Estudiante con id ${id} no encontrado`)
                throw new NotFoundError('No pudimos encontrar al estudiante', `${id}`)
            }

            this.logger.debug('Estudiante encontrado con éxito')
            return student
        } catch (error) {
            this.logger.error(`Error al encontrar al estudiante con ID: ${id} - ${error.massage}`);
            throw new StudentError('Error al encontrar al estudiante')
        }

    }

    static async update(id, newData) {
        try {
            this.logger.info('Iniciando servicio de actualización de Estudiante')
            const [ updateRows, [ studentUpdated ] ] = await Student.update(newData, {
                where: { id },
                returning: true,
            })

            if(updateRows === 0) {
                throw new NotFoundError(`No se encontró al estudiante ${ id }`)
            }

            this.logger.debug('Estudiante actualizado con éxito', studentUpdated)

            const updatedStudent = await Student.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
                }
            });

            return updatedStudent
        } catch (error) {
            this.logger.error('Error al intentar actualizar al estudiante')
            throw new StudentError('Error al actualizar al estudiante')
        }
    }

    static async delete(id) {
        try {
            this.logger.info('Inicio servicio eliminación de estudiante')
            this.logger.info('Buscando al estudiante')
            
            const student = await Student.findByPk(id)
    
            if(!student){
                this.logger.error(`No enconstramos al estudiante con ID: ${ id } - ${error.massage}`)
                throw new NotFoundError(`No enconstramos al estudiante con ID: ${ id }`)
            }
    
            this.logger.debug('Estudiante encontrado con éxito')
    
            await student.destroy();
            
        } catch (error) {
            this.logger.error("Error al intentar eliminar al estudiante");
            throw new StudentError("Error al eliminar al estudiante");
        }
    }

        static async restore(id) {
            try {
                this.logger.info('Inicializando servicio de restauración de estudiante por id')
                this.logger.info('Buscando al estudiante')

                const student = await Student.findByPk(id, { paranoid: false })

                if(!student) {
                    this.logger.error(`No encontramos ningún estudiante con id: ${id} - ${error.message}`)
                    throw new NotFoundError(`No encontramos ningún estudiante con id: ${id}`)
                }
                this.logger.debug('Estudiante restaurado');

                await student.restore()
                this.logger.info('Estudiante eliminado con éxito')
            } catch (error) {
                this.logger.error("Error al intentar eliminar al estudiante");
                throw new StudentError("Error al eliminar al estudiante");
            }
    }

        static async permaDelete(id) {
        try {
            this.logger.info('Inicializando servicio de eliminación de estudiante por id')
            this.logger.info('Buscando al estudiante')
            const student = await Student.findByPk(id)

            if(!student) {
                this.logger.error(`No encontramos ningún estudiante con id: ${id} - ${error.message}`)
                throw new NotFoundError(`No encontramos ningún estudiante con id: ${id}`)
            }
            this.logger.debug('estudiante encontrado y listo para eliminar')

            await student.destroy({ force: true })
            this.logger.info('Estudiante eliminado con éxito')
        } catch (error) {
            this.logger.error("Error al intentar eliminar al estudiante");
            throw new StudentError("Error al eliminar al estudiante");
        }
    }

}
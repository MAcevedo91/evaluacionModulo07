import { Model, DataTypes } from 'sequelize';


export class Student extends Model{}

export const initStudent = (dbonfig) => {
    Student.init(

        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'El nombre del estudiante no puede estár vacío'},
                    len: {
                        args: [2, 50],
                        msg: 'El nombre debe tener entre 2 a 50 carácteres'
                    },
                    is: {
                        args: /^[a-zA-ZñÑÁÉÍÓÚáéíóú\s]+$/,
                        msg: 'El nombre solo puede contener caracter del abecesario español'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: { msg: 'El correo electornico ingresado ya esta en uso'},
                validate: {
                    notEmpty: { msg: 'El correo electronico no puede ser un campo vacio'},
                    // isEmail: validación nativa de Sequelize que comprueba formato de email
                    // (verifica que tenga "@" y un dominio válido)
                    isEmail: { msg: 'El correo electronico ingresado no es valido'}
                }
            },
            level: {
                type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
                allowNull: false,
                defaultValue: 'beginner',
                validate: {
                    isIn: {
                        args: [['beginner', 'intermediate', 'advanced']],
                        msg: 'El nivel debe ser: beginner, intermediate o advanced'
                    }
                }
            }
        },
        {
            sequelize: dbonfig,
            modelName: 'Student',
            tableName: 'students',
            timestamps: true,
            paranoid: true
        }
    )
}

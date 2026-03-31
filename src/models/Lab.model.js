import { Model, DataTypes } from 'sequelize';


export class Lab extends Model {}

export const initLab = (dbonfig) => {
    Lab.init(

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
                    notEmpty: { msg: 'El nombre del laboratorio no puede estar vacío' },
                    len: {
                        args: [3, 100],
                        msg: 'El nombre del laboratorio debe tener entre 3 y 100 caracteres'
                    }
                }
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'La descripción del laboratorio no puede estar vacía' },
                    len: {
                        args: [10, 500],
                        msg: 'La descripción debe tener entre 10 y 500 caracteres'
                    }
                }
            },
            difficulty: {
                type: DataTypes.ENUM('easy', 'medium', 'hard'),
                allowNull: false,
                defaultValue: 'easy',
                validate: {
                    isIn: {
                        args: [['easy', 'medium', 'hard']],
                        msg: 'La dificultad debe ser: easy, medium o hard'
                    }
                }
            }
        },
        {
            sequelize: dbonfig,
            modelName: 'Lab',
            tableName: 'labs',
            timestamps: true,
            paranoid: true
        }
    )
}

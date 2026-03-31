import { Student } from '../Student.model.js';
import { Lab } from '../Lab.model.js';

export const defineAssociation = () => {

    Student.belongsToMany(Lab, {
        through: 'student_labs',
        foreignKey: 'student_id',
        otherKey: 'lab_id',
        as: 'labs',
        timestamps: true
    });
    
    Lab.belongsToMany(Student, {
        through: 'student_labs',
        foreignKey: 'lab_id',
        otherKey: 'student_id',
        as: 'students',
        timestamps: true
    });
}



import { StudentService } from "../service/server/Student.service.js";

export class StudentController {
    
    static async createStudent(req, res, next) {
        try {
            const data = await StudentService.createStudent(req.body);
            res.status(201).json({
                message: "Student created successfully",
                satusCode: 201,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllStudents(req, res, next) {
        try {
            const data = await StudentService.getAllStudents();
            res.status(200).json({
                message: "Students retrieved successfully",
                satusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async findById(req, res, next) {
        try {
            const data = await StudentService.findById(req.params.id);
            res.status(200).json({
                message: "Student retrieved successfully",
                satusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateStudent(req, res, next) {
        try {
            const data = await StudentService.update(req.params.id, req.body);
            res.status(200).json({
                message: "Student updated successfully",
                satusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteStudent(req, res, next) {
        try {
            const data = await StudentService.delete(req.params.id);
            res.status(200).json({
                message: "Student deleted successfully",
                satusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async restoreStudent(req, res, next) {
        try {
            const data = await StudentService.restore(req.params.id);
            res.status(200).json({
                message: "Student restored successfully",
                satusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async forceDeleteStudent(req, res, next) {
        try {
            const data = await StudentService.permaDelete(req.params.id);
            res.status(200).json({
                message: "Student permanently deleted successfully",
                satusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }
}
import { LabService } from "../service/server/Lab.service.js";

export class LabController {

    static async createLab(req, res, next) {
        try {
            const data = await LabService.create(req.body);
            res.status(201).json({
                message: "Lab created successfully",
                statusCode: 201,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllLabs(req, res, next) {
        try {
            const data = await LabService.findAll();
            res.status(200).json({
                message: "Labs retrieved successfully",
                statusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async findById(req, res, next) {
        try {
            const data = await LabService.findById(req.params.id);
            res.status(200).json({
                message: "Lab retrieved successfully",
                statusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateLab(req, res, next) {
        try {
            const data = await LabService.update(req.params.id, req.body);
            res.status(200).json({
                message: "Lab updated successfully",
                statusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteLab(req, res, next) {
        try {
            const data = await LabService.delete(req.params.id);
            res.status(200).json({
                message: "Lab deleted successfully",
                statusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async restoreLab(req, res, next) {
        try {
            const data = await LabService.restore(req.params.id);
            res.status(200).json({
                message: "Lab restored successfully",
                statusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async forceDeleteLab(req, res, next) {
        try {
            const data = await LabService.permaDelete(req.params.id);
            res.status(200).json({
                message: "Lab permanently deleted successfully",
                statusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async assignStudents(req, res, next) {
        try {
            const data = await LabService.assignStudents(req.params.id, req.body.studentIds);
            res.status(200).json({
                message: "Students assigned to lab successfully",
                statusCode: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    }
}

export class AppError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

// 400 Bad Request
export class ValidatorError extends AppError {
    constructor(message, details) {
        super(message || 'Error de Validación', 400, details);
    }
}

// 404 Not Found
export class NotFoundError extends AppError {
    constructor(message, details) {
        super(message || 'No encontrado', 404, details);
    }
}

// 500 — errores de entidades específicas
export class StudentError extends AppError {
    constructor(message, details, statusCode) {
        super(message || 'Error en Student', statusCode || 500, details);
    }
}

// 500 — errores de entidades específicas
export class LabError extends AppError {
    constructor(message, details, statusCode) {
        super(message || 'Error en Lab', statusCode || 500, details);
    }
}

// 500 — errores de base de datos
export class DBError extends AppError {
    constructor(message, details) {
        super(message || 'Error de BD', 500, details);
    }
}

// 500 — errores inesperados (catch-all)
export class InternalServerError extends AppError {
    constructor(message, details) {
        super(message || 'Error interno', 500, details);
    }
}
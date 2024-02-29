"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskChangeState = exports.taskRemove = exports.taskUpdate = exports.taskStore = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Project_1 = __importDefault(require("../models/Project"));
const mongoose_1 = require("mongoose");
const Task_1 = __importDefault(require("../models/Task"));
const types_1 = require("../types");
const taskStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, dateExpire, priority, project } = req.body;
        if ([name, description, dateExpire, priority, project].includes(""))
            throw (0, http_errors_1.default)(400, "Todos los campos obligatorios");
        if (!Object.values(types_1.Priority).includes(priority))
            throw (0, http_errors_1.default)(400, "La prioridad tiene un valor inválido!");
        const projectFound = yield Project_1.default.findById(project);
        if (!projectFound)
            throw (0, http_errors_1.default)(404, "El proyecto no existe");
        if (projectFound.createdBy.toString() !== req.user._id.toString())
            throw (0, http_errors_1.default)(403, "No estas autorizado!");
        const taskStore = yield Task_1.default.create(req.body);
        projectFound.tasks.push(taskStore._id);
        yield projectFound.save();
        return res.status(201).json({
            ok: true,
            msg: 'Tarea guardada con éxito',
            task: taskStore
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error instanceof Error ? error.message : 'Upss, hubo un error en TASK-STORE'
        });
    }
});
exports.taskStore = taskStore;
const taskUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, priority, dateExpire } = req.body;
        if ([name, description, priority, dateExpire].includes("") ||
            !name ||
            !description ||
            !priority ||
            !dateExpire)
            throw (0, http_errors_1.default)(400, "El nombre, la descripción, la prioridad y el cliente son datos obligatorios");
        if (!Object.values(types_1.Priority).includes(priority))
            throw (0, http_errors_1.default)(400, "La prioridad tiene un valor inválido");
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw (0, http_errors_1.default)(400, "No es un ID válido");
        const task = yield Task_1.default.findById(id).populate("project");
        if (!task)
            throw (0, http_errors_1.default)(404, "Tarea no encontrada");
        if (task.project.createdBy.toString() !== req.user._id.toString())
            throw (0, http_errors_1.default)(403, "No estas autorizado!");
        task.name = name || task.name;
        task.description = description || task.description;
        task.priority = priority || task.priority;
        task.dateExpire = dateExpire || task.dateExpire;
        yield task.save();
        const taskUpadated = yield Task_1.default.findById(id).populate("project").populate("assigned");
        return res.status(201).json({
            ok: true,
            msg: 'Tarea actualizada',
            task: taskUpadated
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error instanceof Error ? error.message : 'Upss, hubo un error en TASK-UPDATE'
        });
    }
});
exports.taskUpdate = taskUpdate;
const taskRemove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw (0, http_errors_1.default)(400, "No es un ID válido");
        const task = yield Task_1.default.findById(id).populate("project");
        if (!task)
            throw (0, http_errors_1.default)(404, "Tarea no encontrada");
        const projectFound = yield Project_1.default.findById(task.project);
        if (!projectFound)
            throw (0, http_errors_1.default)(404, "El proyecto no existe");
        if (task.project.createdBy.toString() !== req.user._id.toString())
            throw (0, http_errors_1.default)(403, "No estas autorizado!");
        projectFound.tasks.pull(id);
        yield Promise.allSettled([
            yield projectFound.save(),
            yield task.deleteOne()
        ]);
        return res.status(200).json({
            ok: true,
            msg: 'Tarea eliminada'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error instanceof Error ? error.message : 'Upss, hubo un error en TASK-REMOVE'
        });
    }
});
exports.taskRemove = taskRemove;
const taskChangeState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw (0, http_errors_1.default)(400, "No es un ID válido");
        const task = yield Task_1.default.findById(id).populate("project");
        if (!task)
            throw (0, http_errors_1.default)(404, "Tarea no encontrada");
        if (task.project.createdBy.toString() !== req.user._id.toString())
            throw (0, http_errors_1.default)(403, "No estas autorizado!");
        task.state = !task.state;
        task.assigned = req.user._id;
        yield task.save();
        const taskUpadated = yield Task_1.default.findById(id).populate("project").populate("assigned");
        return res.status(200).json({
            ok: true,
            msg: 'Estado actualizado',
            task: taskUpadated
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error instanceof Error ? error.message : 'Upss, hubo un error en TASK-CHANGE-STATE'
        });
    }
});
exports.taskChangeState = taskChangeState;

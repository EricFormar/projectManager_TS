"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../types");
var taskSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: Boolean,
        default: false,
    },
    dateExpire: {
        type: Date,
        required: true,
        default: Date.now()
    },
    priority: {
        type: String,
        required: true,
        enum: types_1.Priority, //opciones cerradas 
    },
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Project',
    },
    assigned: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Task', taskSchema);

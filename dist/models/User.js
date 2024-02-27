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
const bcryptjs_1 = require("bcryptjs");
const mongoose_1 = __importDefault(require("mongoose"));
// Declare the Schema of the Mongo model
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
    },
    checked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) { //evita volver a hashear el password cuando este no ha sido modificado 
            next();
        }
        this.password = yield (0, bcryptjs_1.hash)(this.password, 10);
    });
});
/* puedo crear más métodos */
userSchema.methods.checkedPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcryptjs_1.compare)(password, this.password);
    });
};
//Export the model
exports.default = mongoose_1.default.model('User', userSchema);

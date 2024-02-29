"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const tasksController_1 = require("../controllers/tasksController");
const usersController_1 = require("../controllers/usersController");
const projectsController_1 = require("../controllers/projectsController");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
/* AUTH */
router
    .post('/register', authController_1.register)
    .post('/login', authController_1.login)
    .get('/checked', authController_1.checked)
    .post('/send-token', authController_1.sendToken)
    .route('/reset-password')
    .get(authController_1.verifyToken)
    .post(authController_1.changePassword);
/* PROYECTOS */
router
    .route('/projects')
    .get(middlewares_1.checkAuth, projectsController_1.projectsList)
    .post(middlewares_1.checkAuth, projectsController_1.projectStore);
router
    .route('/projects/:id')
    .get(middlewares_1.checkAuth, projectsController_1.proejectDetail)
    .put(middlewares_1.checkAuth, projectsController_1.projectUpdate)
    .delete(middlewares_1.checkAuth, projectsController_1.projectRemove);
router
    .get('/collaborator', projectsController_1.collaboratorAdd)
    .delete('/collaborator', projectsController_1.collaboratorRemove);
/* TAREAS */
router
    .route('/tasks')
    .post(middlewares_1.checkAuth, tasksController_1.taskStore);
router
    .route('/tasks/:id')
    .put(middlewares_1.checkAuth, tasksController_1.taskUpdate)
    .delete(middlewares_1.checkAuth, tasksController_1.taskRemove)
    .post(middlewares_1.checkAuth, tasksController_1.taskChangeState);
/* USUARIOS */
router
    .get('/profile', middlewares_1.checkAuth, usersController_1.profile);
exports.default = router;

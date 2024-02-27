import { Request, Response } from "express";
import createError from "http-errors";
import Project from "../models/Project";
import { Types } from "mongoose";
import Task from "../models/Task";
import { Priority } from "../types";


export const taskStore = async (req : Request,res : Response) => { 
        try { 

            const {name, description, dateExpire, priority, project } = req.body;

            if([name, description, dateExpire, priority, project].includes("")) throw createError(400, "Todos los campos obligatorios");

            if(!Object.values(Priority).includes(priority)) throw createError(400, "La prioridad tiene un valor inválido!")

            const projectFound = await Project.findById(project);
            if(!projectFound) throw createError(404, "El proyecto no existe");

            if(projectFound.createdBy.toString() !== (req.user._id as Types.ObjectId).toString()) throw createError(403, "No estas autorizado!")

            const taskStore = await Task.create(req.body);

            projectFound.tasks.push(taskStore._id);
            await projectFound.save();

            return res.status(201).json({ 
                ok : true, 
                msg :'Tarea guardada con éxito',
                task : taskStore 
            }) 
        } catch (error) { 
            console.log(error); 
            return res.status(500).json({ 
                ok : false, 
                msg : error instanceof Error ? error.message : 'Upss, hubo un error en TASK-STORE' 
            }) 
        } 
        
    }
export const taskDetail = async (req : Request,res : Response) => { 
        try { 
            return res.status(200).json({ 
                ok : true, 
                msg :'Detalle de la Tarea' 
            }) 
        } catch (error) { 
            console.log(error); 
            return res.status(500).json({ 
                ok : false, 
                msg : error instanceof Error ? error.message : 'Upss, hubo un error en TASK-DETAIL' 
            }) 
        } 
        
    }
export const taskUpdate = async (req : Request,res : Response) => { 
        try { 
            return res.status(201).json({ 
                ok : true, 
                msg :'Tarea actualizada' 
            }) 
        } catch (error) { 
            console.log(error); 
            return res.status(500).json({ 
                ok : false, 
                msg : error instanceof Error ? error.message : 'Upss, hubo un error en TASK-UPDATE' 
            }) 
        } 
    }
export const taskRemove = async (req : Request,res : Response) => { 
        try { 
            return res.status(200).json({ 
                ok : true, 
                msg :'Tarea eliminado' 
            }) 
        } catch (error) { 
            console.log(error); 
            return res.status(500).json({ 
                ok : false, 
                msg : error instanceof Error ? error.message : 'Upss, hubo un error en TASK-REMOVE' 
            }) 
        } 
    }
export const taskChangeState = async (req : Request,res : Response) => { 
        try { 
            return res.status(200).json({ 
                ok : true, 
                msg :'Tarea completada' 
            }) 
        } catch (error) { 
            console.log(error); 
           return res.status(500).json({ 
                ok : false, 
                msg : error instanceof Error ? error.message : 'Upss, hubo un error en TASK-CHANGE-STATE' 
            }) 
        } 
    }

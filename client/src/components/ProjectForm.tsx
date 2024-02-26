import { FormEvent } from 'react';
import { FormDataProject } from '../context/ProjectProvider';
import useAuth from '../hooks/useAuth'
import { useForm } from '../hooks/useForm';
import { Alert } from './Alert'
import axios from 'axios';
import useProject from '../hooks/useProject';
import { useParams } from 'react-router-dom';

const ProjectForm = () => {
   
    const {id} = useParams();
    const {alert, handleShowAlert} = useAuth();
    const {createProject, project, updateProject} = useProject();

    const {formValues, handleInputChange, reset} = useForm<FormDataProject>({
        name: id ? project.name : "",
        description : id ? project.description : "",
        dateExpire : id ? project.dateExpire.split('T')[0] : "",
        client : id ? project.client : ""
    });
    
    const {name, description, dateExpire, client} = formValues;


    const handleSubmit = async (e : FormEvent) => {
        e.preventDefault();

        try {

            if([name, description, dateExpire, client].includes("")) throw new Error("Todos los campos son obligatorios")

            const now = new Date();
            if(new Date(dateExpire).getTime() < now.getTime())  throw new Error("La fecha de entrega no puede puede ser anterior a la actual")

            id ? updateProject(formValues, id) : createProject(formValues)
            reset()
            
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                handleShowAlert(axios.isAxiosError(error) ? error.response?.data.msg : error.message)
            }
        }
    }

    return (
            <form 
                className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
                onSubmit={handleSubmit}
            >
                    {
                            alert.msg && <Alert {...alert}/>
                    }

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="nombre"
                        >Nombre Proyecto</label>

                        <input
                            id="nombre"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Nombre del Proyecto"
                            name='name'
                            value={name}
                            onChange={handleInputChange}

                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="descripcion"
                        >Descripción</label>

                        <textarea
                            id="descripcion"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Descripción del Proyecto"
                            name='description'
                            value={description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="fecha-entrega"
                        >Fecha Entrega</label>

                        <input
                            id="fecha-entrega"
                            type="date"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            name='dateExpire'
                            value={dateExpire}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="cliente"
                        >Nombre Cliente</label>

                        <input
                            id="cliente"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Nombre del Cliente"
                            name='client'
                            value={client}
                            onChange={handleInputChange}
                        />
                    </div>

                    <input
                        type="submit"
                        value={id ? 'Actualizar' : 'Crear Proyecto'}
                        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
                    />
            </form>
    )
}

export default ProjectForm
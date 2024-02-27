import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import useProject from "../hooks/useProject";
import ModalFormTask from "../components/ModalFormTask";


const Project = () => {

  const {id} = useParams();

  const {getProject, project, loading, handlwShowModalFormTask} = useProject()

  useEffect(() => {
    getProject(id as string)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  


 return  (

  loading
  ?
  <p>Cargando...</p>
  :
        <>
          <div className='flex justify-between'>
          <div>
            <h1 className='font-black text-3xl'>{project.name}</h1>
            <h2 className="text-gray-400 text-2xl">para {project.client}</h2>
              <p>{project.description}</p>
            </div>

            {true && (
              <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <Link 
                  to={`/proyectos/editar/${project._id}`}
                  className='uppercase font-bold'
                >Editar</Link>
              </div>
            )}
          </div>

          {true && (
            <button
              type='button'
              className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'
              onClick={handlwShowModalFormTask}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Nueva Tarea
            </button>
          )}


            <p className='font-bold text-xl mt-10'>Tareas del Project</p>


            <div className='bg-white shadow mt-10 rounded-lg'>
              {
                project.tasks?.length ?
                project.tasks.map(task => (
                  <p>{task.name}</p>
                ))

                :
                <p className='text-center my-5 p-10'>No hay tareas en este Project</p>
              }
               
            </div>
            
            {true && (
              <>
                <div className='flex items-center justify-between mt-10'>
                    <p className='font-bold text-xl'>Colaboradores</p>
                    <Link
                      to={`/Projects/nuevo-colaborador/:idProject`}
                      className='text-gray-400 hover:text-black uppercase font-bold'
                    >Añadir</Link>
                </div>

                <div className='bg-white shadow mt-10 rounded-lg'>
                    <p className='text-center my-5 p-10'>No hay Colaboradores en este Project</p>
                </div>
              </>
            )}
            <ModalFormTask/>
        </>
    )

}

export default Project
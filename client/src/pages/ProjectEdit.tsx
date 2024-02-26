import ProjectForm from "../components/ProjectForm"
import useProject from "../hooks/useProject"
import { showConfirmMessage } from "../utils";

const ProjectEdit = () => {

  const  {project, deleteProject} = useProject();

  const handleDelete = () => {
    showConfirmMessage("¿Desea eliminar definitivamente el proyecto?", () => deleteProject(project._id), "warning", "Sí, eliminalo!")
  }

    return (
        <>
          
              <div className='flex justify-between'>
                <h1 className='font-black text-4xl'>Editando: <span className="text-gray-400"> {project.name}</span> </h1>

                  <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <button
                        className='uppercase font-bold'
                        onClick={handleDelete}
                    >Eliminar</button>
                  </div>
              </div>

            <div className="mt-10 flex justify-center">
              <ProjectForm />
            </div>
        </>
    )
}

export default ProjectEdit
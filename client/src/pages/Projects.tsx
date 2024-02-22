import { Alert } from "../components/Alert"
import ProjectCard from "../components/ProjectCard";
import useAuth from "../hooks/useAuth"
import useProject from "../hooks/useProject";


const Projects = () => {

  const { alert } = useAuth();
  const {projects} = useProject();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      {
        alert.msg && <Alert {...alert} />
      }

      <div className="bg-white shadow mt-10 rounded-lg ">

        {
          projects.length 
          ?
            projects.map(project => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))
          :
          <p className=" text-center text-gray-600 uppercase  p-5">Aún no teneés proyectos creados</p>

        }
        
      </div>
    </>
  )
}

export default Projects
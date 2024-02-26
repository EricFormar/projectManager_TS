import { PropsWithChildren, createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import clientAxios from "../config/clientAxios";
import { showToastMessage } from "../utils";
import { useNavigate } from "react-router-dom";

export interface Project {
    _id: string;
    name: string;
    description: string;
    dateExpire: string;
    client: string;
}

export interface ProjectContextProps {
    projects: Project[];
    project: Project;
    loading: boolean;
    createProject : (value : FormDataProject) => void;
    getProject: (id: string) => void;
    updateProject : (value : FormDataProject, id : string) => void;
    deleteProject : (id : string) => void;
}

export interface FormDataProject extends Omit<Project, '_id'> {

}

const ProjectContext = createContext<ProjectContextProps>({} as ProjectContextProps)

const ProjectProvider = ({ children }: PropsWithChildren) => {

    const navigate = useNavigate()

    const { auth, handleShowAlert } = useAuth()


    const [projects, setProjects] = useState<Project[]>([]);
    const [project, setProject] = useState<Project>({} as Project);
    const [loading, setLoading] = useState(false);

    
    const getToken = () => {

        const token = localStorage.getItem("tokenPM");
        if (!token) return null

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        return config
    }

    useEffect(() => {
        const getProjects = async () => {

            try {

                const config = getToken();
                if(!config) return

                const { data } = await clientAxios.get('/projects', config);

                setProjects(data.projects)


            } catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    handleShowAlert(axios.isAxiosError(error) ? error.response?.data.msg : error.message)
                }
            }
        }

        getProjects()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);


    const createProject = async (value: FormDataProject) => {
        try {

            const config = getToken();
            if(!config) return

            const { data } = await clientAxios.post('/projects', value, config);

            showToastMessage(data.msg)

            setProjects([
                ...projects,
                data.project
            ])
            
            navigate('/proyectos')

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                handleShowAlert(axios.isAxiosError(error) ? error.response?.data.msg : error.message)
            }
        }
    }

    const getProject = async (id : string) => {
        try {
            setLoading(true)

            const config = getToken();
            if(!config) return

            const { data } = await clientAxios.get(`/projects/${id}`, config);

            setProject(data.project);
            
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                handleShowAlert(axios.isAxiosError(error) ? error.response?.data.msg : error.message)
            }
        } finally{
            setLoading(false)

        }
    }

    const updateProject = async (value: FormDataProject, id : string) => {

        try {
            const config = getToken();
            if(!config) return
    
            const { data } : {data : {ok : boolean, msg : string, project : Project}} = await clientAxios.put(`/projects/${id}`, value, config);
    
            showToastMessage(data.msg)

            const projectsUpdated = projects.map(project => project._id === id ? data.project : project)

            setProjects(projectsUpdated)
            
            navigate('/proyectos')
    
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                handleShowAlert(axios.isAxiosError(error) ? error.response?.data.msg : error.message)
            }
        }
    }

    const deleteProject = async (id : string) => {
        try {
            const config = getToken();
            if(!config) return

            const { data } : {data : {ok : boolean, msg : string}} = await clientAxios.delete(`/projects/${id}`, config);

            showToastMessage(data.msg)

            const projectsUpdated = projects.filter(project => project._id !== id );
            
            setProjects(projectsUpdated)
            
            navigate('/proyectos')

            
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                handleShowAlert(axios.isAxiosError(error) ? error.response?.data.msg : error.message)
            }
        }
    }


    return (
        <ProjectContext.Provider
            value={{
                projects,
                project,
                loading,
                createProject,
                getProject,
                updateProject,
                deleteProject
            }}
        >
            {children}

        </ProjectContext.Provider>
    )

}

export {
    ProjectProvider
}

export default ProjectContext
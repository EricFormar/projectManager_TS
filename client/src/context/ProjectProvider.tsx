import { PropsWithChildren, createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import clientAxios from "../config/clientAxios";
import { showToastMessage } from "../utils";

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
}

export interface FormDataProject extends Omit<Project, '_id'> {

}

const ProjectContext = createContext<ProjectContextProps>({} as ProjectContextProps)

const ProjectProvider = ({ children }: PropsWithChildren) => {

    const { auth, handleShowAlert } = useAuth()


    const [projects, setProjects] = useState<Project[]>([]);
    const [project, setProject] = useState<Project>({} as Project);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProjects = async () => {

            try {

                const token = localStorage.getItem("tokenPM");
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

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

            const token = localStorage.getItem("tokenPM");
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/projects', value, config);

            showToastMessage(data.msg)

            setProjects([
                ...projects,
                data.project
            ])


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
            const token = localStorage.getItem("tokenPM");
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
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


    return (
        <ProjectContext.Provider
            value={{
                projects,
                project,
                loading,
                createProject,
                getProject
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
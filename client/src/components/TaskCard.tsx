import { Task } from "../context/ProjectProvider"
import useProject from "../hooks/useProject"
import { showConfirmMessage } from "../utils";

const TaskCard = ({task} : {task : Task}) => {

    const {handleEditModalTask, deleteTask, changeStateTask} = useProject();

    const handleDelete = () => {
        showConfirmMessage("¿Desea eliminar definitivamente la tarea?", () => deleteTask(task._id), "warning", "Sí, eliminalo!")
      }

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col  items-start">
                <p className="mb-1 text-xl">{task.name}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{task.description}</p>
                <p className="mb-1 text-sm">{task.dateExpire.split('T')[0]}</p>
                <p className="mb-1 text-gray-600">Prioridad: {task.priority}</p>
                {
                    task.state && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {task.assigned?.name }</p>
                }
            </div>

            <div className="flex flex-col gap-2">
            <div>
                <label htmlFor={`checked${task._id}`} className="flex items-center justify-center gap-2 uppercase font-semibold ">
                    <input id={`checked${task._id}`} type="checkbox" defaultChecked={task.state}  className=" h-5 w-5" onChange={() => changeStateTask(task._id)}/>
                        Completada
                </label>

                </div>
                {true && 
                    <div className="flex flex-col lg:flex-row justify-end gap-2">
                        <button
                            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                            onClick={() => handleEditModalTask(task)}
                        ><i className="fa-solid fa-pencil"></i></button>
                        <button
                            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                            onClick={handleDelete}
                        ><i className="fa-solid fa-trash-can"></i></button>

                    </div>
                }
              


                    </div>
        </div>
    )
}

export default TaskCard
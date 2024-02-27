
const TaskCard = () => {

   

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col  items-start">
                <p className="mb-1 text-xl">{'name'}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{'description'}</p>
                <p className="mb-1 text-sm">{'dateExpire'}</p>
                <p className="mb-1 text-gray-600">Prioridad: {'priority'}</p>
                {<p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: { }</p>}
            </div>

            <div className="flex flex-col gap-2">
            <div>
                <label htmlFor="" className="flex items-center justify-center gap-2 uppercase font-semibold ">
                    <input id=""  type="checkbox"  className=" h-5 w-5" />
                        Completada
                </label>

                </div>
                {true && 
                    <div className="flex flex-col lg:flex-row justify-end gap-2">
                        <button
                            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                           
                        ><i className="fa-solid fa-pencil"></i></button>
                        <button
                            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                            
                        ><i className="fa-solid fa-trash-can"></i></button>

                    </div>
                }
              


                    </div>
        </div>
    )
}

export default TaskCard
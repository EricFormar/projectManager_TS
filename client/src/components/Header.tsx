import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

    const {signOut}  = useAuth()


    const handleSignOut = () => {

        signOut();
        localStorage.removeItem('tokenPM')
    }


  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                Project Manager
            </h2>

            <div className='flex flex-col md:flex-row items-center gap-4'>
                <button
                    type="button"
                    className='font-bold uppercase'
                >Buscar Proyecto</button>
                <Link
                    to="/proyectos"
                    className='font-bold uppercase'
                >Proyectos</Link>

                <button
                    type="button"
                    className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                    onClick={handleSignOut}
                >Cerrar Sesión</button>

            </div>
        </div>
    </header>
  )
}

export default Header
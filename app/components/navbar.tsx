import NavLink from './navlink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faStore, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';




export default function Navbar(){
    return(
    <nav className="flex items-center justify-between space-y-1 bg-zinc-400 text-white p-2 w-full">
        <div className="flex justify-start items-center gap-4 col-1">            
            <NavLink href="/pos"><FontAwesomeIcon icon={faCashRegister}/>PDV</NavLink>        
            <NavLink href="/sales"><FontAwesomeIcon icon={faStore}/>Vendas</NavLink>
        </div>  
        <div className="flex justify-end gap-4 col-2">            
            <a href="" className="flex items-center gap-1 hover:text-blue-300"><FontAwesomeIcon icon={faRightFromBracket}/>Logout</a>            
        </div>        
    </nav>
    );
}
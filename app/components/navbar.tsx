import {Store, Coins, LogOut} from 'lucide-react';
import NavLink from './navlink';


export default function Navbar(){
    return(
    <nav className="flex items-center justify-between space-y-1 bg-zinc-400 text-white p-2 w-full">
        <div className="flex justify-start items-center gap-4 col-1">            
            <NavLink href="/pos"><Store/>PDV</NavLink>        
            <NavLink href="/sales"><Coins/>Vendas</NavLink>
        </div>  
        <div className="flex justify-end gap-4 col-2">            
            <a href="" className="flex items-center gap-1 hover:text-blue-300"><LogOut/>Logout</a>            
        </div>        
    </nav>
    );
}
import NavLink from './navlink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faStore, faTicket, faScaleBalanced, faBriefcase, faGears } from '@fortawesome/free-solid-svg-icons';




export default function Navbar() {
    return (
        <nav className="flex items-center justify-between space-y-1 bg-zinc-400 text-white p-2 w-full">
            <div className="flex justify-start items-center gap-4 col-1">
                <NavLink href="/pos"><FontAwesomeIcon icon={faCashRegister} />PDV</NavLink>
                <NavLink href="/sales"><FontAwesomeIcon icon={faStore} />Vendas</NavLink>
                <NavLink href="/courtesies"><FontAwesomeIcon icon={faTicket} />Cortesias</NavLink>
                <NavLink href="/cash-flows"><FontAwesomeIcon icon={faScaleBalanced} />Movimentos de caixa</NavLink>
                <NavLink href="/cashes"><FontAwesomeIcon icon={faBriefcase} />Caixas</NavLink>
                <NavLink href="/admin"><FontAwesomeIcon icon={faGears} />Administração</NavLink>
            </div>
        </nav>
    );
}
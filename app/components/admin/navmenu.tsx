import { faBox, faChurch, faGears, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import NavMenuLink from './navmenu-link';

interface NavMenuProps {
    selected: string;
}

export default function NavMenu(props: NavMenuProps) {

    const navMenuLinks = [
        {
            href: "/admin/users", Icon: faUser, Label: "Usuários", key: "users"
        },
        {
            href: "/admin/ministries", Icon: faChurch, Label: "Ministérios", key: "ministries"
        },
        {
            href: "/admin/products", Icon: faBox, Label: "Produtos", key: "products"
        },
        {
            href: "/admin/shops", Icon: faShop, Label: "Lojas", key: "shops"
        },
        {
            href: "/admin/settings", Icon: faGears, Label: "Configurações", key: "settings"
        },
    ].map(link => (
        <NavMenuLink
            key={link.key}
            href={link.href}
            Icon={link.Icon}
            Label={link.Label}
            Selected={props.selected === link.key}
        />
    ))


    return (
        <nav className="navbar">
            <div className="nav-container">

                <div className="flex flex-1 flex-col">

                    {navMenuLinks}


                </div>
            </div>
        </nav>
    );
}
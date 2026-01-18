'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainMenuButton from "../components/admin/main-menu-button";
import { faUser, faChurch, faBox, faShop, faGears } from "@fortawesome/free-solid-svg-icons"
import Navbar from "../components/navbar";

export default function Admin() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-row w-full items-start justify-center">
                <div className="grid grid-flow-row-dense grid-cols-3 w-8/12 mt-2 gap-2">
                    <MainMenuButton href="/admin/users"><FontAwesomeIcon icon={faUser} /> Usuários</MainMenuButton>
                    <MainMenuButton href="/admin/ministries"><FontAwesomeIcon icon={faChurch} /> Ministérios</MainMenuButton>
                    <MainMenuButton href="/admin/products"><FontAwesomeIcon icon={faBox} /> Produtos</MainMenuButton>
                    <MainMenuButton href="/admin/shops"><FontAwesomeIcon icon={faShop} /> Lojas</MainMenuButton>
                    <MainMenuButton href="/admin/settings"><FontAwesomeIcon icon={faGears} /> Configurações</MainMenuButton>
                </div>
            </div>
        </div>
    );
}
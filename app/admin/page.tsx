'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainMenuButton from "../components/admin/main-menu-button";
import { faUser, faChurch, faBox, faShop, faGears } from "@fortawesome/free-solid-svg-icons"
import Navbar from "../components/navbar";

export default function Page() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-row w-full items-start justify-center">
                <div className="grid grid-flow-row-dense grid-cols-3 w-8/12 mt-2 gap-2">
                    <MainMenuButton><FontAwesomeIcon icon={faUser} /> Usuários</MainMenuButton>
                    <MainMenuButton><FontAwesomeIcon icon={faChurch} /> Ministérios</MainMenuButton>
                    <MainMenuButton><FontAwesomeIcon icon={faBox} /> Produtos</MainMenuButton>
                    <MainMenuButton><FontAwesomeIcon icon={faShop} /> Lojas</MainMenuButton>
                    <MainMenuButton><FontAwesomeIcon icon={faGears} /> Configurações</MainMenuButton>
                </div>
            </div>
        </div>
    );
}
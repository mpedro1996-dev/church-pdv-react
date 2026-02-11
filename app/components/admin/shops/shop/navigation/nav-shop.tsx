import { useState } from "react";
import NavShopButton from "./nav-shop-button";

interface NavShopProps {
    selected: string;
    OnTabSelected: (key: string) => void;
}

export default function NavShop({ selected, OnTabSelected }: NavShopProps) {

    const [selectedTab, setSelectedTab] = useState(selected);

    const handleOnClick = (key: string) => {
        setSelectedTab(key);
        OnTabSelected(key);
    }

    const navShopButtons = [
        {
            name: "Códigos de ativação", key: "activation-codes"
        },
        {
            name: "Produtos", key: "products"
        },

    ].map(link => (
        <NavShopButton key={link.key} label={link.key} selected={selectedTab === link.key} onClick={() => handleOnClick(link.key)}>{link.name}</NavShopButton>

    ))

    return (

        <div className="flex flex-row border rounded">
            {navShopButtons}
        </div>


    )

}
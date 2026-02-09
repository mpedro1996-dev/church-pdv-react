'use client';

import NavMenu from "@/app/components/admin/navmenu";
import ShopEdit from "@/app/components/admin/shops/shop-edit";
import ShopRow from "@/app/components/admin/shops/shop-row";
import FlexTableHeaders from "@/app/components/flex-table/flex-table-headers";
import { api } from "@/app/lib/axios";
import { Shop } from "@/app/lib/model";
import { useShopStore, useTokenStore } from "@/app/lib/zustand";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Shops() {

    const { token } = useTokenStore();
    const { shops, setShops } = useShopStore();
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleEditShop = (shopId: number) => {
        setSelectedShopId(shopId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedShopId(null);
        setModalOpen(false);
    };

    const filteredShops = shops.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const headers = [
        "Loja",
    ];

    useEffect(() => {
        async function GetShops() {

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await api.get('/api/shops', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = response.data;

                if (result.isSuccess) {
                    setShops(result.value);
                }
            } catch (error) {
                console.error('GetShops failed!', error);
            }
        }

        GetShops();
    }, [token, setShops]);


    async function handleOnChangeActive(shopId: number) {

        const shop = shops.find(m => m.id === shopId);
        if (!shop) return;


        const callApi = () => {
            var method = shop.active ? 'deactivate' : 'active';
            const response = api.delete(`/api/shops/${shopId}/${method}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;
        }



        try {
            const response = await callApi();
            const result = response.data;

            if (result.isSuccess) {

                const updatedShop: Shop = result.value;
                const updatedShops = shops.map(shop =>
                    shop.id === updatedShop.id ? updatedShop : shop
                );

                setShops(updatedShops);
            }
        }
        catch (error) {
            console.error('Shop Active error', error);
        }


    }



    return (
        <>
            {modalOpen && <ShopEdit isEditing={selectedShopId !== null} onClose={handleCloseModal} id={selectedShopId} />}

            <div className="flex flex-col h-screen">
                <div className="flex flex-1">
                    <aside className="w-72 flex flex-col border rounded m-1">
                        <NavMenu selected="shops" />
                    </aside>
                    <main className="flex-1 flex flex-col border rounded p-2 m-1">
                        <div className="flex mx-2">
                            <label>Buscar:</label>
                        </div>
                        <div className="flex flex-row mb-2 mx-2 gap-1">
                            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" name="shop-search" className="rounded border border-zinc-400 shadow-sm w-auto grow h-10 px-2" />
                            <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1 w-auto" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon={faPlus} />Nova Loja</button>
                        </div>
                        <div className="mx-2 rounded border-t border-r border-l">
                            <FlexTableHeaders headers={headers} hasActionButton={true} />
                            {filteredShops.map((shop) => (
                                <ShopRow key={shop.id} shop={shop} onChangeActive={() => handleOnChangeActive(shop.id)} onEdit={handleEditShop} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}


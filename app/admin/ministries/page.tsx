'use client';

import MinistryEdit from "@/app/components/admin/ministries/ministry-edit";
import MinistryRow from "@/app/components/admin/ministries/ministry-row";
import NavMenu from "@/app/components/admin/navmenu";
import FlexTableHeaders from "@/app/components/flex-table/flex-table-headers";
import { api } from "@/app/lib/axios";
import { Ministry } from "@/app/lib/model";
import { useMinistryStore, useTokenStore } from "@/app/lib/zustand";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Ministries() {

    const { token } = useTokenStore();
    const { ministries, setMinistries } = useMinistryStore();
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedMinistryId, setSelectedMinistryId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleEditMinistry = (ministryId: number) => {
        setSelectedMinistryId(ministryId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedMinistryId(null);
        setModalOpen(false);
    };

    const filteredMinistries = ministries.filter(ministry =>
        ministry.name.toLowerCase().includes(searchTerm.toLowerCase()) || ministry.acronym.toLowerCase().includes(searchTerm.toLowerCase())

    );

    const headers = [
        "Nome",
        "Acronimo",
    ];

    useEffect(() => {
        async function GetMinistries() {

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await api.get('/api/ministries', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = response.data;

                if (result.isSuccess) {
                    setMinistries(result.value);
                }
            } catch (error) {
                console.error('GetProducts failed!', error);
            }
        }

        GetMinistries();
    }, [token, setMinistries]);


    async function handleOnChangeActive(ministryId: number) {

        const ministry = ministries.find(m => m.id === ministryId);
        if (!ministry) return;


        const callApi = () => {
            var method = ministry.active ? 'deactivate' : 'active';
            const response = api.delete(`/api/ministries/${ministryId}/${method}`,
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

                const updatedMinistry: Ministry = result.value;
                const updatedMinistries = ministries.map(ministry =>
                    ministry.id === updatedMinistry.id ? updatedMinistry : ministry
                );
                setMinistries(updatedMinistries);
            }
        }
        catch (error) {
            console.error('Ministry Active error', error);
        }


    }



    return (
        <>
            {modalOpen && <MinistryEdit isEditing={selectedMinistryId !== null} onClose={handleCloseModal} id={selectedMinistryId} />}

            <div className="flex flex-col h-screen">
                <div className="flex flex-1">
                    <aside className="w-72 flex flex-col border rounded m-1">
                        <NavMenu selected="ministries" />
                    </aside>
                    <main className="flex-1 flex flex-col border rounded p-2 m-1">
                        <div className="flex mx-2">
                            <label> Buscar:</label>
                        </div>
                        <div className="flex flex-row mb-2 mx-2 gap-1">
                            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" name="ministry-search" className="rounded border border-zinc-400 shadow-sm w-auto grow h-10 px-2" />
                            <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1 w-auto" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon={faPlus} />Novo Ministério</button>
                        </div>
                        <div className="mx-2 rounded border-t border-r border-l">
                            <FlexTableHeaders headers={headers} hasActionButton={true} />
                            {filteredMinistries.map((ministry) => (
                                <MinistryRow key={ministry.id} ministry={ministry} onChangeActive={() => handleOnChangeActive(ministry.id)} onEdit={handleEditMinistry} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}



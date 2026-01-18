'use client';

import MinistryRow from "@/app/components/admin/ministries/ministry-row";
import NavMenu from "@/app/components/admin/navmenu";
import FlexTableHeaders from "@/app/components/flex-table-headers";
import { api } from "@/app/lib/axios";
import { useMinistryStore, useTokenStore } from "@/app/lib/zustand";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Ministries() {

    const { token } = useTokenStore();
    const { ministries, setMinistries } = useMinistryStore();
    const [searchTerm, setSearchTerm] = useState('');

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
    return (
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
                        <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1 w-auto"><FontAwesomeIcon icon={faPlus} />Novo Ministério</button>
                    </div>
                    <div className="mx-2 rounded border-t border-r border-l">
                        <FlexTableHeaders headers={headers} hasActionButton={true} />
                        {filteredMinistries.map((ministry) => (
                            <MinistryRow key={ministry.id} name={ministry.name} acronym={ministry.acronym} id={ministry.id} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}



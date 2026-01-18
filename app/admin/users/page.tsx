'use client';

import UserRow from "@/app/components/admin/users/user-row";
import NavMenu from "@/app/components/admin/navmenu";
import FlexTableHeaders from "@/app/components/flex-table-headers";
import { api } from "@/app/lib/axios";
import { useUserStore, useTokenStore } from "@/app/lib/zustand";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Users() {

    const { token } = useTokenStore();
    const { users, setUsers } = useUserStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const headers = [
        "Nome",
        "Nome de usuário"
    ];

    useEffect(() => {
        async function GetUsers() {

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await api.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = response.data;

                if (result.isSuccess) {
                    setUsers(result.value);
                }
            } catch (error) {
                console.error('GetUsers failed!', error);
            }
        }

        GetUsers();
    }, [token, setUsers]);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <aside className="w-72 flex flex-col border rounded m-1">
                    <NavMenu selected="users" />
                </aside>
                <main className="flex-1 flex flex-col border rounded p-2 m-1">
                    <div className="flex mx-2">
                        <label> Buscar:</label>
                    </div>
                    <div className="flex flex-row mb-2 mx-2 gap-1">
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" name="user-search" className="rounded border border-zinc-400 shadow-sm w-auto grow h-10 px-2" />
                        <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1 w-auto"><FontAwesomeIcon icon={faPlus} />Novo Usuário</button>
                    </div>
                    <div className="mx-2 rounded border-t border-r border-l">
                        <FlexTableHeaders headers={headers} hasActionButton={true} />
                        {filteredUsers.map((user) => (
                            <UserRow key={user.id} name={user.name} username={user.userName} id={user.id} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

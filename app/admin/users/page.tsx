'use client';

import UserRow from "@/app/components/admin/users/user-row";
import NavMenu from "@/app/components/admin/navmenu";
import FlexTableHeaders from "@/app/components/flex-table/flex-table-headers";
import { api } from "@/app/lib/axios";
import { useUserStore, useTokenStore } from "@/app/lib/zustand";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useEffect, useState } from "react";
import UserEdit from "@/app/components/admin/users/user-edit";
import User from "@/app/lib/model";
import ResetPassword from "@/app/components/admin/users/reset-password";

export default function Users() {

    const { token } = useTokenStore();
    const { users, setUsers } = useUserStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleEditUser = (userId: number) => {
        setSelectedUserId(userId);
        setModalOpen(true);
    };

    const handleResetPassword = (userId: number) => {
        setSelectedUserId(userId);
        setResetPasswordModalOpen(true);
    }

    async function handleOnChangeActive(userId: number) {
        const user = users.find(u => u.id === userId);
        if (!user) return;


        const callApi = () => {
            var method = user.active ? 'deactivate' : 'active';
            const response = api.delete(`/api/users/${userId}/${method}`,
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

                const updatedUser: User = result.value;
                const updatedUsers = users.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                );
                setUsers(updatedUsers);
            }
        }
        catch (error) {
            console.error('User Active error', error);
        }


    }

    const handleCloseModal = () => {
        setSelectedUserId(null);
        setModalOpen(false);
    };

    const handleCloseResetPasswordModal = () => {
        setSelectedUserId(null);
        setResetPasswordModalOpen(false);
    };

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
        <>
            {modalOpen && <UserEdit isEditing={selectedUserId !== null} onClose={handleCloseModal} id={selectedUserId} />}
            {resetPasswordModalOpen && <ResetPassword userId={selectedUserId} onClose={handleCloseResetPasswordModal} />}

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
                            <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1 w-auto" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon={faPlus} />Novo Usuário</button>
                        </div>
                        <div className="mx-2 rounded border-t border-r border-l">
                            <FlexTableHeaders headers={headers} hasActionButton={true} />
                            {filteredUsers.map((user) => (
                                <UserRow key={user.id} user={user} onEdit={handleEditUser} onChangeActive={() => handleOnChangeActive(user.id)} onResetPassword={handleResetPassword} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

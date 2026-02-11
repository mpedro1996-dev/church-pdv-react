import FlexTableHeaders from "@/app/components/flex-table/flex-table-headers";
import ActivationCodeRow from "./activation-code-row";
import { useEffect } from "react";
import { useActivationCodeStore, useSessionStore } from "@/app/lib/zustand";
import { api } from "@/app/lib/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface TabActivationCodesProps {
    shopId: number;
}

export default function TabActivationCodes(props: TabActivationCodesProps) {

    const { session } = useSessionStore();
    const { activationCodes, setActivationCodes } = useActivationCodeStore();

    const { shopId } = props;


    async function handleDeleteActivationCode(id: number) {

        if (!session?.token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await api.delete(`/api/activation-codes/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });

            var result = response.data;

            if (result.isSuccess) {
                setActivationCodes(activationCodes.filter(code => code.id !== id));
            }

        } catch (error) {
            console.error('Failed to delete activation code:', error);
        }
    }

    async function handleCreateActivationCode() {

        if (!session?.token) {
            console.error('No token found');
            return;
        }

        var data = {
            shopId: shopId
        }

        try {
            const response = await api.post(`/api/activation-codes`, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });

            var result = response.data;

            if (result.isSuccess) {
                setActivationCodes([...activationCodes, result.value]);
            }

        } catch (error) {
            console.error('Failed to create activation code:', error);
        }
    }

    const headers = [
        "Código de ativação",

    ];

    useEffect(() => {
        async function GetActivationCodes() {

            if (!session?.token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await api.get('/api/activation-codes', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                });

                const result = response.data;

                if (result.isSuccess) {
                    setActivationCodes(result.value);
                }
            } catch (error) {
                console.error('GetActivationCodes failed!', error);
            }
        }

        GetActivationCodes();
    }, [session?.token, setActivationCodes]);

    return (
        <>

            <div className="flex flex-row mb-2 mx-2 gap-1">
                <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1 w-auto" onClick={() => handleCreateActivationCode()}><FontAwesomeIcon icon={faPlus} />Novo Código de Ativação</button>
            </div>
            <div className="mx-2 rounded border-t border-r border-l">
                <FlexTableHeaders headers={headers} hasActionButton={true} />
                {activationCodes.map((activationCode) => (
                    <ActivationCodeRow key={activationCode.id} activationCode={activationCode} onDelete={handleDeleteActivationCode} />
                ))}
            </div>
        </>
    )
}

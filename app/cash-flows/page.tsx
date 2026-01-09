'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Navbar from "../components/navbar"
import { faLock, faPlus } from "@fortawesome/free-solid-svg-icons"
import CurrencyInput from "../components/currency-input"
import { useCallback, useEffect, useState } from "react"
import { api } from "../lib/axios"
import { useCashFlowStore, usePayValueStore, useTokenStore } from "../lib/zustand"
import CashFlowRow from "../components/cash-flow-row"

import CurrencyFormatter from "../components/currency-formatter"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Input from "../components/input"
import ValidatorMessage from "../components/validator-message"
import CloseCash from "../components/close-cash"

const cashFlowSchema = z.object({
    description: z.string().min(3, "Informe a descrição do movimento"),
    type: z.number()
});

type CashFlowFormData = z.infer<typeof cashFlowSchema>

export default function CashFlows() {

    const { token } = useTokenStore();
    const { cashFlows, setCashFlows } = useCashFlowStore();

    const { payValue, setPayValue } = usePayValueStore();
    const [description, setDescription] = useState("");
    const [modalOpen, setModalOpen] = useState(false);




    const { handleSubmit, register, formState: { errors } } = useForm<CashFlowFormData>({
        resolver: zodResolver(cashFlowSchema)
    });

    const openModal = () => setModalOpen(true);

    const closeModal = () => {
        setModalOpen(false);

    }


    const GetCashFlows = useCallback(async () => {

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await api.get('/api/cash-flows', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = response.data;


            if (result.isSuccess) {
                setCashFlows(result.value);
            }
        } catch (error) {
            console.error('GetCashFlows failed!', error);
        }
    }, [token, setCashFlows])



    useEffect(() => {

        GetCashFlows();

    }, [GetCashFlows]);



    const calculateCash = () => {
        return cashFlows.reduce((totalCash, cashFlow) => {

            if ((cashFlow.paymentType == 1 && cashFlow.type != 4) || cashFlow.type == 0 || cashFlow.type == 3) {
                return totalCash + cashFlow.value;
            }
            if (cashFlow.type == 1 || (cashFlow.paymentType == 1 && cashFlow.type == 4)) {

                return totalCash - cashFlow.value;
            }
            else {
                return totalCash + 0;
            }

        }, 0);
    }

    const calculateDebit = () => {
        return cashFlows.reduce((totalDebit, cashFlow) => {

            if ((cashFlow.paymentType == 2 && cashFlow.type != 4)) {
                return totalDebit + cashFlow.value;
            }
            if (cashFlow.paymentType == 2 && cashFlow.type == 4) {

                return totalDebit - cashFlow.value;
            }
            else {
                return totalDebit + 0
            }

        }, 0);
    }

    const calculateCredit = () => {
        return cashFlows.reduce((totalCredit, cashFlow) => {

            if ((cashFlow.paymentType == 3 && cashFlow.type != 4)) {
                return totalCredit + cashFlow.value;
            }
            if (cashFlow.paymentType == 3 && cashFlow.type == 4) {

                return totalCredit - cashFlow.value;
            }
            else {
                return totalCredit + 0
            }

        }, 0);
    }

    const calculatePix = () => {
        return cashFlows.reduce((totalPix, cashFlow) => {

            if ((cashFlow.paymentType == 4 && cashFlow.type != 4)) {
                return totalPix + cashFlow.value;
            }
            if (cashFlow.paymentType == 4 && cashFlow.type == 4) {
                return totalPix - cashFlow.value;
            }
            else {
                return totalPix + 0
            }

        }, 0);
    }

    const calculateConsumption = () => {
        return cashFlows.reduce((totalConsumption, cashFlow) => {

            if (cashFlow.paymentType == 5 && cashFlow.type != 4) {
                return totalConsumption + cashFlow.value;
            }
            if (cashFlow.paymentType == 5 && cashFlow.type == 4) {
                return totalConsumption - cashFlow.value;
            }
            else {
                return totalConsumption + 0
            }

        }, 0);
    }

    async function createCashFlow(data: CashFlowFormData) {

        if (payValue <= 0) {
            alert('Informe um valor maior que zero.',);
        }

        try {
            const response = await api.post('/api/cash-flows', { ...data, "cashFlowValue": payValue },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const result = response.data;

            if (result.isSuccess) {
                setPayValue(0)
                GetCashFlows();
                setDescription("");
            }
        }
        catch (error) {
            console.error('Login failed', error);
        }
    }


    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };




    return (
        <>

            {modalOpen && <CloseCash closeModal={closeModal} />}

            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex flex-row w-full items-start justify-center">
                    <div className="w-8/12 p-2">
                        <form className="flex flex-row gap-2 mb-2" onSubmit={handleSubmit(createCashFlow)}>
                            <div className="flex flex-col">
                                <label>Tipo:</label>
                                <select {...register("type", { valueAsNumber: true })} className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" >
                                    <option value="0">Suplemento</option>
                                    <option value="1">Sangria</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label>Valor:</label>
                                <CurrencyInput className="w-36 disabled:bg-zinc-300 disabled:text-zinc-400" name="openValue" />
                            </div>
                            <div className="flex flex-col">
                                <label>Descrição:</label>
                                <Input register={register("description")} type="text" name="description" onChange={handleDescriptionChange} value={description} />
                                {errors.description && <ValidatorMessage>{errors.description.message}</ValidatorMessage>}

                            </div>
                            <div className={`flex flex-col ${errors.description ? ' justify-center items-center' : ' justify-end items-end'}`}>
                                <button type="submit" className="text-white bg-green-600 border rounded border-green-400 mt-2 p-2 flex items-center gap-1" ><FontAwesomeIcon icon={faPlus} />Cadastrar movimento</button>
                            </div>
                        </form>
                        <div className="flex flex-col border rounded">
                            {/*Sumário */}
                            <div className="flex justify-between items-center p-2 border-b">
                                <h1><span className="font-bold">Dinheiro:</span> <CurrencyFormatter value={calculateCash()} /></h1>
                                <h1><span className="font-bold">Debito:</span> <CurrencyFormatter value={calculateDebit()} /></h1>
                                <h1><span className="font-bold">Crédito:</span> <CurrencyFormatter value={calculateCredit()} /></h1>
                                <h1><span className="font-bold">Pix:</span> <CurrencyFormatter value={calculatePix()} /></h1>
                                <h1><span className="font-bold">Fiado:</span> <CurrencyFormatter value={calculateConsumption()} /></h1>
                                <button type="button" className="text-white bg-blue-500 border rounded border-blue-400 p-2 flex items-center gap-1" onClick={() => openModal()} ><FontAwesomeIcon icon={faLock} />Fechar caixa</button>
                            </div>
                            {/* Movimentos - cabeçalho */}
                            <div className="flex justify-center p-2 items-center border-b font-bold">
                                <p className="flex-1">Valor</p>
                                <p className="flex-1">Tipo</p>
                                <p className="flex-1">Tipo de pagamento</p>
                                <p className="flex-1">Descrição</p>
                            </div>
                            {cashFlows.map((cashFlow, index) => (
                                <CashFlowRow key={index} value={cashFlow.value} type={cashFlow.type} paymentType={cashFlow.paymentType} description={cashFlow.description} />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>




    )
}
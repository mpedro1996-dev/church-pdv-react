'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cart from "../components/cart"
import Navbar from "../components/navbar"
import { faPix } from "@fortawesome/free-brands-svg-icons"
import { faMoneyBill, faCreditCard, faAddressCard, faHandHoldingDollar, faTrash, faGears, faFlagCheckered, faWallet, faCross, faCrosshairs, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCreditCard as farCreditCard } from "@fortawesome/free-regular-svg-icons"
import CurrencyInput from "../components/currency-input"
import CurrencyFormatter from "../components/currency-formatter"
import PaymentType from "../components/payment-type-button"
import { usePaymentStore, usePaymentTypeStore, usePayValueStore, useSaleItemStore, useTokenStore, useMemberStore, Sale } from "../lib/zustand"
import { use, useEffect, useImperativeHandle, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import PaymentItem from "../components/payment-item"
import { api } from "../lib/axios"

import SaleSucess from "../components/sale-success"
import { useRouter } from 'next/navigation';
import PrintableSale from "../components/printable-sale"
import { useReactToPrint } from "react-to-print"
import NewMember from "../components/new-member"

interface Member {
    name: string,
    church: string,
    phoneNumber: string
}


export default function Payment() {

    const { paymentType, setPaymentType } = usePaymentTypeStore();
    const { payValue, setPayValue } = usePayValueStore();
    const [isWithoutPaymentType, setIsWithoutPaymentType] = useState(true);
    const [hasChangeValue, setHasChangeValue] = useState(false);
    const [hasConsumption, setHasConsumption] = useState(false);
    const { saleItems, setSaleItems } = useSaleItemStore();
    const { payments, setPayments, addPayment } = usePaymentStore()
    const [remainValue, setRemainValue] = useState(0);
    const [changeValue, setChangeValue] = useState(0);
    const { token } = useTokenStore();

    const [saleSuccessing, setSaleSuccessing] = useState(false);
    const router = useRouter();
    const { member } = useMemberStore();


    const openModal = () => setHasConsumption(true);

    const closeModal = (data: Member) => {
        createPayment(payValue, changeValue, data);
        setHasConsumption(false);
        setPayValue(0);
        setPaymentType(null);
    }

    const [saleData, setSaleData] = useState<Sale | null>(null);

    const componentRef = useRef<HTMLDivElement | null>(null);


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Relatório de Impressão',
        onBeforeGetContent: () => {
            if (componentRef.current) {
                componentRef.current.style.width = '58mm';
            }
            return Promise.resolve();
        },
        onAfterPrint: () => {
            router.push("/pos");
        }
    });



    useEffect(() => {
        if (paymentType === null) {
            setIsWithoutPaymentType(true);
        } else {
            setIsWithoutPaymentType(false);
        }
    }, [paymentType]);

    useEffect(() => {
        const calculateTotal = () => {
            return saleItems.reduce((total, item) => {
                return total + item.quantity * item.product.price;
            }, 0);
        };

        const calculatePayments = () => {
            return payments.reduce((total, payment) => {
                return total + payment.value;
            }, 0);
        }

        const total = calculateTotal();
        const paymentsTotal = calculatePayments();
        let remainValue = total - paymentsTotal;

        if (remainValue < 0) {
            remainValue = 0
        }

        setRemainValue(remainValue);

    }, [saleItems, payments])

    const removePaymentType = () => {
        setPaymentType(null);
        setPayValue(0)
    }

    const calculateTotal = () => {
        return saleItems.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    const calculatePayments = () => {
        return payments.reduce((total, payment) => {
            return total + payment.value;
        }, 0);
    }

    const hasCompletedSale = () => {
        return remainValue === 0;
    }

    const pay = () => {

        let receivedValue = payValue;

        let remainValue = calculateTotal() - calculatePayments();

        let hasConsumption = paymentType === 5;

        if (receivedValue === 0) {
            receivedValue = remainValue;
        }

        let changeValue = 0;
        setHasChangeValue(false);

        if (remainValue <= 0) {
            return;
        }

        if (paymentType !== 1 && receivedValue > remainValue) {
            alert("Essa forma de pagamento não permite troco");
            return;
        }

        if (receivedValue > remainValue) {
            changeValue = receivedValue - remainValue;
            setHasChangeValue(true);
        }

        if (hasConsumption) {
            setHasConsumption(hasConsumption);
            setPayValue(receivedValue);
            openModal()
        }
        else {
            setChangeValue(changeValue);
            createPayment(receivedValue, changeValue);
            setPayValue(0);
            setPaymentType(null);
        }

        setRemainValue(remainValue);


    }

    const giveChangeValueBack = () => {

        if (!hasChangeValue) return;

        setHasChangeValue(false);
        setChangeValue(0);


    }

    const createPayment = (receivedValue: number, changeValue: number | null, member: Member | null = null) => {
        let value = 0;

        if (changeValue !== null) {

            value = receivedValue - changeValue;

        }

        addPayment({
            receivedValue: receivedValue,
            changeValue: changeValue,
            paymentType: paymentType,
            value: value,
            member: member,
            guid: uuidv4()
        });
    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function finishSale() {

        if (hasChangeValue) return;

        try {
            const data = {
                "saleItems": saleItems.map((saleItem) => ({ "productId": saleItem.product.id, "price": saleItem.product.price, "quantity": saleItem.quantity })),
                "payments": payments.map((payment) => ({ "paymentType": payment.paymentType, "value": payment.value, "member": payment.member }))
            };

            const response = await api.post("/api/sales",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = response.data;

            if (result.isSuccess) {
                setSaleData(result.value);
                setSaleItems([]);
                setPayments([]);
                setSaleSuccessing(true);
                await delay(1500);

                if (componentRef.current) {
                    handlePrint();
                }

            }

        }
        catch (error) {
            console.error(error);

        }


    }





    return (
        <>

            {saleSuccessing && <SaleSucess message="Venda finalizada!" />}
            {hasConsumption && <NewMember closeModal={closeModal} />}
            <div className="hidden">
                <div ref={componentRef}>
                    <PrintableSale sale={saleData} />
                </div>
            </div>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex flex-1">
                    <aside className="w-72 flex flex-col border rounded m-1">
                        <Cart disableRemove={true} />
                    </aside>
                    <main className="flex-1 flex flex-col border rounded m-1">
                        <div className="flex flex-col p-2">
                            <h2>Formas de pagamentos:</h2>
                            <div className="flex items-start mt-1 gap-3">
                                <PaymentType disabled={hasChangeValue || hasCompletedSale() || paymentType === 1} paymenttype={1} className="bg-green-700 text-white border-green-500 hover:bg-green-400"><FontAwesomeIcon icon={faMoneyBill} /> Dinheiro</PaymentType>
                                <PaymentType disabled={hasChangeValue || hasCompletedSale() || paymentType === 2} paymenttype={2} className="bg-cyan-600 text-white border-cyan-300 hover:bg-zinc-300"><FontAwesomeIcon icon={farCreditCard} /> Débito</PaymentType>
                                <PaymentType disabled={hasChangeValue || hasCompletedSale() || paymentType === 3} paymenttype={3} className="bg-blue-800 text-white border-blue-500 hover:bg-blue-500"><FontAwesomeIcon icon={faCreditCard} /> Crédito</PaymentType>
                                <PaymentType disabled={hasChangeValue || hasCompletedSale() || paymentType === 4} paymenttype={4} className="bg-green-900 text-white border-green-500 hover:bg-green-700"><FontAwesomeIcon icon={faPix} /> Pix</PaymentType>
                                <PaymentType disabled={hasChangeValue || hasCompletedSale() || paymentType === 5} paymenttype={5} className="bg-red-600 text-white border-red-500 hover:bg-red-300"><FontAwesomeIcon icon={faAddressCard} /> Pós-pago/fiado</PaymentType>
                            </div>
                        </div>
                        <div className="flex items-start p-2 gap-2">
                            <div className="flex flex-col">
                                <label>Valor a pagar:</label>
                                <CurrencyInput disabled={isWithoutPaymentType} className="w-36 disabled:bg-zinc-300 disabled:text-zinc-400" name="pay-value" />
                            </div>
                            <div className="flex flex-col">
                                <label>Troco:</label>
                                <div className="rounded border border-zinc-400 shadow-sm h-10 p-2 w-36 text-zinc-400">
                                    <CurrencyFormatter value={changeValue} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label>Restam:</label>
                                <div className="rounded border border-zinc-400 shadow-sm h-10 p-2 w-36 text-zinc-400">
                                    <CurrencyFormatter value={remainValue} />
                                </div>
                            </div>
                            <div className="flex flex-col h-full">
                                {hasChangeValue
                                    ? (<button type="button" disabled={!hasChangeValue} className="flex items-center border rounded p-2 h-10 w-full mt-auto gap-1 bg-green-700 border-green-400 hover:bg-blue-300 text-white disabled:bg-zinc-400" onClick={() => giveChangeValueBack()}><FontAwesomeIcon icon={faHandHoldingDollar} />Confirmar troco</button>)
                                    : (<button type="button" disabled={isWithoutPaymentType || hasChangeValue || hasCompletedSale()} className="flex items-center border rounded p-2 h-10 w-full mt-auto gap-1 bg-blue-700 border-blue-400 hover:bg-blue-300 text-white disabled:bg-zinc-400" onClick={() => pay()}><FontAwesomeIcon icon={faWallet} />Pagar</button>)
                                }

                            </div>
                            <div className="flex flex-col h-full">
                                <button type="button" disabled={hasChangeValue} className="flex items-center border rounded p-2 h-10 w-full mt-auto gap-1 bg-zinc-400 border-zinc-700 hover:bg-zinc-200 text-white" onClick={() => removePaymentType()}><FontAwesomeIcon icon={faXmark} />Remover seleção</button>
                            </div>
                        </div>
                        <div className="flex flex-col border-t mt-6">
                            <div className="flex items-center p-2 gap-2">
                                <FontAwesomeIcon icon={faHandHoldingDollar} />
                                Pagamentos
                            </div>
                            <div className="flex flex-col p-2 gap-4 border-t-2 border-b-2 font-bold">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-1 items-center ">
                                        Forma de pagamento
                                    </div>
                                    <div className="flex flex-1">
                                        Valor
                                    </div>
                                    <div className="flex flex-1">
                                        Troco
                                    </div>
                                    <div className="flex flex-1">
                                        Membro
                                    </div>
                                    <div className="flex flex-1 text-center">
                                        <FontAwesomeIcon icon={faGears} />
                                    </div>
                                </div>
                            </div>

                            {payments.map((payment) => (
                                <PaymentItem key={payment.guid} guid={payment.guid} paymentType={payment.paymentType} value={payment.value} changeValue={payment.changeValue} receivedValue={payment.receivedValue} member={payment.member ? payment.member.name : null} />
                            ))}

                        </div>
                        <div className="flex justify-end mt-auto p-2 border-t">
                            <button disabled={!hasCompletedSale()} className={`flex items-center gap-1 border rounded px-2 py-1 font-bold`} type="button" onClick={() => finishSale()}>
                                <FontAwesomeIcon icon={faFlagCheckered} />
                                Finalizar venda
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )


}
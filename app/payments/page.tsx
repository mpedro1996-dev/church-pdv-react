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
import { usePaymentTypeStore, usePayValueStore } from "../lib/zustand"
import { useEffect, useState } from "react"


export default function Payment(){

    const {paymentType, setPaymentType} = usePaymentTypeStore();
    const {payValue, setPayValue} = usePayValueStore();  
    const [isWithoutPaymentType, setIsWithoutPaymentType] = useState(true);


    
    useEffect(() => {
        if (paymentType === null) {          
            setIsWithoutPaymentType(true);
        } else {
            setIsWithoutPaymentType(false);
        }
      }, [paymentType]);
    
    const removePaymentType = () =>{
        setPaymentType(null);
        setPayValue(0)
    }



    return(
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex flex-1">
                <aside className="w-72 flex flex-col border rounded m-1">
                    <Cart disableRemove={true}/>
                </aside>
                <main className="flex-1 flex flex-col border rounded m-1">
                    <div className="flex flex-col p-2">
                        <h2>Formas de pagamentos:</h2>
                        <div className="flex items-start mt-1 gap-3">
                            <PaymentType paymenttype={1} className="bg-green-700 text-white border-green-500 hover:bg-green-400"><FontAwesomeIcon icon={faMoneyBill}/> Dinheiro</PaymentType>
                            <PaymentType paymenttype={2} className="bg-zinc-500 text-white border-zinc-900 hover:bg-zinc-300"><FontAwesomeIcon icon={farCreditCard}/> Débito</PaymentType>
                            <PaymentType paymenttype={3} className="bg-blue-800 text-white border-blue-500 hover:bg-blue-500"><FontAwesomeIcon icon={faCreditCard}/> Crédito</PaymentType>
                            <PaymentType paymenttype={4} className="bg-green-900 text-white border-green-500 hover:bg-green-700"><FontAwesomeIcon icon={faPix}/> Pix</PaymentType>
                            <PaymentType paymenttype={5} className="bg-red-600 text-white border-red-500 hover:bg-red-300"><FontAwesomeIcon icon={faAddressCard}/> Pós-pago/fiado</PaymentType>
                        
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
                                <CurrencyFormatter value={0}/>
                            </div>                            
                        </div>                        
                        <div className="flex flex-col">
                            <label>Restam:</label>
                            <div className="rounded border border-zinc-400 shadow-sm h-10 p-2 w-36 text-zinc-400">
                                <CurrencyFormatter value={7.0}/>
                            </div>
                        </div>                      
                        <div className="flex flex-col h-full">
                            <button type="button" disabled={isWithoutPaymentType} className="flex items-center border rounded p-2 h-10 w-full mt-auto gap-1 bg-blue-700 border-blue-400 hover:bg-blue-300 text-white disabled:bg-zinc-400"><FontAwesomeIcon icon={faWallet}/>Pagar</button>
                        </div>
                        <div className="flex flex-col h-full">
                            <button type="button" className="flex items-center border rounded p-2 h-10 w-full mt-auto gap-1 bg-zinc-400 border-zinc-700 hover:bg-zinc-200 text-white" onClick={() => removePaymentType()}><FontAwesomeIcon icon={faXmark}/>Remover seleção</button>
                        </div>                     
                    </div>    
                    <div className="flex flex-col border-t mt-6">
                        <div className="flex items-center p-2 gap-2">
                            <FontAwesomeIcon icon={faHandHoldingDollar}/>
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
                                    Membro
                                </div>
                                <div className="flex flex-1">
                                <FontAwesomeIcon icon={faGears}/>
                                </div>
                            </div>                                                                
                        </div>  
                        <div className="border-b">
                            <div className="flex items-center justify-between p-2">
                                <div className="flex flex-1 items-center gap-1 ">
                                    <FontAwesomeIcon icon={faPix}/> Pix
                                </div>
                                <div className="flex flex-1">
                                    <CurrencyFormatter value={7.0}/>
                                </div>
                                <div className="flex flex-1">
                                    -
                                </div>
                                <div className="flex flex-1">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </div>
                            </div>
                        </div>
                     </div>
                     <div className="flex justify-end mt-auto p-2 border-t">                   
                            <a href="/payments" className={`flex items-center gap-1 border rounded px-2 py-1 font-bold`} type="button">
                                <FontAwesomeIcon icon={faFlagCheckered}/>
                                Finalizar venda
                            </a>
                        </div>
                </main>
            </div>
        </div>

    )


}
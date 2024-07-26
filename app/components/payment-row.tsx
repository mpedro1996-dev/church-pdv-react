import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaymentResponse } from "../lib/zustand";
import { faAddressCard, faCreditCard, faGears, faMoneyBill, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard as farCreditCard } from "@fortawesome/free-regular-svg-icons"
import { faPix } from "@fortawesome/free-brands-svg-icons";
import CurrencyFormatter from "./currency-formatter";
import { useState } from "react";

interface PaymentRowProps{
    payment: PaymentResponse,
    actionButton: (id: number, paymentType: number) => void;
}

export default function PaymentRow(props:PaymentRowProps){

    const {payment} = props;

    const getPaymentType = () =>{
        switch(payment.paymentType){
            case 1:
                return (<span><FontAwesomeIcon icon={faMoneyBill}/> Dinheiro </span>);            
            case 2:
                return (<span><FontAwesomeIcon icon={farCreditCard}/> Débito</span>);            
            case 3:
                return (<span><FontAwesomeIcon icon={faCreditCard}/> Crédito </span>);
            case 4:
                return (<span><FontAwesomeIcon icon={faPix}/> Pix</span>);
            case 5:
                return(<span><FontAwesomeIcon icon={faAddressCard}/> Pós-pago/fiado</span>)
            default:
                return(<span><FontAwesomeIcon icon={faGears}/> Pagamento desconhecido</span>)

        }
    }

    return(
        <div className="flex flex-row items-center gap-1">
           <span className="flex items-center"> {getPaymentType()}:</span> 
           <CurrencyFormatter value={payment.value}/>
           {payment.canUpdate && <button className="hover:text-blue-400" type="button" onClick={() => props.actionButton(payment.id, payment.paymentType)}><FontAwesomeIcon icon={faPenToSquare}/></button>}
           {payment.member && <span className="flex gap-2 ml-2">|<p className="font-bold">Informações para contato:</p> {payment.member.name} / {payment.member.church} / {payment.member.phoneNumber} </span>}

        </div>
    )

}
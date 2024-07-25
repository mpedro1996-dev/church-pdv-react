import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormatter from "./currency-formatter";
import { faMoneyBill, faCreditCard, faAddressCard, faTrash, faGears } from "@fortawesome/free-solid-svg-icons"
import { faCreditCard as farCreditCard } from "@fortawesome/free-regular-svg-icons"
import { faPix } from "@fortawesome/free-brands-svg-icons";
import { usePaymentStore } from "../lib/zustand";

interface PaymentItemProps {
    paymentType: number | null,
    value: number,
    changeValue: number | null,
    receivedValue: number,
    member: string | null,
    guid: string
}

export default function PaymentItem(props:PaymentItemProps){

    const { removePayment } = usePaymentStore();

    const getPaymentType = () =>{
        switch(props.paymentType){
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

    const handleRemove = () =>{

        removePayment(props.guid)

    }


    return(
        <div className="border-b">
            <div className="flex items-center justify-between p-2">
                <div className="flex flex-1 items-center gap-1 ">
                    {getPaymentType()}
                </div>
                <div className="flex flex-1">
                    <CurrencyFormatter value={props.receivedValue}/>
                </div>
                <div className="flex flex-1">
                    {props.changeValue ? <CurrencyFormatter value={props.changeValue}/> : "-"}            
                </div>
                <div className="flex flex-1">
                    {props.member ? props.member : "-"}
                </div>
                <div className="flex flex-1 text-center">
                    <button className="hover:text-red-600" type="button" onClick={() => handleRemove()}><FontAwesomeIcon icon={faTrash}/></button>
                </div>
            </div>
        </div>
    )
}
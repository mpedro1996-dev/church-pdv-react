import { ComponentProps } from "react";
import { usePaymentTypeStore } from "../lib/zustand";


interface PaymentTypeProps extends ComponentProps<'button'>{
    paymenttype: number;
}

export default function PaymentType(props:PaymentTypeProps){

    const {paymentType, setPaymentType} = usePaymentTypeStore();    

    const HandleClickPaymentType = () => {        
        setPaymentType(props.paymenttype);
    }

    const isPaymentTypeSelected = () => {
        return paymentType === props.paymenttype;
    }


    return(
        <button disabled={isPaymentTypeSelected()} {...props} className={`${props.className} border rounded p-2 w-full disabled:border-zinc-400 disabled:bg-zinc-400 disabled:text-zinc-200`} onClick={() => HandleClickPaymentType()}>{props.children}</button>
    )
}
import { ComponentProps } from "react";

interface PaymentTypeProps extends ComponentProps<'button'>{
    paymentType: number;
}

export default function PaymentType(props:PaymentTypeProps){
    return(
        <button {...props} className={`${props.className} border rounded p-2 w-full`}>{props.children}</button>
    )
}
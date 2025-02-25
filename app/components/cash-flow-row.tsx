import CurrencyFormatter from "./currency-formatter";

interface CashFlowRowProps{
    value: number,
    type: number,
    paymentType: number | null,
    description: string
}

export default function CashFlowRow(props: CashFlowRowProps){

    const {value, type, paymentType, description} = props;

    const convertPaymentType = (paymentType : number) => {

        switch(paymentType)
        {
            case 1: return "Dinheiro";
            case 2: return "Débito";
            case 3: return "Crédito";
            case 4: return "Pix";
            case 5: return "Fiado";
            default: return "Desconhecido";
        }

    };

    const convertType = (type: number) =>{
        switch(type){
            case 0: return "Suplemento";
            case 1: return "Sangria";
            case 2: return "Pagamento";
            case 3: return "Abertura";
            case 4: return "Estorno";
            default: return "Desconhecido";           
        }
    }

    return(
        <div className="flex justify-center p-2 items-left border-b ">
            <p className="flex-1"><CurrencyFormatter value={value}/></p>
            <p className="flex-1">{convertType(type)}</p>
            <p className="flex-1">{paymentType ? convertPaymentType(paymentType) : "-"}</p>
            <p className="flex-1">{description}</p>
        </div> 
    )
}
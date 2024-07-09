
import CurrencyFormatter from "./currency-formatter"
import { faBarcode, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ProductProps{
    name:string;
    barcode:string,
    unitPrice:number
}

export default function Product(props:ProductProps){

    return(
        <div className="flex flex-col w-100 border rounded">
            <div className="p-2">
                <div className="flex font-bold text-sm">
                    {props.name}
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <FontAwesomeIcon icon={faBarcode}/>Codigo: {props.barcode}
                </div>
                <div className="flex text-sm">
                    <CurrencyFormatter value={props.unitPrice}/>
                </div>
            </div>
            <div className="flex items-center justify-center border-t p-2">
                <FontAwesomeIcon icon={faPlus} />
            </div>                            
        </div>
    );

}
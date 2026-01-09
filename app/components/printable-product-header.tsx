import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PrintableProductHeader(){
    return(
        <div className="flex flex-col border-b border-black py-1">
            <h1 className="text-sm font-bold flex gap-1 items-center"><FontAwesomeIcon icon={faCartShopping}/>PRODUTOS</h1>              
        </div>
    )
}
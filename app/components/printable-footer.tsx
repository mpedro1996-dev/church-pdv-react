import { faFacebook, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PrintableFooter(){
    return (
        <>
            <div className="flex justify-center items-center border-b border-black text-center">
            <p className="text-sm font-bold">CUPOM NÃO FISCAL</p>              
            </div> 
            <div className="flex flex-col b border-black">
                <p className="text-xs font-bold">Siga-nos nas redes sociais!</p>  
                <p className="text-lg font-bold flex items-center gap-1"><FontAwesomeIcon icon={faSquareInstagram}/><FontAwesomeIcon icon={faFacebook}/> @iecvroficial</p>              
            </div> 
        </> 
    );
}
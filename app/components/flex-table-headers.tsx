import { faGears } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface FlexTableHeadersProps{
    headers: string[],
    hasActionButton:boolean

}

export default function FlexTableHeaders(props:FlexTableHeadersProps){
    return(
       
            <div className="flex justify-between border-b p-2">
                {props.headers.map((header, index) => (
                    <div key={index} className={`flex-1 font-bold ${index+1 == props.headers.length && !props.hasActionButton ?'text-right':'text-left'}`}>
                        {header}
                    </div>
                ))}
                {props.hasActionButton && (
                    <div className={`flex-1 items-center font-bold text-right`}>
                        <FontAwesomeIcon icon={faGears}/>
                    </div>
                )}                                      
            </div>
        
    )
}
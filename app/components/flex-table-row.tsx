import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface FlexTableRow{
    cells: string[],
    isLast: boolean,
    actionReference: number,
    hasActionButton: boolean,
    hasReprintButton: boolean,
    actionReprint:void
}


export default function FlexTableRow(props:FlexTableRow){
    return(
        
            <div className="flex justify-between border-b p-2">
                {props.cells.map((cell, index) => (
                    <div key={index} className={`flex-1 ${index+1 == props.cells.length && !props.hasActionButton ?'text-right':'text-left'}`}>
                        {cell}
                    </div>
                ))}

                {props.hasReprintButton && (
                    <div  className={`flex-1 text-right`}>
                        <button className="border rounded px-2 py-1 bg-blue-600 text-white" type="button" onClick={()=>props.actionReference}><FontAwesomeIcon icon={faPrint}/></button>
                    </div>
                )}              
                                       
            </div>  
        
    )
}
interface FlexTableRow{
    cells: string[],
    isLast: boolean
}


export default function FlexTableRow(props:FlexTableRow){
    return(
        
            <div className="flex justify-between border-b p-2">
                {props.cells.map((cell, index) => (
                    <div key={index} className={`flex-1 ${index+1 == props.cells.length ?'text-right':'text-left'}`}>
                        {cell}
                    </div>
                ))}               
                                       
            </div>  
        
    )
}
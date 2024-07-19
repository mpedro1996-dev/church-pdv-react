interface FlexTableHeadersProps{
    headers: string[]

}

export default function FlexTableHeaders(props:FlexTableHeadersProps){
    return(
       
            <div className="flex justify-between border-b p-2">
                {props.headers.map((header, index) => (
                    <div key={index} className={`flex-1 font-bold ${index+1 == props.headers.length ?'text-right':'text-left'}`}>
                        {header}
                    </div>
                ))}                                      
            </div>
        
    )
}
import Image from 'next/image';

export default function PrintableLogo(){
    return(
        <div className="flex justify-center items-center flex-col mb-2">
            <Image src="/iecvr.png" alt="Imagem Fixa" width={100} height={100} className="max-w-full h-auto"/>               
        </div>
    )
}
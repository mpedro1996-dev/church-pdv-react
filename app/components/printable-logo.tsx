import Image from 'next/image';

export default function PrintableLogo(){
    return(
        <div className="flex justify-center items-center flex-col mb-2">
            <Image src="/legado.jpg" alt="Imagem Fixa" width={200} height={100} className="max-w-full h-auto"/>
        </div>
    )
}
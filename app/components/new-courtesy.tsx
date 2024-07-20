import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ValidatorMessage from "./validator-message";

const courtesySchema = z.object({   
    ministry: z.string().min(3, "Informe o ministério"),
    quantity: z.number().int().positive("A quantidade deve ser maior que 0 (zero)").min(1, "Informe pela quantidade")
});

type CourtesyFormData = z.infer<typeof courtesySchema>

interface NewCourtesyProps{
    closeModal:() => void;
}

export default function NewCourtesy(props:NewCourtesyProps){

    const { handleSubmit , register, formState:{errors}} = useForm<CourtesyFormData>({       
        resolver:zodResolver(courtesySchema)
    });

    async function emitCourtesy(data:CourtesyFormData){

    }

    return (
        <div className="transition-all fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white w-72 p-4 rounded shadow-lg relative z-10 text-black flex flex-col">
            <div className="border-b rounded p-2 flex justify-between">
                <h1 className="font-semibold">Emissão de cortesia</h1>
                <button onClick={props.closeModal}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <div>
                <form className="flex flex-col gap-2 mt-1" onSubmit={handleSubmit(emitCourtesy)}>
                    <div className="flex flex-col gap-1">
                        <label>Ministério:</label>
                        <select {...register("ministry")} className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" >
                            <option value="">Selecione ministério</option>
                            <option value="MKG">MKG</option>
                            <option value="MAC">MAC</option>
                        </select>
                        {errors.ministry && <ValidatorMessage>{errors.ministry.message}</ValidatorMessage>}

                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Quantidade:</label>
                        <Input register={register("quantity", {valueAsNumber: true})}  name="quantity" type="number" min="0" defaultValue={0}/>
                        {errors.quantity && <ValidatorMessage>{errors.quantity.message}</ValidatorMessage>}
                    </div>
                    <div className="flex flex-row-reverse py-2 px-1 border-t">
                        <button className="bg-blue-700 border rounded border-blue-300 text-white px-2 py-1 flex gap-1 items-center" type="submit"><FontAwesomeIcon icon={faPlus}/>Emitir</button>
                    </div>
                </form>
            </div>

          </div>
        </div>
      );
    
}
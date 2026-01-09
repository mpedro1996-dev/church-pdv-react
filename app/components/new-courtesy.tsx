import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ValidatorMessage from "./validator-message";
import { api } from "../lib/axios";
import { useMinistryStore, useTokenStore } from "../lib/zustand";
import { useEffect, useState } from "react";

const courtesySchema = z.object({
  ministryId: z.number().int().positive().min(1, "Informe o ministério"),
  quantity: z.number().int().positive("A quantidade deve ser maior que 0 (zero)").min(1, "Informe pela quantidade")
});

type CourtesyFormData = z.infer<typeof courtesySchema>

interface NewCourtesyProps {
  closeModal: () => void;
}

export default function NewCourtesy(props: NewCourtesyProps) {

  const { token } = useTokenStore();
  const loading = useUiStore((s) => s.loading);
  const { ministries, setMinistries } = useMinistryStore();





  useEffect(() => {
    async function GetMinistries() {

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await api.get('/api/ministries', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = response.data;

        if (result.isSuccess) {
          setMinistries(result.value);
        }
      } catch (error) {
        console.error('GetMinistries failed!', error);
      }
    }

    GetMinistries();
  }, [token, setMinistries]);

  const { handleSubmit, register, formState: { errors } } = useForm<CourtesyFormData>({
    resolver: zodResolver(courtesySchema)
  });

  async function emitCourtesy(data: CourtesyFormData) {

    try {
      const response = await api.post('/api/courtesies', data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const result = response.data;

      if (result.isSuccess) {
        props.closeModal();
      }
    }
    catch (error) {
      console.error('Login failed', error);
    }

  }

  return (
    <>


      <div className="transition-all fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">

        <div className="bg-white w-72 p-4 rounded shadow-lg relative z-0 text-black flex flex-col">
          <div className="border-b rounded p-2 flex justify-between">
            <h1 className="font-semibold">Emissão de cortesia</h1>
            <button onClick={props.closeModal}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          <div>
            <form className="flex flex-col gap-2 mt-1" onSubmit={handleSubmit(emitCourtesy)}>
              <div className="flex flex-col gap-1">
                <label>Ministério:</label>
                <select {...register("ministryId", { valueAsNumber: true })} className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" >
                  <option value="0">Selecione ministério</option>
                  {ministries.map((ministry) => (<option key={ministry.id} value={ministry.id}>{ministry.acronym}</option>))}
                </select>
                {errors.ministryId && <ValidatorMessage>{errors.ministryId.message}</ValidatorMessage>}

              </div>
              <div className="flex flex-col gap-1">
                <label>Quantidade:</label>
                <Input register={register("quantity", { valueAsNumber: true })} name="quantity" type="number" min="0" defaultValue={0} />
                {errors.quantity && <ValidatorMessage>{errors.quantity.message}</ValidatorMessage>}
              </div>
              <div className="flex flex-row-reverse py-2 px-1 border-t">
                <button className="bg-blue-700 border rounded border-blue-300 text-white px-2 py-1 flex gap-1 items-center" type="submit"><FontAwesomeIcon icon={faPlus} />Emitir</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );

}
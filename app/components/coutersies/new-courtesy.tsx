import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ValidatorMessage from "../validator-message";
import { api } from "../../lib/axios";
import { useMinistryStore, useProductStore, useSessionStore } from "../../lib/zustand";
import { useEffect } from "react";
import ModalEdit from "../forms/modal-edit";
import Form from "../forms/form";
import FormField from "../forms/form-field";
import FormFooter from "../forms/form-footer";
import ConfirmButton from "../forms/confirm-button";

const courtesySchema = z.object({
  ministryId: z.number().int().positive("Informe o ministério"),
  productId: z.number().int().positive("Informe o produto"),
  quantity: z.number().int().positive("A quantidade deve ser maior que 0 (zero)").min(1, "Informe pela quantidade")
});

type CourtesyFormData = z.infer<typeof courtesySchema>

interface NewCourtesyProps {
  closeModal: () => void;
}

export default function NewCourtesy(props: NewCourtesyProps) {

  const { session } = useSessionStore();
  const { ministries, setMinistries } = useMinistryStore();
  const { products, setProducts } = useProductStore();

  useEffect(() => {
    async function GetMinistries() {

      try {
        const response = await api.get('/api/ministries', {
          headers: {
            Authorization: `Bearer ${session?.token}`,
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

    async function GetProducts() {

      try {
        const response = await api.get('/api/products', {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });

        const result = response.data;

        if (result.isSuccess) {
          setProducts(result.value);
        }
      } catch (error) {
        console.error('Products failed!', error);
      }
    }

    GetMinistries();
    GetProducts();
  }, [session?.token, setMinistries, setProducts]);

  const { handleSubmit, register, formState: { errors } } = useForm<CourtesyFormData>({
    resolver: zodResolver(courtesySchema)
  });

  async function emitCourtesy(data: CourtesyFormData) {

    try {
      const response = await api.post('/api/courtesies', data,
        {
          headers: {
            Authorization: `Bearer ${session?.token}`
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

  const filteredProducts = products.filter(p => p.canEmitCourtesy);

  return (




    <ModalEdit onClose={props.closeModal} title="Nova cortesia">
      <Form onSubmit={handleSubmit(emitCourtesy)}>
        <FormField>
          <label>Ministério:</label>
          <select {...register("ministryId", { valueAsNumber: true })} className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" >
            <option value="0">Selecione ministério</option>
            {ministries.map((ministry) => (<option key={ministry.id} value={ministry.id}>{ministry.acronym}</option>))}
          </select>
          {errors.ministryId && <ValidatorMessage>{errors.ministryId.message}</ValidatorMessage>}

        </FormField>
        <FormField>
          <label>Produto:</label>
          <select {...register("productId", { valueAsNumber: true })} className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" >
            <option value="0">Selecione produto</option>
            {filteredProducts.map((product) => (<option key={product.id} value={product.id}>{product.name}</option>))}
          </select>
          {errors.productId && <ValidatorMessage>{errors.productId.message}</ValidatorMessage>}

        </FormField>
        <FormField>
          <label>Quantidade:</label>
          <Input register={register("quantity", { valueAsNumber: true })} name="quantity" type="number" min="0" defaultValue={0} />
          {errors.quantity && <ValidatorMessage>{errors.quantity.message}</ValidatorMessage>}
        </FormField>
        <FormFooter>
          <ConfirmButton><FontAwesomeIcon icon={faSave} />Emitir</ConfirmButton>
        </FormFooter>
      </Form>
    </ModalEdit>
  );
}

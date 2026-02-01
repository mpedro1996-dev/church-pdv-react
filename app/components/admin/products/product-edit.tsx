
import Form from "../../forms/form";
import FormField from "../../forms/form-field";
import ModalEdit from "../../forms/modal-edit"
import Input from "../../input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatorMessage from "../../validator-message";
import FormFooter from "../../forms/form-footer";
import ConfirmButton from "../../forms/confirm-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/app/lib/axios";
import { useProductStore, useTokenStore, useUserStore } from "@/app/lib/zustand";
import { use, useEffect, useMemo, useState } from "react";
import { Product } from "@/app/lib/model";
import CurrencyInput from "../../currency-input";
import { FormCurrencyInput } from "../../forms/form-currency-input";


interface ProductEditProps {

    isEditing: boolean;
    id: number | null;
    onClose: () => void;
};

function makeProductSchema(existingProducts: { barcode: number, id: number }[], editingId: number | null = null) {
    const used = new Set(existingProducts.map(p => p.barcode));

    if (editingId !== null) {
        const editingProduct = existingProducts.find(p => p.id === editingId);
        if (editingProduct) {
            used.delete(editingProduct.barcode);
        }
    }

    return z.object({
        name: z.string().min(3, "Informe o nome"),
        price: z.number().int().positive("O preço deve ser maior que 0 (zero)"),
        barcode: z.coerce.number().int().positive("O código de barras deve ser maior que 0 (zero)"),
        canEmitCourtesy: z.boolean(),
    }).superRefine((data, ctx) => {
        if (used.has(data.barcode)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["barcode"],
                message: "Já existe um produto cadastrado com esse código de barras",
            });
        }
    });
}






type ProductFormData = z.infer<ReturnType<typeof makeProductSchema>>;


export default function ProductEdit(props: ProductEditProps) {

    const { token } = useTokenStore();
    const { isEditing, id } = props;
    const { products, setProducts } = useProductStore();
    const [name, setName] = useState('');
    const [barcode, setBarcode] = useState(1000);
    const [canEmitCourtesy, setCanEmitCourtesy] = useState(false);

    const productSchema = useMemo(() => {
        return makeProductSchema(products, id);
    }, [products]);

    useEffect(() => {

        if (!isEditing || !id) {
            reset({ name: '', price: 0, barcode: 1000, canEmitCourtesy: false });

            setName('');
            setBarcode(1000);
            setCanEmitCourtesy(false);
            return;
        }


        const product = products.find(p => p.id === id);

        if (!product) return;

        setName(product.name);
        setBarcode(product.barcode);
        setCanEmitCourtesy(product.canEmitCourtesy);

        reset(
            { name: product.name ?? '', price: Math.round(product.price * 100) ?? 0, barcode: product.barcode ?? 1000, canEmitCourtesy: product.canEmitCourtesy ?? false }
        );
    }, [isEditing, id, products]);


    const closeModal = () => {
        props.onClose();

    }

    const { control, handleSubmit, register, reset, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema), defaultValues: {
            name: '',
            price: 0,
            barcode: 1000,
            canEmitCourtesy: false
        }
    });

    async function save(data: ProductFormData) {

        data.price = data.price / 100;

        const create = () => {
            const response = api.post('/api/products', data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;
        }

        const update = () => {
            const response = api.put(`/api/products/${props.id}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response;
        }

        try {
            const response = props.isEditing ? await update() : await create();
            const result = response.data;

            if (result.isSuccess) {
                if (props.isEditing) {
                    const updatedProduct: Product = result.value;
                    const updatedProducts = products.map(product =>
                        product.id === updatedProduct.id ? updatedProduct : product
                    );
                    setProducts(updatedProducts);
                } else {
                    const newProduct: Product = result.value;
                    setProducts([...products, newProduct]);
                }

                closeModal();
            }
        }
        catch (error) {
            console.error('Save Product error', error);
        }

    }




    return (
        <ModalEdit onClose={closeModal} title={props.isEditing ? "Editar Produto" : "Novo Produto"}>
            <Form onSubmit={handleSubmit(save)}>
                <FormField>
                    <label>Nome:</label>
                    <Input register={register("name")} name="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                    {errors.name && <ValidatorMessage>{errors.name.message}</ValidatorMessage>}
                </FormField>
                <FormField>
                    <label>Preço:</label>
                    <Controller
                        control={control}
                        name="price"
                        render={({ field }) => (
                            <FormCurrencyInput
                                valueCents={field.value ?? 0}
                                onValueCentsChange={field.onChange}
                                placeholder="R$ 0,00"
                            />
                        )}
                    />

                    {errors.price && <ValidatorMessage>{errors.price.message}</ValidatorMessage>}
                </FormField>
                <FormField>
                    <label>Código de Barras:</label>
                    <Input register={register("barcode")} name="barcode" type="text" value={barcode} onChange={e => setBarcode(Number(e.target.value))} />
                    {errors.barcode && <ValidatorMessage>{errors.barcode.message}</ValidatorMessage>}
                </FormField>
                <FormField className="my-2">
                    <div className="flex items-start gap-2">
                        <Input className="!w-10" register={register("canEmitCourtesy")} name="canEmitCourtesy" type="checkbox" checked={canEmitCourtesy} onChange={e => setCanEmitCourtesy(e.target.checked)} />
                        <label className="my-2">Emitir Cortesia</label>
                    </div>
                </FormField>
                <FormFooter>
                    <ConfirmButton><FontAwesomeIcon icon={faSave} />Salvar</ConfirmButton>
                </FormFooter>
            </Form>

        </ModalEdit>
    );


}
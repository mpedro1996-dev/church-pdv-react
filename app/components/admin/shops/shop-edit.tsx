import { Ministry, Shop, Theme } from "@/app/lib/model";
import Form from "../../forms/form";
import FormField from "../../forms/form-field";
import ModalEdit from "../../forms/modal-edit"
import Input from "../../input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatorMessage from "../../validator-message";
import FormFooter from "../../forms/form-footer";
import ConfirmButton from "../../forms/confirm-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/app/lib/axios";
import { useShopStore, useTokenStore } from "@/app/lib/zustand";
import { use, useEffect, useState } from "react";


interface MinistryEditProps {

    isEditing: boolean;
    id: number | null;
    onClose: () => void;
};

const ministrySchema = z.object({
    name: z.string().min(3, "Informe o nome"),
    logo: z.string().min(3, "Informe a logo"),
});

type MinistryFormData = z.infer<typeof ministrySchema>


export default function ShopEdit(props: MinistryEditProps) {

    const { token } = useTokenStore();
    const { shops, setShops } = useShopStore();
    const { isEditing, id } = props;

    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [themes, setThemes] = useState<Theme[]>([]);


    useEffect(() => {

        async function loadThemes() {

            fetch("/data/themes.json")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setThemes(data.themes)
                });

        }

        loadThemes();



        if (!isEditing || !id) {
            reset({ name: '', logo: '' });

            setName('');
            setLogo('');
            return;
        }


        const shop = shops.find(m => m.id === id);

        if (!shop) return;

        setName(shop.name);
        setLogo(shop.logo);

        reset(
            { name: shop.name ?? '', logo: shop.logo ?? '' }
        );
    }, [isEditing, id, shops, setThemes]);


    const closeModal = () => {
        props.onClose();

    }

    const { handleSubmit, register, reset, formState: { errors } } = useForm<MinistryFormData>({
        resolver: zodResolver(ministrySchema), defaultValues: {
            name: '',
            logo: ''
        }
    });

    async function save(data: MinistryFormData) {
        const create = () => {
            const response = api.post('/api/shops', data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;
        }

        const update = () => {
            const response = api.put(`/api/shops/${props.id}`, data,
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
                    const updatedShop: Shop = result.value;
                    const updatedShops = shops.map(shop =>
                        shop.id === updatedShop.id ? updatedShop : shop
                    );
                    setShops(updatedShops);
                } else {
                    const newShop: Shop = result.value;
                    setShops([...shops, newShop]);
                }

                closeModal();
            }
        }
        catch (error) {
            console.error('Save Shop error', error);
        }

    }


    return (
        <ModalEdit onClose={closeModal} title={props.isEditing ? "Editar Loja" : "Nova Loja"}>
            <Form onSubmit={handleSubmit(save)}>
                <FormField>
                    <label>Nome:</label>
                    <Input register={register("name")} name="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                    {errors.name && <ValidatorMessage>{errors.name.message}</ValidatorMessage>}
                </FormField>
                <FormField>
                    <label>Logo:</label>
                    <select {...register("logo")} className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" name="logo" value={logo} onChange={e => { setLogo(e.target.value); reset({ logo: e.target.value }) }}>
                        <option value="">Selecione um logo</option>
                        {themes.map((t) => (<option key={t.image} value={t.image}>{t.name}</option>))}
                    </select>
                    {errors.logo && <ValidatorMessage>{errors.logo.message}</ValidatorMessage>}
                    {logo && (
                        <div style={{ marginTop: 16 }}>
                            <img src={`/${logo}`} alt={logo} width={200} height={100} />
                        </div>
                    )}

                </FormField>
                <FormFooter>
                    <ConfirmButton><FontAwesomeIcon icon={faSave} />Salvar</ConfirmButton>
                </FormFooter>
            </Form>

        </ModalEdit>
    );


}
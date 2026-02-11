import FlexTableHeaders from "@/app/components/flex-table/flex-table-headers";
import ActivationCodeRow from "../activation-codes/activation-code-row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useProductShopStore, useProductStore, useSessionStore } from "@/app/lib/zustand";
import { api } from "@/app/lib/axios";
import ProductRow from "../../../products/product-row";
import ProductShopRow from "./product-shop-row";

interface TabProductShopsProps {
    shopId: number
}

export default function TabProductShops({ shopId }: TabProductShopsProps) {

    const { session } = useSessionStore();
    const { products, setProducts } = useProductStore();
    const { productShops, setProductShops } = useProductShopStore();
    const [searchTerm, setSearchTerm] = useState('');

    const handleDeleteActivationCode = (id: number) => {
        console.log("Delete activation code with id:", id);
    }

    const headerProducts = [
        "Produtos",
    ];

    const headerProductShops = [
        "Produto adicionados à loja",
    ];


    useEffect(() => {
        async function GetProducts() {

            if (!session?.token) {
                console.error('No token found');
                return;
            }

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
                console.error('GetProducts failed!', error);
            }
        }

        async function GetProductShops() {

            if (!session?.token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await api.get(`/api/product-shops/shop/${shopId}`, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                });

                const result = response.data;

                if (result.isSuccess) {
                    setProductShops(result.value);
                }
            } catch (error) {
                console.error('GetProducts failed!', error);
            }
        }

        GetProducts();
    }, [session?.token, setProducts]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.barcode && product.barcode == Number(searchTerm)) &&
        !productShops.some(ps => ps.id === product.id)
    );

    const filteredProductShops = productShops.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.barcode && product.barcode == Number(searchTerm))
    );

    return (
        <>

            <div className="mx-2 rounded">
                <div className="flex mx-2">
                    <label> Buscar:</label>
                </div>
                <div className="flex flex-row mb-2 mx-2 gap-1">
                    <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" name="ministry-search" className="rounded border border-zinc-400 shadow-sm w-auto grow h-10 px-2" />
                </div>
                <div className="flex flex-row">
                    <div className="mx-2 border rounded w-1/2">
                        <FlexTableHeaders headers={headerProducts} hasActionButton={true} />
                        {filteredProducts.map((product) => (
                            <ProductShopRow key={product.id} product={product} onAdd={() => { }} />
                        ))}
                    </div>
                    <div className="mx-2 border rounded w-1/2">
                        <FlexTableHeaders headers={headerProductShops} hasActionButton={true} />
                        {filteredProductShops.map((product) => (
                            <ProductShopRow key={product.id} product={product} onRemove={() => { }} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}
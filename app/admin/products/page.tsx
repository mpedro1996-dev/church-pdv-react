'use client';

import NavMenu from "@/app/components/admin/navmenu";
import ProductRow from "@/app/components/admin/products/product-row";
import FlexTableHeaders from "@/app/components/flex-table/flex-table-headers";
import { api } from "@/app/lib/axios";
import { Product } from "@/app/lib/model";
import { useProductStore, useTokenStore } from "@/app/lib/zustand";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Products() {

    const { token } = useTokenStore();
    const [searchTerm, setSearchTerm] = useState('');
    const { products, setProducts } = useProductStore();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setSelectedProductId(null);
        setModalOpen(false);
    };

    const handleEditProduct = (productId: number) => {
        setSelectedProductId(productId);
        setModalOpen(true);
    };

    const headers = [
        "Nome",
        "Código de barras",
        "Preço"
    ];


    useEffect(() => {
        async function GetProducts() {

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await api.get('/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
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

        GetProducts();
    }, [token, setProducts]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.barcode && product.barcode == searchTerm)
    );


    async function handleOnChangeActive(productId: number) {

        const product = products.find(m => m.id === productId);
        if (!product) return;


        const callApi = () => {
            var method = product.active ? 'deactivate' : 'active';
            const response = api.delete(`/api/products/${productId}/${method}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;
        }



        try {
            const response = await callApi();
            const result = response.data;

            if (result.isSuccess) {

                const updatedProduct: Product = result.value;
                const updatedProducts = products.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
                setProducts(updatedProducts);
            }
        }
        catch (error) {
            console.error('Product Active error', error);
        }


    }


    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <aside className="w-72 flex flex-col border rounded m-1">
                    <NavMenu selected="products" />
                </aside>
                <main className="flex-1 flex flex-col border rounded p-2 m-1">
                    <div className="flex mx-2">
                        <label> Buscar:</label>
                    </div>
                    <div className="flex flex-row mb-2 mx-2 gap-1">
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" name="ministry-search" className="rounded border border-zinc-400 shadow-sm w-auto grow h-10 px-2" />
                        <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1 w-auto" onClick={() => setModalOpen(true)}><FontAwesomeIcon icon={faPlus} />Novo Produto</button>
                    </div>
                    <div className="mx-2 rounded border-t border-r border-l">
                        <FlexTableHeaders headers={headers} hasActionButton={true} />
                        {filteredProducts.map((product) => (
                            <ProductRow key={product.id} product={product} onChangeActive={() => handleOnChangeActive(product.id)} onEdit={handleEditProduct} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
"use client";
import NavMenu from "@/app/components/admin/navmenu";
import TabActivationCodes from "@/app/components/admin/shops/shop/activation-codes/tab-activation-codes";
import NavShop from "@/app/components/admin/shops/shop/navigation/nav-shop";
import TabProductShops from "@/app/components/admin/shops/shop/product-shops/tab-product-shops";
import { api } from "@/app/lib/axios";
import { Shop } from "@/app/lib/model";
import { useSessionStore } from "@/app/lib/zustand";
import { useEffect, useState } from "react";

export default function ShopPage(

    { params }: { params: { id: number } }

) {
    const { id } = params;

    const { session } = useSessionStore();
    const [shop, setShop] = useState<Shop | null>(null);
    const [tabSelected, setTabSelected] = useState("activation-codes");

    const handleTabSelected = (key: string) => {
        setTabSelected(key);
    }

    useEffect(() => {
        async function GetShops() {

            if (!session?.token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await api.get(`/api/shops/${id}`, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                });

                const result = response.data;

                if (result.isSuccess) {
                    setShop(result.value);
                }
            } catch (error) {
                console.error('GetShops failed!', error);
            }
        }

        GetShops();
    }, [session?.token, setShop]);

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex flex-1">
                    <aside className="w-72 flex flex-col border rounded m-1">
                        <NavMenu selected="shops" />
                    </aside>
                    <main className="flex-1 flex-col border rounded p-2 m-1">
                        <div className="flex-1 p-2 items-start gap-4">
                            <div className="flex flex-1 text-left items-center gap-2 text-xs text-gray-500">
                                <a href="/admin/shops" className="underline underline-offset-4 hover:text-blue-500">Lojas</a> / {shop?.name}
                            </div>
                        </div>
                        <div className="flex-1 p-2 items-start gap-4">
                            <div className="flex flex-1 text-left items-center gap-2">
                                <img src={`/${shop?.logo}`} alt={shop?.name} width={100} height={50} /> {shop?.name}
                            </div>
                        </div>

                        <div className="flex-1 w-1/5">
                            <NavShop selected={tabSelected} OnTabSelected={handleTabSelected} />
                        </div>

                        <div className="flex-1 p-2 items-start gap-4 mt-2">
                            {tabSelected === "activation-codes" && <TabActivationCodes shopId={id} />}
                            {tabSelected === "products" && <TabProductShops />}
                        </div>




                    </main>
                </div>
            </div>
        </>
    );
}


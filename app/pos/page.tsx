'use client'

import Navbar from "../components/navbar";
import Cart from "../components/cart";
import Product from "../components/product";
import { faWallet} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {useProductStore, useSaleItemStore, useTokenStore} from "../lib/zustand"
import { useEffect, useState } from "react";
import {api} from '../lib/axios';
import { useRouter } from 'next/navigation';

export default function Sale(){    
      

    const { token } = useTokenStore();
    const { products, setProducts } = useProductStore();
    const {saleItems} = useSaleItemStore();
    const [searchTerm, setSearchTerm] = useState('');
  
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

    const isDisabled = saleItems.length === 0;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

      if(isDisabled){
        e.preventDefault();
      }

    }
 

    return(
        <>        
            <div className="flex flex-col h-screen">
                <Navbar/>
                <div className="flex flex-1">            
                    <aside className="w-72 flex flex-col border rounded m-1">
                    <Cart disableRemove={false}/>
                    </aside>
                    <main className="flex-1 flex flex-col border rounded m-1">
                        
                        <div className="flex flex-col p-2">
                            <label>Nome do produto ou código:</label>
                            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" name="product-search" className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2"/>
                        </div>
                        <div className="overflow-y-scroll">
                            <div className="grid grid-flow-rows grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2 gap-2 ">
                                {filteredProducts.map((product)=>(
                                    <Product key={product.id} id={product.id} category={product.category} name={product.name} barcode={product.barcode} unitPrice={product.price}/>
                                ))}                   
                               
                            </div>
                        </div>
                        <div className="flex justify-end mt-auto p-2 border-t">                   
                            <a href="/payments" onClick={handleClick} className={`flex items-center gap-1 border rounded px-2 py-1 font-bold ${isDisabled ? 'bg-zinc-400 text-zinc-100' : ' bg-green-500 text-white '}`} type="button">
                                <FontAwesomeIcon icon={faWallet}/>
                                Pagar
                            </a>
                        </div>
                        
                    </main> 
                </div>
            </div>     
        </>
    );
}
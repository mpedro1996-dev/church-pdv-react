'use client'

import Navbar from "../components/navbar";
import Cart from "../components/cart";
import Product from "../components/product";

export default function Sale(){
    return(
        <>        
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex flex-1">            
                <aside className="w-72 flex flex-col border rounded m-1">
                   <Cart/>
                </aside>
                <main className="flex-1 flex flex-col border rounded m-1">
                    
                    <div className="flex flex-col p-2">
                        <label>Nome do produto ou código:</label>
                        <input type="text" name="product-search" className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2"/>
                    </div>
                    <div className="overflow-y-scroll">
                        <div className="grid grid-flow-rows grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2 gap-2 ">
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/> 
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/> 
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/> 
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/> 
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>      
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/> 
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/> 
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/> 
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                            <Product name="Pizza-Frita+Refri" barcode="1000" unitPrice={7.0}/>
                        </div>
                    </div>
                    <div className="flex mt-auto p-2 border-t">                   
                    Botões
                    </div>
                    
                </main> 
            </div>           
                <footer>
                    footer
                </footer>
        </div>
        
        </>
    );
}
'use client'

import { useCallback, useEffect, useState } from "react"
import { api } from "../lib/axios"
import { useSaleStore, useTokenStore } from "../lib/zustand"

import SaleRow from "../components/sales/sale-row"
import UpdatePayment from "../components/sales/update-payment"

export default function Sales() {

  const { token } = useTokenStore();

  const [code, setCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(0);
  const [paymentType, setPaymentType] = useState(0);

  const { sales, setSales } = useSaleStore();




  const openModal = (id: number, paymentType: number) => {
    setId(id);
    setPaymentType(paymentType);
    setModalOpen(true)
  };

  const closeModal = () => {
    setModalOpen(false);
    GetSales();

  }


  const GetSales = useCallback(async () => {

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await api.get('/api/sales', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data;


      if (result.isSuccess) {

        setSales(result.value);

      }
    } catch (error) {
      console.error('GetSales failed!', error);
    }
  }, [token, setSales])



  useEffect(() => {

    GetSales();

  }, [GetSales]);



  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const filteredSales = sales.filter(sale =>

    (sale.code.includes(code))
  );



  return (
    <>

      {modalOpen && <UpdatePayment closeModal={closeModal} id={id} paymentType={paymentType} />}

      <div className="flex flex-col h-screen">
        <div className="flex flex-row w-full items-start justify-center">
          <div className="w-8/12 p-2">
            <div className="flex flex-row gap-2 mb-2">
              <div className="flex flex-col">
                <label>Código da venda:</label>
                <input type="text" name="code" className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" onChange={handleCodeChange} value={code} />

              </div>
            </div>
            <div className="flex flex-col border rounded">
              {filteredSales.map((sale) => (
                <SaleRow key={sale.id} sale={sale} actionButton={openModal} dimissButton={closeModal} />
              ))}



            </div>
          </div>
        </div>
      </div>
    </>




  )
}
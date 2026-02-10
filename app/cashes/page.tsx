'use client'


import { useCallback, useEffect } from "react"
import { api } from "../lib/axios"
import { useCashStore, useSessionStore } from "../lib/zustand"
import CashRow from "../components/cashes/cash-row";


export default function CashFlows() {

  const { session } = useSessionStore();

  const { cashes, setCashes } = useCashStore()





  const GetCashes = useCallback(async () => {

    if (!session?.token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await api.get('/api/cashes', {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      const result = response.data;

      if (result.isSuccess) {
        setCashes(result.value);
      }
    } catch (error) {
      console.error('GetCashes failed!', error);
    }
  }, [session?.token, setCashes])



  useEffect(() => {

    GetCashes();

  }, [GetCashes]);


  return (
    <>


      <div className="flex flex-col h-screen">
        <div className="flex flex-row w-full items-start justify-center">
          <div className="w-8/12 p-2">

            <div className="flex flex-col border rounded">
              {cashes.map((cash) => (
                <CashRow key={cash.id} cash={cash} />
              ))}

            </div>
          </div>
        </div>
      </div>
    </>




  )
}
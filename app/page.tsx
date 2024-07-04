'use client'
import useTokenStore from './lib/zustand';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Navbar from './components/navbar';

export default function Home() {
  const { token, setToken} = useTokenStore();
  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      router.push('/login');
    }
  }, [token, router]);

  return (
    <div className="h-screen flex flex-col gap-2">
      <Navbar/>
      <main className='flex-1'>   
        <h1>Hello World</h1>
      </main>  
    </div>
  );
}

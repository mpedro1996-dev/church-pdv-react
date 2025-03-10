'use client'
import { FieldErrors, useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {api, registerLoadingIndicator} from './lib/axios';
import Input  from './components/input';
import ValidatorMessage from './components/validator-message';
import {useTokenStore, useSaleItemStore, usePaymentTypeStore, usePayValueStore, usePaymentStore} from './lib/zustand';
import { useRouter } from 'next/navigation';
import Loading from './components/loading';
import { useEffect, useState } from 'react';
import CurrencyInput from './components/currency-input';


const loginSchema = z.object({   
    username: z.string().min(3, "Informe nome de usuário"),
    password: z.string().min(4, "Informe a senha")
});

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {

    const { handleSubmit , register, formState:{errors}} = useForm<LoginFormData>({       
        resolver:zodResolver(loginSchema)
    });

    const { setToken} = useTokenStore();
    const { setSaleItems} = useSaleItemStore();
    const {payValue,setPayValue} = usePayValueStore();
    const { setPayments } = usePaymentStore();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Registrar a função setLoading no interceptor
        registerLoadingIndicator(setLoading);
    }, []);

    async function login (data:LoginFormData){    
         
        try
        {
            const response = await api.post('/api/login', {...data,openValue:payValue});            
            const result = response.data;
            

            if(result.isSuccess)
            {
                setToken(response.data.value.authToken);
                setSaleItems([]);
                setPayments([]);
                setPayValue(0)

                router.push('/pos');

            }        
        }
        catch(error)
        {
            console.error('Login failed', error);
        }
    
    }
    
    return (
      <>
      {loading && <Loading message={"Autenticando..."}/>}
        
        
      <div className="flex justify-center items-center h-screen">             

        <div className="bg-white p-8 rounded shadow-lg space-y-3">
            <h1>Login</h1>        

            <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit(login)}>                
                <div className="flex flex-col gap-1">
                   <Input register={register('username')} name="username" type="text" placeholder="Nome de usuário" />
                   {errors.username && <ValidatorMessage>{errors.username.message}</ValidatorMessage>}

                </div>
                <div className="flex flex-col gap-1">
                    <Input register={register('password')} type="password" placeholder="Senha" />
                    {errors.password && <ValidatorMessage>{errors.password.message}</ValidatorMessage>}
                </div>
                <div className="flex items-center flex-row gap-1">
                    <label>Abertura de caixa:</label>
                    <CurrencyInput className="w-36 disabled:bg-zinc-300 disabled:text-zinc-400" name="openValue" />
                </div>
                <button className="bg-sky-400 rounded font-semibold text-white hover:bg-sky-600 p-1" type="submit">Entrar</button>
            </form>
        </div>
        


      </div>
      </>
    );
  }
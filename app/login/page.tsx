'use client'
import { FieldErrors, useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {api} from '../lib/axios';
import Input  from '../components/input';
import ValidatorMessage from '../components/validator-message';
import useTokenStore from '../lib/zustand';
import { useRouter } from 'next/navigation';


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
    const router = useRouter();

    async function login (data:LoginFormData){


        try
        {
            const response = await api.post('/api/login', data);            
            const result = response.data;

            if(result.isSuccess)
            {
                setToken(response.data.value.authToken);
                router.push('/');

            }        
        }
        catch(error)
        {
            console.error('Login failed', error);
        }
    
    }
    
    return (  
      <div className="flex justify-center items-center h-screen">        

        <div className="bg-white p-8 rounded shadow-lg space-y-3">
            <h1>Login</h1>        

            <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit(login)}>                
                <div className='flex flex-col gap-1'>
                   <Input register={register('username')} name="username" type="text" placeholder="Nome de usuário" />
                   {errors.username && <ValidatorMessage>{errors.username.message}</ValidatorMessage>}

                </div>
                <div className='flex flex-col gap-1'>
                    <Input register={register('password')} type="password" placeholder="Senha" />
                    {errors.password && <ValidatorMessage>{errors.password.message}</ValidatorMessage>}
                </div>
                <button className="bg-sky-400 rounded font-semibold text-white hover:bg-sky-600 p-1" type="submit">Entrar</button>
            </form>
        </div>
        


      </div>
    );
  }
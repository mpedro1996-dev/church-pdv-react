'use client'
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {api} from '../lib/axios';


const loginSchema = z.object({   
    username: z.string().min(3, "Informe nome de usuário"),
    password: z.string().min(4, "Informe a senha")
});

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {

    const { handleSubmit , register, formState:{errors}} = useForm<LoginFormData>({       
        resolver:zodResolver(loginSchema)
    });

    async function login (data:LoginFormData){

        try
        {
            const response = await api.post('/api/login', data);
            console.log(response.data);
        }
        catch(error)
        {
            console.error('Login failed', error);
        }


        console.log(data);
    }
    
    return (  
      <div className="flex justify-center items-center h-screen">        

        <div className="bg-white p-8 rounded shadow-lg space-y-3">
            <h1>Login</h1>        

            <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit(login)}>                
                <div className='flex flex-col gap-1'>
                    <input {...register("username")} className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" type="text" placeholder="Nome de usuário"/>
                    {errors.username && <span className="text-red-600 text-xs font-semibold w-full">{errors.username.message}</span>}
                </div>
                <div className='flex flex-col gap-1'>
                    <input {...register("password")} className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" type="password" placeholder="Senha"/>
                    {errors.password && <span className="text-red-600 text-xs font-semibold w-full">{errors.password.message}</span>}
                </div>
                <button className="bg-sky-400 rounded font-semibold text-white hover:bg-sky-600 p-1" type="submit">Entrar</button>
            </form>
        </div>
        


      </div>
    );
  }
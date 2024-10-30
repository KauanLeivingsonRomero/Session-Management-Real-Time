"use client"
import React, { useContext } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import * as z from 'zod';
// import { subscribeUser } from '@/actions/subscribe.action';
import { PusherContext } from '@/context/pusher';

const registerSchema = z.object({
  name: z.string({ required_error: "Digite seu nome" }).min(2, { message: "Digite pelo menos 2 caracteres" }),
  email: z.string({ required_error: "Digite seu email" }).email({ message: "Digite um email valido" }),
  checkbox: z.boolean().optional()
});

const RegisterForm = () => {
  const {setUserName, setUserEmail, setAcompanhante} = useContext(PusherContext)
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) }); 
  
 
  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (data) => {
    setUserName(data.name)
    setUserEmail(data.email)  
    setAcompanhante(data.checkbox)

    

  }

  return (
    <>
      <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} placeholder='Nome' type="text" className='rounded text-xl' />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        <Input {...register("email")} placeholder='Email' type="text" className='rounded text-xl' />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}        
        <div className='flex flex-row text-center justify-center items-center space-x-3 space-y-0 rounded-md border p-4'>
          <input id="checkbox" className='size-4' type="checkbox" {...register("checkbox")}/>
          <label htmlFor="checkbox" className='text-xl'>Acompanhante</label>
        </div>        
        <button className='bg-zinc-950 text-white p-2 rounded text-xl' type="submit">Registrar</button>
      </form>
    </>
  );
}

export default RegisterForm;

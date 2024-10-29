"use client"
import React, { useContext, useEffect } from 'react';
import Sessions from './../../components/sessions/index';
import { PusherContext } from '@/context/pusher';
import { useRouter } from 'next/navigation';

const Horarios = () => {

  const {channel} = useContext(PusherContext)
  const router = useRouter()

  useEffect(() => {
    if(channel == null){
      router.back()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[channel])

  return (
    <div className='flex justify-center items-center h-screen' style={{background: "linear-gradient(146deg, rgba(157,49,221,1) 23%, rgba(25,25,194,1) 87%)"}}>
      <Sessions />
    </div>
  );
}

export default Horarios;
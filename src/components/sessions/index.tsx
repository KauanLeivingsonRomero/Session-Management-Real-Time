import React, { useContext, useState } from 'react';
import axios from 'axios';
import type { sessionType } from '@/types/sessionContextProps';
import { SessionContext } from '@/context/session';
import { PusherContext } from '@/context/pusher';

export default function Sessions() {
  const {menuCount,session17,session18,session19, session20, session21, session22,session17Limit,
    session18Limit,
    session19Limit,
    session20Limit,
    session21Limit,
    session22Limit} = useContext(SessionContext)
  const {acompanhante} = useContext(PusherContext)
  const [block, setBlock] = useState(false)

  

  const subscribeSession = async (item: sessionType) => {  
    
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/proc/Controllers/takeSession.php`, {
      session_id: item.session_id,
      session_time: item.session_time,
      acompanhante: acompanhante
    })
    .then(() => {
      console.log(session17)
      setBlock(true)
    })
  };

  const sessions = [
    {
      session_id: 1,
      session_time: '17:00',
      session_users: session17,
      session_limit: session17Limit
    },
    {
      session_id: 2,
      session_time: '18:00',
      session_users: session18,
      session_limit: session18Limit
    },
    {
      session_id: 3,
      session_time: '19:00',
      session_users: session19,
      session_limit: session19Limit
    },
    {
      session_id: 4,
      session_time: '20:00',
      session_users: session20,
      session_limit: session20Limit
    },
    {
      session_id: 5,
      session_time: '21:00',
      session_users: session21,
      session_limit: session21Limit
    },
    {
      session_id: 6,
      session_time: '22:00',
      session_users: session22,
      session_limit: session22Limit
    }
  ]

  return (
  <>
    
    <div className="flex flex-col p-10 text-black text-center rounded bg-white">
      <div className='flex flex-row gap-2 items-center'>
      {menuCount > 0 ? 
      <>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </> 
      : 
      <>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      </>
      }
      <p className='text-start'>Usuarios ativos: {menuCount}</p>
      </div>
      <h1 className='font-bold text-2xl mb-10'>Sessoes disponiveis</h1>
      <div className='flex flex-wrap gap-4'>
      {sessions.map((item) => {
        
        const vagasRestantes = item.session_limit - item.session_users;
        const isButtonDisabled = acompanhante ? vagasRestantes < 2 : vagasRestantes < 1 || block;

        return (
          <div className='flex gap-2 flex-col' key={item.session_id}>
            <div className='text-center flex items-center justify-center gap-2'>
              {item.session_users > 0 ? 
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </> 
                : 
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </>
              }
              <div>{item.session_users}</div>
            </div>
            <button
              disabled={isButtonDisabled}
              key={`session_${item.session_time}`}
              id={`session_${item.session_time}`}
              onClick={() => subscribeSession(item)}
              className='rounded ring-2 ring-blue-500 p-6 active:bg-blue-200 hover:bg-blue-100 disabled:opacity-50 disabled:bg-zinc-600 disabled:border-red-500'
            >
              <h2>{item.session_time}</h2>
            </button>
          </div>
        );
      })}
      </div>
      </div>
    </>
  );
}

import React, { useContext } from 'react';
import axios from 'axios';
import type { sessionType } from '@/types/sessionContextProps';
import { SessionContext } from '@/context/session';
import { PusherContext } from '@/context/pusher';

export default function Sessions() {
  const {menuCount,session17,session18,session19, session20, session21, session22} = useContext(SessionContext)
  const {acompanhante} = useContext(PusherContext)

  

  const subscribeSession = async (item: sessionType) => {  
    
    await axios.post('http://localhost:3333/proc/Controllers/takeSession.php', {
      session_id: item.session_id,
      session_time: item.session_time,
      acompanhante: acompanhante
    })
    .then(() => {
      console.log(session17)
    })
  };

  const sessions = [
    {
      session_id: 1,
      session_time: '17:00',
      session_users: session17,
    },
    {
      session_id: 2,
      session_time: '18:00',
      session_users: session18,
    },
    {
      session_id: 3,
      session_time: '19:00',
      session_users: session19,
    },
    {
      session_id: 4,
      session_time: '20:00',
      session_users: session20,
    },
    {
      session_id: 5,
      session_time: '21:00',
      session_users: session21,
    },
    {
      session_id: 6,
      session_time: '22:00',
      session_users: session22,
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
       {sessions.map((item) => (
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
              
              <div className=''>{item.session_users}</div>
            </div>
              <button disabled={item.session_users >= 10} key={'session_${item.session_time}'} id={'session_${item.session_time}'} onClick={() => subscribeSession(item)} className='rounded ring-2 ring-blue-500 p-6 active:bg-blue-200 hover:bg-blue-100 disabled:opacity-50 disabled:bg-zinc-600 disabled:border-red-500'>
                <h2>{item.session_time}</h2>
              </button>
            </div>
            ))
          }
      </div>
      </div>
    </>
  );
}

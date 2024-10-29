"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import type { SessionContextProps, SessionProviderProps, sessionType } from '@/types/sessionContextProps';
import { PusherContext } from './pusher';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export const SessionContext = createContext<SessionContextProps>({
  menuCount: 0,
  setMenuCount: () => {},
  session17: 0,
  setSession17: () => {},
  session18: 0,
  setSession18: () => {},
  session19: 0,
  setSession19: () => {},
  session20: 0,
  setSession20: () => {},
  session21: 0,
  setSession21: () => {},
  session22: 0,
  setSession22: () => {},
});

const SessionProvider = ({ children }: SessionProviderProps) => {

  const [menuCount, setMenuCount] = useState<number>(0);
  const [session17, setSession17] = useState<number>(0);
  const [session18, setSession18] = useState<number>(0);
  const [session19, setSession19] = useState<number>(0);
  const [session20, setSession20] = useState<number>(0);
  const [session21, setSession21] = useState<number>(0);
  const [session22, setSession22] = useState<number>(0);
  const {channel} = useContext(PusherContext)

  const router = useRouter()

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/proc/Controllers/session.php`);
        const sessions = response.data
        sessions.forEach((session: sessionType) => {
          switch (session.session_time) {
            case '17:00':
              setSession17(session.session_users);
              break;
            case '18:00':
              setSession18(session.session_users);
              break;
            case '19:00':
              setSession19(session.session_users);
              break;
            case '20:00':
              setSession20(session.session_users);
              break;
            case '21:00':
              setSession21(session.session_users);
              break;
            case '22:00':
              setSession22(session.session_users);
              break;
            default:
              break;
          }
        });
      } catch (error) {
        console.error('Erro ao buscar sessões:', error);
      }
    };
    fetchSessions(); 
  }, []);

  useEffect(() => {
    channel?.bind("pusher:subscription_succeeded", (data: any) => {
      setMenuCount(data.count);  
      router.replace("/horarios");
    });  
    channel?.bind('pusher:member_added', () => {
      setMenuCount((prevCount) => prevCount + 1); // Increment user count when a user joins
      console.log("Member added");
    });  
    channel?.bind('pusher:member_removed', () => {     
      setMenuCount((prevCount) => prevCount - 1); 
      console.log("Member removed");
    });

    channel?.bind("client-consume", (data: sessionType) => {
      console.log(data)
      if(data.acompanhante){
        switch (data.session_time) {
          case "17:00":
            setSession17((previous) => previous + 2);
            break;
          case '18:00':
            setSession18((previous) => previous + 2);
            break;
          case '19:00':
            setSession19((previous) => previous + 2);
            break;
          case '20:00':
            setSession20((previous) => previous + 2);
            break;
          case '21:00':
            setSession21((previous) => previous + 2);
            break;
          case '22:00':
            setSession22((previous) => previous + 2);
            break;
          default:
            break;
        }
      }else{
        switch (data.session_time) {
          case "17:00":
            setSession17((previous) => previous +1);
            break;
          case '18:00':
            setSession18((previous) => previous + 1);
            break;
          case '19:00':
            setSession19((previous) => previous + 1);
            break;
          case '20:00':
            setSession20((previous) => previous + 1);
            break;
          case '21:00':
            setSession21((previous) => previous + 1);
            break;
          case '22:00':
            setSession22((previous) => previous + 1);
            break;
          default:
            break;
        }
      }
      
    }) 
  }, [channel]);

  
  
  return (
    <SessionContext.Provider value={{menuCount, setMenuCount,session17, setSession17,session18, setSession18,session19, setSession19, session20, setSession20, session21,setSession21, session22, setSession22}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

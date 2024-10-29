"use client"

import { createContext, useEffect, useState } from 'react';
import type { PusherContextProps, PusherProviderProps } from '@/types/pusherContextProps';
import Pusher, { Channel } from 'pusher-js';


export const PusherContext = createContext<PusherContextProps>({
  pusher: null,
  setPusher: () => {},
  channel: null,
  setChannel: () => {},
  pusherAcomp: null,
  setPusherAcomp: () => {},
  channelAcomp: null,
  setChannelAcomp: () => {},
  userName: '',
  setUserName: () => {},
  userEmail: '',
  setUserEmail: () => {},
  acompanhante: false,
  setAcompanhante:  () => {}
});



const PusherProvider = ({ children }: PusherProviderProps) => {
  const [pusher, setPusher] = useState<Pusher | any>(null);
  const [pusherAcomp, setPusherAcomp] = useState<Pusher | any>(null)
  const [channel, setChannel] = useState<Channel | any>(null);
  const [channelAcomp, setChannelAcomp] = useState<Channel | any>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [acompanhante, setAcompanhante] = useState<boolean | undefined>(false);

  Pusher.logToConsole = true
  
  useEffect(() => {
    if (userName && userEmail && acompanhante) {
      console.log("teste com acompanhante")
      const pusherInstance = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_KEY}`, {
        cluster: `${process.env.NEXT_PUBLIC_PUSHER_CLUSTER}`,
        authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/proc/Controllers/server.php`,
        auth: {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            name: userName,
            email: userEmail,
            acompanhante: acompanhante,
          },
        },
      });
      const pusherAcomp = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_KEY}`, {
        cluster: `${process.env.NEXT_PUBLIC_PUSHER_CLUSTER}`,
        authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}proc/Controllers/server.php`,
        auth: {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            name: `${userName}_acomp`,
            email: `${userEmail}_acomp`,
          },
        },
      });
      pusherInstance.connection.bind('connected', () => {
        const channelInstance = pusherInstance.subscribe(`presence-menu-channel`);
        setChannel(channelInstance);
      })     
      pusherAcomp.connection.bind('connected', () => {
        const channelInstance = pusherAcomp.subscribe(`presence-menu-channel`);
        setChannelAcomp(channelInstance);
      })     

      setPusher(pusherInstance);
      setPusherAcomp(pusherAcomp)
      
      return () => {
        pusherInstance.disconnect();
      };

    }

    if(userName && userEmail){
      console.log("teste sem acompanhante")
      const pusherInstance = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_KEY}`, {
        cluster: `${process.env.NEXT_PUBLIC_PUSHER_CLUSTER}`,
        authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}proc/Controllers/server.php`,
        auth: {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            name: userName,
            email: userEmail,
          },
        },
      });
      pusherInstance.connection.bind('connected', () => {
        const channelInstance = pusherInstance.subscribe(`presence-menu-channel`);
        setChannel(channelInstance);
      })     
      
      setPusher(pusherInstance);
      
      return () => {
        pusherInstance.disconnect();        
      };
    }
  }, [userName, userEmail, acompanhante]);
  
  return (
    <PusherContext.Provider value={{pusher, setPusher, channel, setChannel, userName, setUserName, userEmail, setUserEmail, acompanhante, setAcompanhante, pusherAcomp, setPusherAcomp, channelAcomp, setChannelAcomp}}>
      {children}
    </PusherContext.Provider>
  );
};

export default PusherProvider;

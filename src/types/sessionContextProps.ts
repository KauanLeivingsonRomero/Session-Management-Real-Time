import { SetStateAction, type ReactNode } from "react"

export interface SessionContextProps{  
  menuCount: number;
  setMenuCount: React.Dispatch<SetStateAction<number>>;
  session17: number;
  setSession17: React.Dispatch<SetStateAction<number>>;
  session18: number;
  setSession18: React.Dispatch<SetStateAction<number>>;
  session19: number;
  setSession19: React.Dispatch<SetStateAction<number>>;
  session20: number;
  setSession20: React.Dispatch<SetStateAction<number>>;
  session21: number;
  setSession21: React.Dispatch<SetStateAction<number>>;
  session22: number;
  setSession22: React.Dispatch<SetStateAction<number>>;
}

export type sessionType = {
  session_id: number,
  session_time: string,
  session_users: number,
  acompanhante?: boolean | undefined
}

export interface SessionProviderProps{
  children: ReactNode
}
import React from 'react';

// import { Container } from './styles';

const Finish = async ({params}: {params: Promise<{session_time: string}>}) => {
  const session_time = (await params).session_time
  return(
    <div className='flex justify-center items-center h-screen' style={{background: "linear-gradient(146deg, rgba(157,49,221,1) 23%, rgba(25,25,194,1) 87%)"}}>
      <div className="flex flex-col p-10 text-black text-center rounded bg-white">
        <h1 className='font-bold'>Inscricao confirmada</h1>
        <p>Sua sessao sera as {session_time.split("%3A")[0]}:00</p>
      </div>
    </div>
  );
}

export default Finish;
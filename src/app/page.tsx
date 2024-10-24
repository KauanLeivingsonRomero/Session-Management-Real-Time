import RegisterForm from './../components/registerForm/index';

export default function Home() {
  return (
    <div className="flex justify-center items-center w-screen h-screen" style={{background: "linear-gradient(146deg, rgba(157,49,221,1) 23%, rgba(25,25,194,1) 87%)"}}>
      <div className="bg-white text-black rounded flex flex-col p-10 gap-5 align-center text-center -mt-[200px] ">  
        <h1 className='font-bold text-xl'>Registrar</h1>
        <RegisterForm />
      </div>
    </div>
  );
}

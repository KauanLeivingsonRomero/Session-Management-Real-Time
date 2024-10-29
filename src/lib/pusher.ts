// import PusherServer from "pusher";
// import Pusher from "pusher-js";

// Pusher.logToConsole = true

// export const pusherServer = new PusherServer({
//   appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
//   key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
//   secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
//   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
// })

// export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!,{
//   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
//   authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}proc/Controllers/server.php`,
//   auth: {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: {
//       name: 'teste',
//       email: 'teste@teste.com',
//       acompanhante: false
//     },
//   },
// })
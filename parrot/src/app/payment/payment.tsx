// "use client"
// import PaymentCard from "@/components/PaymentCard";
// import { useState } from "react";
// import usePostPayment from "../hooks/usePostPayment";


// export default function PaymentPage() {


//   return (
//     <div className = "pay-main" id = "container">
//         {!iframeSrc && (
//             <>
//                 <div className='flex justify-evenly items-center h-full'>
//                     <PaymentCard category='Free' ammount={0} handelClick={handelClick}/>
//                     <PaymentCard category='Professional' ammount={30} handelClick={handelClick}/>
//                     <PaymentCard category='Enterprise' ammount={60} handelClick={handelClick}/>
//                 </div>
//             </>
//         )}
        
//         {iframeSrc && (
//             <iframe src={iframeSrc} width={window.innerWidth} height={window.innerHeight}></iframe>
//         )}
//     </div>
//   )
// }

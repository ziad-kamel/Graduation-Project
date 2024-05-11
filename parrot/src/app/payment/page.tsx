import PaymentCard from '@/components/PaymentCard';
import { currentUser } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata:Metadata={
    title:"Payment",
    icons: 'parrot.svg'
  }

  
  export default async function Payment() {
    const user = await currentUser();
    
  return (
    <div className='flex justify-evenly items-center h-full'>
    <PaymentCard category='Free' ammount={0} first_name={user?.firstName!} last_name={user?.lastName!} email={user?.emailAddresses[0].emailAddress!} />
    <PaymentCard category='Professional' ammount={30} first_name={user?.firstName!} last_name={user?.lastName!} email={user?.emailAddresses[0].emailAddress!}  />
    <PaymentCard category='Enterprise' ammount={60} first_name={user?.firstName!} last_name={user?.lastName!} email={user?.emailAddresses[0].emailAddress!}  />

    </div>
  )
}

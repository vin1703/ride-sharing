// 'use client'
import { useEffect,useLayoutEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';


type ComponentType = React.ComponentType<any>;


export default function withAuth<P>(WrappedComponent: ComponentType) {
  return function ProtectedComponent(props: P) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(false);
    const router = useRouter();
    const userId = useAppSelector(state=>state.passenger.id);
    const driverId = useAppSelector(state=>state.driver.id);
    useEffect(() => {
      
      if(driverId===''&&userId===''){
        router.push('/login')
      }
      else{
        setIsAuthenticated(true)
      }


    }, [router]);

    if (!isAuthenticated) {
      return <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white flex justify-center items-center">Loading...</div>; 
    }

    return <WrappedComponent {...props} />;
  };
}

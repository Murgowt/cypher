import { FC, useEffect, useState } from 'react';
import CypherDashboardSection from '../../components/sections/CypherDashboardSection';
import { useAuthStore } from '../../helpers/authStore';
import { ERRORS } from '../../constants/app';
import { isAxiosError } from 'axios';
import { CYPHERORDERS_REQUEST } from '../../services/cypher';
import { CypherOrdersResponse } from '../../interfaces/apis/cypherapis';

interface CypherDashboardProps{}

const CypherDashboard: FC<CypherDashboardProps> =()=>{
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [apiError, setApiError] = useState<string | null>(null);
    
    const [allOrders, setallOrders] = useState<CypherOrdersResponse>({ pendingOrders: [], activeOrders: [], completedOrders: []});

    useEffect(() => {
        const getDashboardData = async () => {
          if (isAuthenticated) {
            try {
              const res = await CYPHERORDERS_REQUEST(authToken!, user!.role);
              if (res.status === 200) {
                const allOrdersResponse: CypherOrdersResponse = res.data;
                setallOrders(allOrdersResponse)
                setApiError(null);
              }
            } catch (error) {
              if (isAxiosError(error)) {
                const status = error.response?.status;
                if (status === 401) {
                  setApiError( error.response?.data?.error || error.response?.data?.message || ERRORS.SERVER_ERROR );
                } else {
                  setApiError(ERRORS.SERVER_ERROR);
                }
              } else {
                setApiError(ERRORS.SERVER_ERROR);
              }
            }
          } 
          else {
            setApiError(ERRORS.AUTHENTICATION_ERROR);
          }
        };
        getDashboardData();
      }, 
      [authToken, isAuthenticated]
      );

      const allOrdersArray = [...allOrders.pendingOrders,...allOrders.activeOrders,...allOrders.completedOrders];
      const sortedOrders = allOrdersArray.sort((a, b) => b.creationtimestamp - a.creationtimestamp);
      const recentOrders = sortedOrders.slice(0, 6);

    return (
    <>
        {apiError ? (
            <p>Something went wrong</p>
          ) : (
            <>
              <CypherDashboardSection allOrders={allOrders} recentOrders={recentOrders}/>
            </>
          )}
    </>
    )
}

export default CypherDashboard;
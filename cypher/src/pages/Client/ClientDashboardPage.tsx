import { FC, useEffect, useState } from 'react';
import ClientDashboardSection from '../../components/sections/ClientDashboardSection';

import { useAuthStore } from '../../store/authStore';
import { CLIENT_SIGNIN, CLIENT_DASHBOARD } from '../../constants/routes.ui';
import { ERRORS, MESSAGES } from '../../constants/app';
import ErrorBox from '../../components/organisms/ErrorBox';
import { isAxiosError } from 'axios';
import { ALLORDERS_REQUEST } from '../../services/client';
import { AllOrdersResponse } from '../../interfaces/apis/client';

interface ClientDashboardProps{}

const ClientDashboard: FC<ClientDashboardProps> =()=>{
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);
    const [fallBackLink, setFallBackLink] = useState<string>(CLIENT_DASHBOARD);
    const [fallBackAction, setFallBackAction] = useState<string>(
      MESSAGES.TRY_AGAIN
    );
    const [allOrders, setallOrders] = useState<AllOrdersResponse>({ openOrders: [], activeOrders: [], completedOrders: []
    });

    useEffect(() => {
        const getDashboardData = async () => {
          if (isAuthenticated) {
            try {
              const res = await ALLORDERS_REQUEST(authToken!);
              if (res.status === 200) {
                const allOrdersResponse: AllOrdersResponse = res.data;
                setallOrders(allOrdersResponse)
                setApiError(null);
              }
            } catch (error) {
              if (isAxiosError(error)) {
                const status = error.response?.status;
                if (status === 401) {
                  setApiError( error.response?.data?.error || error.response?.data?.message || ERRORS.SERVER_ERROR );
                  setFallBackLink(CLIENT_SIGNIN);
                  setFallBackAction(MESSAGES.GO_LOGIN);
                } else {
                  setApiError(ERRORS.SERVER_ERROR);
                }
              } else {
                setApiError(ERRORS.SERVER_ERROR);
              }
            } finally {
              setLoading(false);
            }
          } else {
            setLoading(false);
            setApiError(ERRORS.AUTHENTICATION_ERROR);
            setFallBackLink(CLIENT_SIGNIN);
            setFallBackAction(MESSAGES.GO_LOGIN);
          }
        };
        getDashboardData();
      }, [authToken, isAuthenticated]);

    return (
    <>
        {apiError ? (
            <>
              {/* <Navigate to={fallBackLink}/> */}
              <ErrorBox
                errorMessage={apiError}
                link={fallBackLink}
                buttonText={fallBackAction}
              />
            </>
          ) : (
            <>
              <ClientDashboardSection user={user} allOrders={allOrders}/>
            </>
          )}
    </>
    )
}

export default ClientDashboard;
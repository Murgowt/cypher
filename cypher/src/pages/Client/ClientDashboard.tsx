import {FC} from 'react';
import ClientDashboardSection from '../../components/sections/ClientDashboardSection';
//import { ClientDashboardStringParams } from '../../interfaces/RouteParams';
//import { useParams } from 'react-router-dom';

interface ClientDashboardProps{}

const ClientDashboard: FC<ClientDashboardProps> =()=>{
    //const params = useParams<ClientDashboardStringParams>();
    return (<><ClientDashboardSection/></>)
}

export default ClientDashboard;
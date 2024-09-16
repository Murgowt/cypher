import { FC, useState, useEffect } from 'react';
import axios from "../../helpers/axios";

interface ApprovalsPageProps {}

interface ClientData {
  emaill: string;
  mobile: string;
}

interface OrderData {
  id: string;
  clientId: string;
  wizardId: string;
  title: string;
  finalPrice: number;
}

interface PendingOrder {
  client: ClientData;
  order: OrderData;
}

interface ApiResponse {
  pendingOrders: PendingOrder[];
}

const ApprovalsPage: FC<ApprovalsPageProps> = () => {
  const [orders, setOrders] = useState<PendingOrder[]>([]);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      let response = await axios.get<ApiResponse>('/pendingpaymentorders');
      console.log(response)
      setOrders(response.data.pendingOrders.filter(order => order.order && order.client));
    } catch (error) {
      console.error('Something went wrong');
    }
  };

  const handleApprove = async (orderId: string) => {
    try {
      console.log(orderId)
      const response = await axios.post('/confirmpayment', { orderId: orderId });
      if (response.status === 200) {
        console.log('Payment approved successfully');
        setOrders(orders.filter(order => order.order.id !== orderId));
      }
    } catch (error) {
      console.error('Something went wrong');
    }
  };

  return (
    <div className="container p-4 min-w-full max-w-full">
      <h1 className="text-2xl font-bold my-8">Pending Approvals</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-x-darkpurple table-fixed">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="w-1/6 px-6 py-3 text-sm">Order ID</th>
              <th className="w-1/6 px-6 py-3 text-sm">Order Title</th>
              {/* <th className="w-1/8 px-6 py-3 text-sm">Client ID</th>
              <th className="w-1/8 px-6 py-3 text-sm">Wizard ID</th> */}
              <th className="w-1/6 px-6 py-3 text-sm">Client Email</th>
              <th className="w-1/6 px-6 py-3 text-sm">Client Mobile</th>
              <th className="w-1/6 px-6 py-3 text-sm">Final Price</th>
              <th className="w-1/6 px-6 py-3 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((pendingOrder) => (
              <tr key={pendingOrder.order.id} className="hover:bg-skillPurple">
                <td className="px-6 py-4">
                  <div className="flex justify-center text-sm truncate">{pendingOrder.order.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center text-sm truncate">{pendingOrder.order.title}</div>
                </td>
                {/* <td className="px-6 py-4">
                  <div className="flex justify-centertext-sm truncate">{pendingOrder.order.clientId}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center text-sm truncate">{pendingOrder.order.wizardId}</div>
                </td> */}
                <td className="px-6 py-4">
                  <div className="flex justify-center text-sm truncate">{pendingOrder.client.emaill}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center text-sm truncate">{pendingOrder.client.mobile}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center text-sm truncate">${pendingOrder.order.finalPrice}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleApprove(pendingOrder.order.id)}
                      className="bg-primary hover:bg-blue text-white font-bold py-1 px-2 rounded text-sm"
                    >
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalsPage;
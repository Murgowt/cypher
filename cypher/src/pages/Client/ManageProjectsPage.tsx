import { FC, useState, useEffect } from 'react';
import ProjectDescriptionCard from '../../components/molecules/ProjectDescriptionCard';
import { useAuthStore } from '../../helpers/authStore';
import { ERRORS } from '../../constants/app';
import { isAxiosError } from 'axios';
import { ALLORDERS_REQUEST } from '../../services/client';
import { AllOrdersResponse } from '../../interfaces/apis/client';

interface ManageProjectsPageProps{}

const ManageProjectsPage: FC<ManageProjectsPageProps> = () => {

    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [apiError, setApiError] = useState<string | null>(null);
    
    const [allOrders, setallOrders] = useState<AllOrdersResponse>({ openOrders: [], activeOrders: [], completedOrders: []
    });

    useEffect(() => {
        const getDashboardData = async () => {
          if (isAuthenticated) {
            try {
              const res = await ALLORDERS_REQUEST(authToken!, user!.role);
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
                } else {
                  setApiError(ERRORS.SERVER_ERROR);
                }
              } else {
                setApiError(ERRORS.SERVER_ERROR);
              }
            }
          } else {
            setApiError(ERRORS.AUTHENTICATION_ERROR);
          }
        };
        getDashboardData();
      }, [authToken, isAuthenticated]);


    const [projects, setProjects] = useState<any[]>(allOrders.activeOrders);
    const [selectedStatus, setSelectedStatus] = useState('active');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 3;
    

    useEffect(() => {
            switch (selectedStatus) {
                case 'open': setProjects(allOrders.openOrders);
                    break;
                case 'active': setProjects(allOrders.activeOrders);
                    break;
                case 'completed': setProjects(allOrders.completedOrders);
                    break;
                default: setProjects(allOrders.activeOrders);
            }
    }, [selectedStatus]);

    const handleStatusChange = (newStatus: string) => {
        setSelectedStatus(newStatus);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const lastIndex = currentPage * projectsPerPage;
    const firstIndex = lastIndex - projectsPerPage;
    const currentProjects = projects.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    return (
        <>{apiError ? <p>Something went wrong</p> :
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-secondary font-abhaya pb-6">Projects</h1>
            <div className="flex">
                <button onClick={() => handleStatusChange('active')} 
                    className={`px-4 py-2 rounded text-secondary font-abhaya border border-grey border-opacity-10 ${selectedStatus === 'active' ? 'bg-skillPurple' : 'bg-white'}`}>
                    Active Projects
                </button>
                <button onClick={() => handleStatusChange('completed')} 
                    className={`px-4 py-2 rounded text-secondary font-abhaya border border-grey border-opacity-10 ${selectedStatus === 'completed' ? 'bg-skillPurple' : 'bg-white'}`}>
                    Completed Projects
                </button>
                <button onClick={() => handleStatusChange('open')} 
                    className={`px-4 py-2 rounded text-secondary font-abhaya border border-grey border-opacity-10 ${selectedStatus === 'open' ? 'bg-skillPurple' : 'bg-white'}`}>
                    Pending Projects
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6 bg-skillPurple p-8">
                {currentProjects.length > 0 ? (currentProjects.map(project => (<ProjectDescriptionCard key={project.id} project={project} />))) : (<p className="p-8 rounded-md bg-white shadow-md font-abhaya"> No projects yet </p>)}
            </div>
            <div className="flex justify-center mt-4 font-abhaya text-md">
                <button 
                    onClick={handlePreviousPage} 
                    className="px-2 py-1 mr-2 text-secondary" 
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-2 ${currentPage === i + 1 ? 'font-bold' : 'opacity-30'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button 
                    onClick={handleNextPage} 
                    className="px-2 py-1 ml-2 text-secondary" 
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
        }
        </>
        
    );
};

export default ManageProjectsPage;

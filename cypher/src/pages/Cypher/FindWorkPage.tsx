import { FC, useState, useEffect } from 'react';
import ProjectDescriptionCard from '../../components/molecules/ProjectDescriptionCard';
import { useAuthStore } from '../../helpers/authStore';
import { ERRORS } from '../../constants/app';
import { isAxiosError } from 'axios';
import { FINDWORK_REQUEST } from '../../services/cypher';
import { FindOrdersResponse } from '../../interfaces/apis/cypherapis';

interface ManageProjectsPageProps {}

const ManageProjectsPage: FC<ManageProjectsPageProps> = () => {

    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [allOrders, setAllOrders] = useState<FindOrdersResponse>({ openOrders: [] });
    const [projects, setProjects] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 3;

    useEffect(() => {
        const getDashboardData = async () => {
            if (isAuthenticated) {
                try {
                    const res = await FINDWORK_REQUEST(authToken!, user!.role);
                    if (res.status === 200) {
                        const findOrdersResponse: FindOrdersResponse = res.data;
                        setAllOrders(findOrdersResponse);
                        setApiError(null);
                    }
                } catch (error) {
                    if (isAxiosError(error)) {
                        const status = error.response?.status;
                        if (status === 401) {
                            setApiError(error.response?.data?.error || error.response?.data?.message || ERRORS.SERVER_ERROR);
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
            setLoading(false);
        };
        getDashboardData();
    }, [authToken, isAuthenticated]);

    useEffect(() => {
        setProjects(allOrders.openOrders);
    }, [allOrders]);

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
        <>
            {loading ? (
                <></>
            ) : apiError ? (
                <p>Something went wrong</p>
            ) : (
                <div className="px-20">
                    <h1 className="text-2xl text-secondary font-abhaya pb-6">Find Work</h1>
                    <div className="grid grid-cols-1 gap-6 py-8">
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project) => (
                                <ProjectDescriptionCard key={project.id} project={project} />
                            ))
                        ) : (
                            <p className="p-8 rounded-md bg-white shadow-md font-abhaya">No projects yet</p>
                        )}
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
            )}
        </>
    );
};

export default ManageProjectsPage;

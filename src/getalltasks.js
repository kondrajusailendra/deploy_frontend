import { useEffect, useState } from "react";
import axios from "axios";
import Details from "./components/details";
import Table from 'react-bootstrap/Table';

function Get() {
    const [details, setDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to format ISO date string
    const formatDate = (isoDate) => {
        const dateObj = new Date(isoDate);
        if (isNaN(dateObj.getTime())) {
            return "Invalid Date";
        }
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://deploy-backend-two.vercel.app/gettasks");
            setDetails(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {details.length > 0 ? (
                        <>
                            <div className="container">
                                <h2 className="my-4">Task List</h2>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Task to do</th>
                                            <th>Details of the Task</th>
                                            <th>Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details.map((det, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{det.title}</td>
                                                <td>{det.description}</td>
                                                <td>{formatDate(det.duedate)}</td>
                                                <td><Details det={det} getDetails={getDetails} /></td>
                                                {/* Add other td elements here if needed */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    ) : (
                        <div className="text-center my-4">
                            <p>Please add your tasks here.</p>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Get;

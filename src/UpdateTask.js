import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    form: {
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "5px 0",
        boxSizing: "border-box",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#4caf50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

function Updatebyid() {
    const { id } = useParams();
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        title: "",
        description: "",
        duedate: "",
        
    });

    const getDetails = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://deploy-backend-two.vercel.app/gettaskbyid/${id}`);
            setDetails({
                title: response.data.title,
                description: response.data.description,
                duedate: response.data.duedate,
             
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    const updateDetails = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`https://deploy-backend-two.vercel.app/updatetask/${id}`, details);
            toast.success("Updated successfully");
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDetails();
    }, [id]); // Added id as a dependency to useEffect to re-fetch data when the id changes

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <p> updating  the {details.title}</p>
                {isloading ? (
                    "Loading..."
                ) : (
                    <form onSubmit={updateDetails}>
                        <label>
                            Task to do:{" "}
                            <input
                                style={styles.input}
                                value={details.title}
                                onChange={(e) => setDetails({ ...details, title: e.target.value })}
                                type="text"
                            />
                        </label>
                        <br />
                        <br />
                        <label>
                           Description for Task:{" "}
                            <input
                                style={styles.input}
                                value={details.description}
                                onChange={(e) => setDetails({ ...details, description: e.target.value })}
                                type="text"
                            />
                        </label>
                        <br />
                        <br />
                        <label>
                            Due Date for Task:{" "}
                            <input
                                style={styles.input}
                                value={details.duedate}
                                onChange={(e) => setDetails({ ...details, duedate: e.target.value })}
                                type="date"
                            />
                        </label>
                        <br />
                        <br />
                        
                        
                        
                        <button style={styles.button} type="submit">
                            Update the Task
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Updatebyid;

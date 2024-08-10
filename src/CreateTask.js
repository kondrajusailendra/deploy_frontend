import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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

function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDueDate] = useState(""); // Initialize with an empty string
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
/*
    const handleDateChange = (e) => {
        const selectedDate = e.target.value; // Keep it as string format (YYYY-MM-DD)
        setDueDate(selectedDate);
    };
    

    const formatDateToISO = (dateString) => {
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) {
            return ""; // Return empty string for invalid dates
        }
        return dateObj.toISOString(); // Returns date in ISO format
    };
*/
    const savedata = async (e) => {
        e.preventDefault();
        if (title === "" || description === "" || !duedate) {
            toast.error("Please enter all the details");
            return;
        }
        try {
            setIsLoading(true);
           // const formattedDate = formatDateToISO(duedate);
            const response = await axios.post("http://127.0.0.1:8000/createtask", {
                title: title,
                description: description,
                duedate: duedate, // Use the ISO formatted date
            });
            toast.success(`Saved ${response.data.name} to the database`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <form onSubmit={savedata}>
                    <label>
                        Task to do:{" "}
                        <input
                            style={styles.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Description for Task:{" "}
                        <input
                            style={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Due Date for Task:{" "}
                        <input
                            style={styles.input}
                            value={duedate}
                            onChange={(e) => setDueDate(e.target.value)}
                            type="date"
                        />
                    </label>
                    <br />
                    <br />

                    {!isLoading && (
                        <>
                            <button style={styles.button} type="submit">
                                Submit
                            </button>
                        </>
                    )}
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Create;

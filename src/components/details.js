import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';


function Details({ det, getDetails }) {
    const deleteDetails = async (id) => {
        try {
            await axios.delete(`https://deploy-backend-two.vercel.app/deletetask/${id}`);
            toast.success(`Deleting`);
            getDetails();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <tr >    
                <td >
                    <Button variant="warning">
                        <Link to={`/updatebyid/${det._id}`}>edit</Link>
                    </Button>
                </td>
                <td >
                    <Button variant="danger" onClick={() => deleteDetails(det._id)}>delete</Button>
                </td>
            </tr>

        </>
    );
}

export default Details;

import { Routes, Route, Link } from "react-router-dom";
import Get from "./getalltasks";
import Create from "./CreateTask";
import Updatebyid from "./UpdateTask";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { ToastContainer } from "react-toastify";
import Button from 'react-bootstrap/Button';
import CustomCard from "./components/titlecard";
const variant = 'Warning';

function Operations() {
    return (
        <>
            
            <div className="container mt-4">
                <div className="row">
                    <div className="col d-flex justify-content-center align-items-start">
                        <CustomCard variant={variant} />
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <Button variant="info" className="w-75 text-center">
                                <Link to={"/create"} className="text-white text-decoration-none">Click here to create a new Task</Link>
                            </Button>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <Button variant="dark" className="w-75 text-center">
                                <Link to={"/"} className="text-white text-decoration-none">Click here to view all the Tasks</Link>
                            </Button>
                        </div>
                    </div>
                </div>
               
            </div>
            <Routes>
                <Route path="/" element={<Get />} />
                <Route path="/create" element={<Create />} />
                <Route path="/updatebyid/:id" element={<Updatebyid />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default Operations;

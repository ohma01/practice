import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Table = () => {
    const [table, setTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = "https://your-api-endpoint.com/table"; // replace with real API
    const navigate = useNavigate();

    const fetchTable = () => {
        axios
            .get(url)
            .then((res) => {
                console.log("Data fetched successfully");
                setTable(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTable();
    }, []);

    const handleClick = (id) => {
        navigate(`/cards/${id}`); // dynamic navigation
    };

    return (
        <div className="container mt-4">
            {loading ? (
                <div className="text-primary">Loading...</div>
            ) : table.length === 0 ? (
                <div className="text-danger">No Table Available</div>
            ) : (
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((elem) => (
                            <tr key={elem.id}>
                                <th scope="row">{elem.id}</th>
                                <td>{elem.name}</td>
                                <td>{elem.class}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleClick(elem.id)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Table;

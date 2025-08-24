import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = "https://your-api-endpoint.com/cards"; // replace with real API
    const navigate = useNavigate();

    const fetchCards = () => {
        axios
            .get(url)
            .then((res) => {
                console.log("Data fetched successfully");
                setCards(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleClick = (id) => {
        navigate(`/cards/${id}`); // dynamic navigation
    };

    return (
        <div className="container">
            {loading ? (
                <div className="text-primary">Loading...</div>
            ) : cards.length === 0 ? (
                <div className="text-danger">No cards available</div>
            ) : (
                <div className="row">
                    {
                        cards.map((card) => (
                            <div className="col-md-3 p-2" key={card.id}>
                                <div className="card h-100 text-center shadow-sm">
                                    <img
                                        src={card.imagePath}
                                        className="card-img-top img-fluid"
                                        alt={card.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.text}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleClick(card.id)}
                                        >
                                            View More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default Cards;

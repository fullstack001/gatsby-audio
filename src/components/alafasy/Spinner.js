import React from "react";
import { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import "@fortawesome/fontawesome-free/css/all.css"

export const LoadingSpinner = () => {
    return (
        <div>
            <i className="fas fa-spinner fa-spin"></i>
        </div>
    )
}

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Spinner() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className="sweet-loading">
            <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
            <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />

            <CircleLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Spinner;
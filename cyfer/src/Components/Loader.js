import CircleLoader from "react-spinners/CircleLoader";
import "./loader.css";

const Loader = () => {
    return (
        <div className="loader-container">
            <h1>Cyfer</h1>
            <CircleLoader
                color="maroon"
                loading={true}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loader;

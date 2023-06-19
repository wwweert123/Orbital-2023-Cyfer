import CircleLoader from "react-spinners/CircleLoader";
//mui
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const StyledRoot = styled("div")({
    display: "flex",
    position: "absolute",
    left: "50%",
    top: "50%",
});

const Loader = () => {
    return (
        <StyledRoot>
            <Typography variant="h3">Cyfer</Typography>
            <CircleLoader
                color="maroon"
                loading={true}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </StyledRoot>
    );
};

export default Loader;

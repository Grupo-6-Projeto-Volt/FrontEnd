import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../../utils/global";

function Favoritos() {
    let navigate = useNavigate();

    function validateAuthentication() {
        if (!validateAuth()) {
            navigate("/login");
        }
    }

    useEffect(() => {
        validateAuthentication();
    })
}

export default Favoritos;
import React from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "../Context/ThemeContext";

const DarkToggler: React.FC = () => {
    const { darkMode, toggleDark } = useTheme();

    return (
        <Button variant="secondary" onClick={toggleDark}>
            {darkMode ? 'Switch to Light' : 'Switch to Dark'}
        </Button>
    )
};

export default DarkToggler;
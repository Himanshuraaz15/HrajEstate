import React from "react";
import "./DarkMode.css";

export default function DarkMode(){
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                {/* <Sun />
                <Moon /> */}
                theme
            </label>
        </div>
    );
};

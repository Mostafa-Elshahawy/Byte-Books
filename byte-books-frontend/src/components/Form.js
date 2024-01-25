import React from "react";

const Form = ({title,onSubmit}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        if(onSubmit){
            onSubmit();
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <input type="text" name="username"></input>
            <input type="password" name="password"></input>
            <input type="submit"></input>
        </form>
    );
};

export default Form;
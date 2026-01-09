import React from "react";

type HelloProps = { name: string; age: number };

const Hello = ({ name, age }: HelloProps) => {
    return (
        <div>
            Hello {name} - {age}
        </div>
    );
};

export default Hello;

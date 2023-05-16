import React, { useState } from "react";

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(''); 
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleToggleEditMode = () => {    
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleSaveProfile = (event) => {
        event.preventDefault();
        alert(`Name: ${name} Age: ${age} Height: ${height} Weight: ${weight}`);
        setName('');
        setAge('');
        setHeight('');
        setWeight('');
        setIsEditing(false);
    };

    return (
        <div>
            <h2>Profile</h2>
            {isEditing ? (
                <form>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleNameChange} />  
                    </label>
                    <br />
                    <label>
                        Age:
                        <input type="number" value={age} onChange={handleAgeChange} />
                    </label>
                    <br />
                    <label>
                        Height in inches:
                        <input type="number" value={height} onChange={handleHeightChange} />
                    </label>
                    <br />
                    <label>
                        Weight in pounds:
                        <input type="number" value={weight} onChange={handleWeightChange} />
                    </label>
                    <br />
                    <button type="submit" onClick={handleSaveProfile}>  
                        Save Profile
                    </button>
                </form>
            ) : (
                <div>
                    <p>Name: {name}</p>
                    <p>Age: {age}</p>
                    <p>Height: {height}</p>
                    <p>Weight: {weight}</p>
                    <button onClick={handleToggleEditMode}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;








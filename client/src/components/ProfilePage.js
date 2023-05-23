import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_PROFILE = gql`
  query GetProfile {
    me {
      profile {
        name
        age
        height
        weight
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      name
      age
      height
      weight
    }
  }
`;

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_PROFILE);
  const [name, setName] = useState('');
  const [age, setAge] = useState(''); 
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  useEffect(() => {
    if (!loading && data && data.me) {
      const { name, age, height, weight } = data.me.profile;
      setName(name);
      setAge(age);
      setHeight(height);
      setWeight(weight);
    }
  }, [loading, data]);

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

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateProfile({
        variables: {
          input: { name, age, height, weight }
        }
      });

      if (data.updateProfile) {
        setIsEditing(false);
      }
    } catch (error) {
      console.log('Error occurred saving profile', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred while fetching profile data</p>;

  return (
    <div>
      <h2>Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSaveProfile}>
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
          <button type="submit">Save Profile</button>
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

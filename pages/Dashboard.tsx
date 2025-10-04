import React, { useState, useEffect } from 'react';
import {useWorkouts} from '../hooks/useWorkouts';
import {useUsers} from '../hooks/useUsers';
import WorkoutList from '../components/WorkoutList';
import WorkoutForms from '../components/WorkoutForms';
import UserSelect from '../components/UserSelect';
import LogoutButton from '../components/LogoutButton';

const Dashboard: React.FC = () => {
    const { users, loading: userLoading, error: userError } = useUsers();

    const [userId, setUserId] = useState<number | null>(() => {
        const stored = localStorage.getItem('selectedUserId');
        return stored ? Number(stored) : null;
    });

    // Set default userId when users load
    useEffect(() => {
        if (users.length > 0 && userId === null) {
            setUserId(users[0].id);
        }
    }, [users, userId]);

    useEffect(() => {
        if(userId !== null){
            localStorage.setItem('selectedUserId', userId.toString());
        }
    }, [userId]);

    // Load workouts after userId is selected
    const {
        workouts,
        loading,
        error,
        addWorkout,
        editWorkout,
        removeWorkout,
    } = useWorkouts(userId || 0);

    // Show loading/error states for users
    if (userLoading) return <p>Loading users...</p>;
    if (userError) return <p>Error loading users: {userError}</p>;
    if (userId === null) return <p>No user selected.</p>;

    let token;
    return (
        <div style={{ padding: '2rem' }}>
            <h1>My Workouts</h1>
            <p>Dashboard component loaded</p>
            {token && <LogoutButton />}
            <UserSelect
                users={users}
                selectedUserId={userId}
                onChange={setUserId}
                loading={userLoading}
            />

            {loading && <p>Loading workouts...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <WorkoutForms onSubmit={addWorkout} />
            <LogoutButton />
            <WorkoutList
                workouts={workouts}
                onUpdate={editWorkout}
                onDelete={removeWorkout}
            />
            {token && <LogoutButton />}
        </div>
    );
};

export default Dashboard;
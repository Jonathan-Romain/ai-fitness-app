import { useEffect, useState } from 'react';
import { getWorkoutsByUserId, createWorkout, updateWorkout, deleteWorkout } from '../api/workouts';
import type {Workout} from '../types/Workout';

export const useWorkouts = (userId: number) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch workouts on mount
    useEffect(() => {
        if (!userId) return;

        setLoading(true);
        getWorkoutsByUserId(userId)
            .then((res) => setWorkouts(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [userId]);

    // Create workout
    const addWorkout = (data: Omit<Workout, 'id' | 'user'>) => {
        return createWorkout(userId, data)
            .then((res) => setWorkouts((prev) => [...prev, res.data]));
    };

    // Update workout
    const editWorkout = (id: number, data: Partial<Workout>) => {
        return updateWorkout(id, data)
            .then((res) => setWorkouts((prev) =>
                prev.map((w) => (w.id === id ? res.data : w))
            ));
    };

    // Delete workout
    const removeWorkout = (id: number) => {
        return deleteWorkout(id)
            .then(() => setWorkouts((prev) => prev.filter((w) => w.id !== id)));
    };

    return {
        workouts,
        loading,
        error,
        addWorkout,
        editWorkout,
        removeWorkout,
    };
};
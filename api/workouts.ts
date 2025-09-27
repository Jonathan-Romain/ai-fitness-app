import axiosClient from './axios';
import type {Workout} from '../types/Workout';

export const getWorkoutsByUserId = (userId: number) => {
    return axiosClient.get<Workout[]>(`/workouts`, {
        params: { userId },
    });
};

export const createWorkout = (userId: number, data: Omit<Workout, 'id' | 'user'>) => {
    return axiosClient.post<Workout>(`/workouts`, data, {
        params: { userId },
    });
};

export const updateWorkout = (id: number, data: Partial<Workout>) => {
    return axiosClient.put<Workout>(`/workouts/${id}`, data);
};

export const deleteWorkout = (id: number) => {
    return axiosClient.delete(`/workouts/${id}`);
};
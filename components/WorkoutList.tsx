import React from 'react';
import type { Workout } from '../types/Workout';

type WorkoutListProps = {
    workouts: Workout[];
    onUpdate: (id: number, updatedWorkout: Partial<Workout>) => void;
    onDelete: (id: number) => void;
};

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onUpdate, onDelete }) => {
    return (
        <div>
            {workouts.length === 0 ? (
                <p>No workouts yet.</p>
            ) : (
                <ul>
                    {workouts.map((workout: Workout) => (
                        <li key={workout.id} style={{ marginBottom: '1rem' }}>
                            <strong>{workout.type}</strong> – {workout.date} – {workout.durationInMinutes} min
                            <br />
                            Notes: {workout.notes}
                            <div style={{ marginTop: '0.5rem' }}>
                                <button onClick={() => onUpdate(workout.id, { notes: 'Updated note!' })}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(workout.id)}
                                    style={{ marginLeft: '0.5rem' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WorkoutList;
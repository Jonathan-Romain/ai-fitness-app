import React, { useState } from 'react';

type WorkoutFormProps = {
    onSubmit: (workout: {
        type: string;
        date: string;
        durationInMinutes: number;
        notes: string;
    }) => void;
};

const WorkoutForms: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [durationInMinutes, setDurationInMinutes] = useState(0);
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({ type, date, durationInMinutes, notes });

        // Reset form
        setType('');
        setDate('');
        setDurationInMinutes(0);
        setNotes('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <input
                type="text"
                placeholder="Workout Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Duration (minutes)"
                value={durationInMinutes}
                onChange={(e) => setDurationInMinutes(Number(e.target.value))}
                required
            />
            <input
                type="text"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <button type="submit">Add Workout</button>
        </form>
    );
};

export default WorkoutForms;
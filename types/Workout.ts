export interface Workout {
    id: number;
    type: string;
    date: string;
    durationInMinutes: number;
    notes: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}
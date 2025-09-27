import { useEffect, useState} from "react";
import axiosClient from "../api/axios";
import type { User } from "../types/User";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosClient.get<User[]>("/users")
            .then(res => setUsers(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { users, loading, error };
}
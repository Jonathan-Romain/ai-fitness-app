import React from 'react';
import type { User } from '../types/User';
import '../App.css'; // or './Spinner.css' if you made a separate file

interface Props {
    users: User[];
    selectedUserId: number;
    onChange: (id: number) => void;
    loading?: boolean;
}

const UserSelect: React.FC<Props> = ({ users, selectedUserId, onChange, loading }) => {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="user-select" style={{ marginRight: '0.5rem', fontWeight: 600 }}>
                Select User:
            </label>

            {loading ? (
                <span className="spinner" />
            ) : (
                <select
                    id="user-select"
                    value={selectedUserId}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        outline: 'none',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default UserSelect;
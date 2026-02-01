const API_URL = window.location.origin;

export async function login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    return response.json();
}

export async function register(username, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    return response.json();
}

export async function getHistory() {
    const response = await fetch(`${API_URL}/history`);

    if (!response.ok) {
        throw new Error('Failed to load message history');
    }

    const messages = await response.json();
    return messages || [];
}

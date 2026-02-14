// js/api.js
const DB_URL = "http://localhost:3000/users";

export async function getUser(username) {
    try {
        // Search the DB for a user with this specific username
        const response = await fetch(`${DB_URL}?username=${username}`);
        const users = await response.json();

        // json-server returns an array, we want the first match
        return users.length > 0 ? users[0] : null;
    } catch (error) {
        console.error("DB Error:", error);
        return null;
    }
}

export async function createUser(userData) {
    try {
        const response = await fetch(DB_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error("Create User Error:", error);
    }
}

export async function updateUser(id, updatedData) {
    try {
        // We use 'PATCH' to update only specific fields (like history)
        await fetch(`${DB_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });
    } catch (error) {
        console.error("Update Error:", error);
    }
}
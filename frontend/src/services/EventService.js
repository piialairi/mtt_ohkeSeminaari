import axios from 'axios';
const SERVER_URL = "http://localhost:8080/events";

export const deleteEvent = async (id) => {
    try {
        await axios.delete(`${SERVER_URL}/delete/${id}`);
    } catch (error) {
        throw new Error('Could not delete. -Axios')
    }
}
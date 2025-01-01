const API_ENDPOINT = 'https://us-west1-nkhr-c.cloudfunctions.net/dr';

export async function fetchImgID(level) {
    const response = await fetch(`${API_ENDPOINT}?input=${level}`);
    const data = await response.json();
    return data;
}

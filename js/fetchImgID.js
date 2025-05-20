const API_ENDPOINT = 'https://us-west1-nkhr-c.cloudfunctions.net/dr';

export async function fetchImgID(level, cnt = 0) {
    const response = await fetch(`${API_ENDPOINT}?input=${level}&cnt=${cnt}`);
    const data = await response.json();
    return data;
}

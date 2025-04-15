let accessToken = null;
let tokenExpiration = null;

async function authenticate() {
    if (accessToken && tokenExpiration > Date.now()) {
        return accessToken;
    }
    
    const authParameters = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: authParameters,
    });

    const data = await response.json();

    if (!data.access_token) {
        throw new Error('Failed to authenticate with Spotify API');
    }

    accessToken = data.access_token;
    tokenExpiration = Date.now() + data.expires_in * 1000;

    return accessToken;
}

export default authenticate;
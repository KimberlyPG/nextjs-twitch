const scopes = [
    "user:read:email",
    // "user:read:follows",
    "channel:read:stream_key",
    // "channel_read",
    "user:read:follows"
].join("+");

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);
const clientId = 'waeorpo1lhuao1l7a19b2roh60ze9n';
const redirectUri = "http://localhost:3000/"

export const LOGIN_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
// export const LOGIN_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;

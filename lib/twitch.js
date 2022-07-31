const scopes = [
    "user:read:follows",
    "user:read:subscriptions",
    "channel:read:stream_key",
    // "chat:read"
].join(",");

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = "https://id.twitch.tv/oauth2/authorize?";
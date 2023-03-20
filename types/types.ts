export type LiveStreamsData = {
    id:            string;
    user_id:       string;
    user_login:    string;
    user_name:     string;
    game_id:       string;
    game_name:     string;
    type:          string;
    title:         string;
    viewer_count:  number;
    started_at:    string;
    language:      string;
    thumbnail_url: string;
    tag_ids:       any[];
    tags:          string[] | null;
    is_mature:     boolean;
}

export type TopGameData = {
    id:          string;
    name:        string;
    box_art_url: string;
    igdb_id:     string;
}

export type UserData = {
    id:                string;
    login:             string;
    display_name:      string;
    type:              string;
    broadcaster_type:  string;
    description:       string;
    profile_image_url: string;
    offline_image_url: string;
    view_count:        number;
    created_at:        string;
}

export type SearchChannels = {
    broadcaster_language: string;
    broadcaster_login:    string;
    display_name:         string;
    game_id:              string;
    game_name:            string;
    id:                   string;
    is_live:              boolean;
    tag_ids:              any[];
    tags:                 string[];
    thumbnail_url:        string;
    title:                string;
    started_at:           string;
}

export interface Follow {
    from_id:     string;
    from_login:  string;
    from_name:   string;
    to_id:       string;
    to_login:    string;
    to_name:     string;
    followed_at: string;
}

export interface Video {
    id:             string;
    stream_id:      string;
    user_id:        string;
    user_login:     string;
    user_name:      string;
    title:          string;
    description:    string;
    created_at:     string;
    published_at:   string;
    url:            string;
    thumbnail_url:  string;
    viewable:       string;
    view_count:     number;
    language:       string;
    type:           string;
    duration:       string;
    muted_segments: null;
}

export interface Provider {
    twitch: Twitch;
}

export interface Twitch {
    id:          string;
    name:        string;
    type:        string;
    signinUrl:   string;
    callbackUrl: string;
}

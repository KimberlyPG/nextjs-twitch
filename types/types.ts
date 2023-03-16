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

export type TopGamesData = {
    id:          string;
    name:        string;
    box_art_url: string;
    igdb_id:     string;
}

export interface TopGame {
    id:          string;
    name:        string;
    box_art_url: string;
    igdb_id:     string;
}

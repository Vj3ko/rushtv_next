export interface SeasonType {
    _id:           string;
    air_date:      string;
    episodes:      Episode[];
    name:          string;
    overview:      string;
    id:            number;
    poster_path:   string;
    season_number: number;
    vote_average:  number;
    videos:        Videos;
    credits:       Credits;
    images:        Images;
    external_ids:  ExternalIDS;
}

export interface Credits {
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: Department;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    character?:           string;
    credit_id:            string;
    order?:               number;
    department?:          Department;
    job?:                 string;
}

export enum Department {
    Acting = "Acting",
    Art = "Art",
    Camera = "Camera",
    CostumeMakeUp = "Costume & Make-Up",
    Crew = "Crew",
    Directing = "Directing",
    Editing = "Editing",
    Lighting = "Lighting",
    Production = "Production",
    Sound = "Sound",
    VisualEffects = "Visual Effects",
    Writing = "Writing",
}

export interface Episode {
    air_date:        string;
    episode_number:  number;
    episode_type:    string;
    id:              number;
    name:            string;
    overview:        string;
    production_code: string;
    runtime:         number;
    season_number:   number;
    show_id:         number;
    still_path:      string;
    vote_average:    number;
    vote_count:      number;
    crew:            Cast[];
    guest_stars:     Cast[];
}

export interface ExternalIDS {
    freebase_mid: null;
    freebase_id:  null;
    tvdb_id:      number;
    tvrage_id:    null;
    wikidata_id:  string;
}

export interface Images {
    posters: any[];
}

export interface Videos {
    results: Result[];
}

export interface Result {
    iso_639_1:    ISO639_1;
    iso_3166_1:   ISO3166_1;
    name:         string;
    key:          string;
    site:         Site;
    size:         number;
    type:         string;
    official:     boolean;
    published_at: string;
    id:           string;
}

export enum ISO3166_1 {
    Us = "US",
}

export enum ISO639_1 {
    En = "en",
}

export enum Site {
    YouTube = "YouTube",
}
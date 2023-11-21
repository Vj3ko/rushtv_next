export interface PersonType {
    adult:                boolean;
    also_known_as:        string[];
    biography:            string;
    birthday:             string;
    deathday:             string | null;
    gender:               number;
    homepage:             string;
    id:                   number;
    imdb_id:              string;
    known_for_department: string;
    name:                 string;
    place_of_birth:       string;
    popularity:           number;
    profile_path:         string;
    credits:              Credits;
    images:               Images;
    external_ids:         ExternalIDS;
}

export interface Credits {
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    character?:        string;
    credit_id:         string;
    order?:            number;
    department?:       Department;
    job?:              Job;
}

export enum Department {
    Crew = "Crew",
    Directing = "Directing",
    Production = "Production",
    Writing = "Writing",
}

export enum Job {
    Director = "Director",
    ExecutiveProducer = "Executive Producer",
    Producer = "Producer",
    Thanks = "Thanks",
    Writer = "Writer",
}

export interface ExternalIDS {
    freebase_mid: string;
    freebase_id:  string;
    imdb_id:      string;
    tvrage_id:    number;
    wikidata_id:  string;
    facebook_id:  string;
    instagram_id: string;
    tiktok_id:    null;
    twitter_id:   string;
    youtube_id:   null;
}

export interface Images {
    profiles: Profile[];
}

export interface Profile {
    aspect_ratio: number;
    height:       number;
    iso_639_1:    null;
    file_path:    string;
    vote_average: number;
    vote_count:   number;
    width:        number;
}
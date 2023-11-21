export interface TvType {
    adult:                boolean;
    backdrop_path:        string;
    created_by:           CreatedBy[];
    episode_run_time:     number[];
    first_air_date:       string;
    genres:               Genre[];
    homepage:             string;
    id:                   number;
    in_production:        boolean;
    languages:            any[];
    last_air_date:        string;
    last_episode_to_air:  LastEpisodeToAir;
    name:                 string;
    title:                string;
    next_episode_to_air:  NextEpisodeToAir;
    networks:             Network[];
    number_of_episodes:   number;
    number_of_seasons:    number;
    origin_country:       string[];
    original_language:    string | null;
    original_name:        string;
    overview:             string;
    popularity:           number;
    poster_path:          string;
    production_companies: Network[];
    production_countries: any[];
    seasons:              Season[];
    spoken_languages:     SpokenLanguage[];
    status:               string;
    tagline:              string;
    type:                 string;
    vote_average:         number;
    vote_count:           number;
    videos:               Videos;
    similar:              Similar;
    credits:              Credits;
    recommendations:      Recommendations;
    images:               Images;
    content_ratings:      ContentRatings;
    external_ids:         ExternalIDS;
}

export interface ContentRatings {
    results: ContentRatingsResult[];
}

export interface ContentRatingsResult {
    descriptors: any[];
    iso_3166_1:  string;
    rating:      string;
}

export interface CreatedBy {
    id:           number;
    credit_id:    string;
    name:         string;
    gender:       number;
    profile_path: string;
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
    job?:                 Job;
}

export enum Department {
    Acting = "Acting",
    Directing = "Directing",
    Production = "Production",
    Writing = "Writing",
}

export enum Job {
    ExecutiveProducer = "Executive Producer",
    Producer = "Producer",
}

export interface ExternalIDS {
    imdb_id:      string;
    freebase_mid: string;
    freebase_id:  string;
    tvdb_id:      number;
    tvrage_id:    number;
    wikidata_id:  null;
    facebook_id:  null;
    instagram_id: null;
    twitter_id:   null;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface Images {
    backdrops: any[];
    logos:     any[];
    posters:   any[];
}

export interface LastEpisodeToAir {
    id:              number;
    name:            string;
    overview:        string;
    vote_average:    number;
    vote_count:      number;
    air_date:        string;
    episode_number:  number;
    episode_type:    string;
    production_code: string;
    runtime:         number;
    season_number:   number;
    show_id:         number;
    still_path:      string;
}

export interface NextEpisodeToAir {
    id:              number;
    name:            string;
    overview:        string;
    vote_average:    number;
    vote_count:      number;
    air_date:        string;
    episode_number:  number;
    episode_type:    string;
    production_code: string;
    runtime:         number;
    season_number:   number;
    show_id:         number;
    still_path:      string;
}

export interface Network {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export interface Recommendations {
    page:          number;
    results:       RecommendationsResult[];
    total_pages:   number;
    total_results: number;
}

export interface Similar {
    page:          number;
    results:       SimilarResults[];
    total_pages:   number;
    total_results: number;
}

export interface SimilarResults {
    adult:             boolean;
    backdrop_path:     null | string;
    id:                number;
    name:              string;
    original_language: string;
    original_name:     string;
    overview:          string;
    poster_path:       null | string;
    media_type?:       MediaType;
    genre_ids:         number[];
    popularity:        number;
    first_air_date:    Date;
    vote_average:      number;
    vote_count:        number;
    origin_country:    string[];
}

export interface RecommendationsResult {
    adult:             boolean;
    backdrop_path:     null | string;
    id:                number;
    name:              string;
    original_language: string;
    original_name:     string;
    overview:          string;
    poster_path:       null | string;
    media_type?:       MediaType;
    genre_ids:         number[];
    popularity:        number;
    first_air_date:    Date;
    vote_average:      number;
    vote_count:        number;
    origin_country:    string[];
}

export enum MediaType {
    Tv = "tv",
}

export interface Season {
    air_date:      Date | null;
    episode_count: number;
    id:            number;
    name:          string;
    overview:      string;
    poster_path:   string;
    season_number: number;
    vote_average:  number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

export interface Videos {
    results: VideosResult[];
}

export interface VideosResult {
    iso_639_1:    string;
    iso_3166_1:   string;
    name:         string;
    key:          string;
    site:         string;
    size:         number;
    type:         string;
    published_at: Date;
    official:     boolean;
    id:           string;
}
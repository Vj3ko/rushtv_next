export interface MovieType {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: null;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string[];
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          string;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
    videos:                Videos;
    similar:               Similar;
    credits:               Credits;
    recommendations:       Recommendations;
    images:                Images;
    release_dates:         ReleaseDates;
    external_ids:          ExternalIDS;
}

export interface Credits {
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: string;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    cast_id?:             number;
    character?:           string;
    credit_id:            string;
    order?:               number;
    department?:          string;
    job?:                 string;
}

export interface ExternalIDS {
    imdb_id:      string;
    wikidata_id:  string;
    facebook_id:  string;
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

export interface ProductionCompany {
    id:             number;
    logo_path:      null;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
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

export interface RecommendationsResult {
    adult:             boolean;
    backdrop_path:     null | string;
    id:                number;
    title:             string;
    original_language: string;
    original_title:    string;
    overview:          string;
    poster_path:       null | string;
    media_type?:       MediaType;
    genre_ids:         number[];
    popularity:        number;
    release_date:      string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export interface SimilarResults {
    adult:             boolean;
    backdrop_path:     null | string;
    id:                number;
    title:             string;
    original_language: string;
    original_title:    string;
    overview:          string;
    poster_path:       null | string;
    media_type?:       MediaType;
    genre_ids:         number[];
    popularity:        number;
    release_date:      string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export enum MediaType {
    Movie = "movie",
}

export interface ReleaseDates {
    results: ReleaseDatesResult[];
}

export interface ReleaseDatesResult {
    iso_3166_1:    string;
    release_dates: ReleaseDate[];
}

export interface ReleaseDate {
    certification: string;
    descriptors:   string[];
    iso_639_1:     ISO639_1;
    note?:         string;
    release_date:  string;
    type:          number;
}

export enum ISO639_1 {
    Empty = "",
    Es = "es",
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
    official:     boolean;
    published_at: string;
    id:           string;
}
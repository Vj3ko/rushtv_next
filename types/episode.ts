export interface EpisodeType {
  air_date: string
  crew: Crew[]
  episode_number: number
  guest_stars: Crew[]
  name: string
  overview: string
  id: number
  production_code: string
  runtime: number
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
  videos: Videos
  credits: Credits
  images: Images
  external_ids: ExternalIDS
}

export interface Credits {
  cast: Crew[]
  crew: Crew[]
  guest_stars: Crew[]
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: Department
  name: string
  original_name: string
  popularity: number
  profile_path: null | string
  character?: string
  credit_id: string
  order?: number
  job?: string
  department?: Department
}

export enum Department {
  Acting = 'Acting',
  Camera = 'Camera',
  Crew = 'Crew',
  Directing = 'Directing',
  Editing = 'Editing',
  Production = 'Production',
  Writing = 'Writing',
}

export interface ExternalIDS {
  imdb_id: string
  freebase_mid: null
  freebase_id: null
  tvdb_id: number
  tvrage_id: null
  wikidata_id: string
}

export interface Images {
  stills: Still[]
}

export interface Still {
  aspect_ratio: number
  height: number
  iso_639_1: null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Videos {
  results: any[]
}

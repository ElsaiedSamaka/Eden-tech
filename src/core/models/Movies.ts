export interface Movie {
  id: string;
  imdbID: string;
  Title: string;
  Year: string;
  Rated: Rated;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbimdbID: string;
  Type: Type;
  DVD: string;
  BoxOffice: string;
  Production: Production;
  Website: Production;
  Response: Response;
}

export enum Production {
  NA = 'N/A',
}

export enum Rated {
  G = 'G',
  PG13 = 'PG-13',
  R = 'R',
}

export interface Rating {
  Source: Source;
  Value: string;
}

export enum Source {
  InternetMovieDatabase = 'Internet Movie Database',
  Metacritic = 'Metacritic',
  RottenTomatoes = 'Rotten Tomatoes',
}

export enum Response {
  True = 'True',
  False = 'False',
}

export enum Type {
  Movie = 'movie',
}

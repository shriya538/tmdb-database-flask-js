Unique_API_KEY= 'a90c87de4b61bb6a7f6ecc1de4b4c3c4'
image_pre='https://image.tmdb.org/t/p/w500'

TMDB_TRENDING_API_ENDPOINT='https://api.themoviedb.org/3/trending/movie/week?api_key=' + Unique_API_KEY
TMDB_TV_AIRING_TODAY_ENDPOINT='https://api.themoviedb.org/3/tv/airing_today?api_key=' + Unique_API_KEY
SEARCH_MOVIE_ENDPOINT='https://api.themoviedb.org/3/search/movie?api_key='+ Unique_API_KEY+'&language=en-US&query={}&page=1&include_adult=false'
SEARCH_TV_ENDPOINT='https://api.themoviedb.org/3/search/tv?api_key=' +Unique_API_KEY+ '&language=en-US&page=1&query={}&include_adult=false'
MULTI_SEARCH_ENDPOINT='https://api.themoviedb.org/3/search/multi?api_key=' +Unique_API_KEY+'&language=en-US&query={}&page=1&include_adult=false'
GET_MOVIE_DETAILS='https://api.themoviedb.org/3/movie/{}?api_key='+Unique_API_KEY+'&language=enUS'
GET_MOVIE_CREDITS='https://api.themoviedb.org/3/movie/{}/credits?api_key=' +Unique_API_KEY+'&language=en-US'
GET_MOVIE_REVIEWS='https://api.themoviedb.org/3/movie/{}/reviews?api_key='+Unique_API_KEY+'&language=en-US&page=1'
GET_TV_DETAILS='https://api.themoviedb.org/3/tv/{}?api_key='+Unique_API_KEY+'&language=en-US'
GET_TV_CREDITS='https://api.themoviedb.org/3/tv/{}/credits?api_key='+Unique_API_KEY+'&language=en-US'
GET_TV_REVIEWS='https://api.themoviedb.org/3/tv/{}/reviews?api_key='+Unique_API_KEY+'&language=en-US&page=1'
GET_MOVIE_GENRE_LIST='https://api.themoviedb.org/3/genre/movie/list?api_key=' + Unique_API_KEY + '&language=en-US';
GET_TV_GENRE_LIST='https://api.themoviedb.org/3/genre/tv/list?api_key='+ Unique_API_KEY +'&language=en-US';

BACKUP_IMAGES = {
    'backdrop_path': 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg',
    'poster_path': 'https://cinemaone.net/images/movie_placeholder.png',
    'profile_path': 'https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png'
}



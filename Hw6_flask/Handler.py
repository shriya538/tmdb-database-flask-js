from constants import *
import json
import requests ## python shiz
import logging
import traceback
from flask import request ## this is the request object that you get back

class home_page:
    @classmethod #cause i dont wanna create an object
    def tmdb_trending_endpoint(cls,request):
        try:
            raw_return= requests.get(TMDB_TRENDING_API_ENDPOINT)
            raw_to_json=raw_return.json()
            resp=raw_to_json.get('results')
            top_five=resp[:5]
            final=[]

            for element in top_five:
                keys=['title','backdrop_path','release_date']
                v={}
                for key in keys:
                    if key=='backdrop_path':
                        if element.get(key) is not None:
                            v[key]=image_pre+element.get(key)

                        else:
                            v[key]=BACKUP_IMAGES[key]
                    else:
                        v[key]=element.get(key)

                final.append(v)

            return json.dumps(final)

        except:
            logging.error(traceback.format_exc())

    @classmethod
    def tmdb_tv_airing_today(cls,request):
        try:
            raw_return=requests.get(TMDB_TV_AIRING_TODAY_ENDPOINT)
            raw_to_json = raw_return.json()
            resp = raw_to_json.get('results')
            top_five = resp[:5]
            final = []

            for element in top_five:
                keys=['name','backdrop_path','first_air_date']
                v={}
                for key in keys:
                    if key=='backdrop_path':
                        if element.get(key) is not None:
                            v[key]=image_pre+element.get(key)

                        else:
                            v[key]=BACKUP_IMAGES[key]
                    else:
                        v[key]=element.get(key)
                final.append(v)


            return json.dumps(final)
        except:
            logging.error(traceback.format_exc())



class search_page:
    @classmethod
    def search_movie_endpoint(cls,request):

        try:
            input_string=request.args.get('input_string')
            python_response = requests.get(SEARCH_MOVIE_ENDPOINT.format(input_string))
            if python_response.status_code == 200:
                response_json=python_response.json().get('results')
                result=[]
                for movie in response_json:
                    keys = ['id', 'title', 'poster_path','overview','release_date','vote_average','vote_count','genre_ids']
                    v={}
                    for key in keys:
                        if key == 'poster_path':
                            if movie.get(key) is not None:
                                v[key] = image_pre+movie.get(key)
                            else:
                                v[key] = BACKUP_IMAGES[key]
                        else:
                            v[key] = movie.get(key)

                    ##else: to be added
                    result.append(v)

                return json.dumps(result)


            else:
                logging.error(traceback.format_exc())
        except:
            logging.error(traceback.format_exc())

    @classmethod
    def search_tv_endpoint(cls,request):
        try:
            input_string=request.args.get('input_string')
            python_response = requests.get(SEARCH_TV_ENDPOINT.format(input_string))
            if python_response.status_code == 200:
                response_json=python_response.json().get('results')
                result=[]
                for tv_show in response_json:
                    keys = ['id', 'name','overview','poster_path','first_air_date','vote_average','vote_count','genre_ids']
                    v={}
                    for key in keys:
                        if key == 'poster_path':
                            if tv_show.get(key) is not None:
                                v[key] = image_pre+tv_show.get(key)
                            else:
                                v[key] = BACKUP_IMAGES[key]
                        else:
                            v[key] = tv_show.get(key)

                    ##else: to be added
                    result.append(v)

                return json.dumps(result)


            else:
                logging.error(traceback.format_exc())
        except:
            logging.error(traceback.format_exc())

    @classmethod
    def multi_search_endpoint(cls,request):

        try:
            input_string = request.args.get('input_string')
            python_response = requests.get(MULTI_SEARCH_ENDPOINT.format(input_string))
            if python_response.status_code == 200:
                response_json = python_response.json().get('results')
                movies=[]
                tv=[]
                for element in response_json:
                    if element.get('media_type')=='movie':
                        keys = ['id', 'title', 'poster_path', 'overview', 'release_date', 'vote_average', 'vote_count',
                                'genre_ids','media_type']
                        v={}
                        for key in keys:
                            if key == 'poster_path':
                                if element.get(key) is not None:
                                    v[key] = image_pre+element.get(key)
                                else:
                                    v[key] = BACKUP_IMAGES[key]
                            else:
                                v[key] = element.get(key)
                        movies.append(v)

                    else:
                        keys = ['id', 'name', 'overview', 'poster_path', 'first_air_date', 'vote_average', 'vote_count',
                                'genre_ids','media_type']
                        v = {}
                        for key in keys:
                            if key == 'poster_path':
                                if element.get(key) is not None:
                                    v[key] = image_pre+element.get(key)
                                else:
                                    v[key] = BACKUP_IMAGES[key]
                            else:
                                v[key] = element.get(key)
                        tv.append(v)
                ans=movies+tv
                return json.dumps(ans)

            else:
                logging.error(traceback.format_exc())



        except:
            logging.error(traceback.format_exc())

    @classmethod
    def get_movie_details(cls,request):
        try:
            input_string = request.args.get('input_string')
            python_response = requests.get(GET_MOVIE_DETAILS.format(input_string))
            if python_response.status_code == 200:
                response_json = python_response.json()
                result = []

                keys = ['id', 'title', 'runtime', 'release_date', 'spoken_languages', 'vote_average', 'vote_count',
                        'poster_path','backdrop_path','genres','overview']
                v = {}
                for key in keys:
                    if key == 'poster_path':
                        if response_json.get(key) is not None:
                            v[key] = image_pre+response_json.get(key)
                        else:
                            v[key]=BACKUP_IMAGES[key]
                    elif key== 'backdrop_path':
                        if response_json.get(key) is not None:
                            v[key] = image_pre+response_json.get(key)
                        else:
                            v[key]=BACKUP_IMAGES[key]
                    else:
                        v[key] = response_json.get(key)
                result.append(v)
                return json.dumps(result)

            else:
                logging.error(traceback.format_exc())


        except:
            logging.error(traceback.format_exc())

    @classmethod
    def get_movie_credits(cls,request):
        try:
            input_string = request.args.get('input_string')
            python_response = requests.get(GET_MOVIE_CREDITS.format(input_string))
            if python_response.status_code == 200:
                response_json = python_response.json()
                result = []
                iterable_actors=response_json['cast']
                top_8=iterable_actors[:8]
                keys = ['name', 'profile_path','character']

                result=[]
                for actor in top_8:
                    v = {}
                    for key in keys:
                        if key=='profile_path':
                            if actor.get(key) is not None:
                                v[key]=image_pre+actor.get(key)
                            else:
                                v[key] = BACKUP_IMAGES[key]
                        else:
                            v[key]=actor.get(key)
                    result.append(v)

                return json.dumps(result)


            else:
                logging.error(traceback.format_exc())



        except:
            logging.error(traceback.format_exc())


    @classmethod
    def get_movie_reviews(cls,request):
        try:
            input_string = request.args.get('input_string')
            python_response = requests.get(GET_MOVIE_REVIEWS.format(input_string))
            if python_response.status_code == 200:
                response_json = python_response.json()
                result = []
                top_5=response_json['results'][:5]
                keys=['username','content','rating','created_at']

                for review in top_5:
                    v={}
                    for key in keys:
                        if key=='username':
                            v[key]=review.get('author_details',{}).get('username','')
                        elif key== 'rating':
                            v[key] = review.get('author_details', {}).get('rating', '')
                        else:
                            v[key]=review.get(key);



                    result.append(v)

                return json.dumps(result)



            else:
                logging.error(traceback.format_exc())

        except:
            logging.error(traceback.format_exc())


    @classmethod
    def get_tv_show_details(cls,request):
        try:
            input_string = request.args.get('input_string')
            python_response = requests.get(GET_TV_DETAILS.format(input_string))
            if python_response.status_code == 200:
                response_json = python_response.json()
                result = []
                keys=['backdrop_path','episode_run_time','first_air_date','genres','id','name','number_of_seasons','overview','poster_path','spoken_languages','vote_average','vote_count']
                v={}
                for key in keys:
                    if key =='backdrop_path':
                        if response_json.get(key) is not None:
                            v[key]=image_pre+response_json.get(key)
                        else:
                            v[key]=BACKUP_IMAGES[key]
                    elif key=='poster_path':
                        if response_json.get(key) is not None:
                            v[key]=image_pre+response_json.get(key)
                        else:
                            v[key]=BACKUP_IMAGES[key]
                    else:
                        v[key]=response_json.get(key)
                result.append(v)
                return json.dumps(result)

            else:
                logging.error(traceback.format_exc())

        except:
            logging.error(traceback.format_exc())

    @classmethod
    def get_tv_show_credits(cls,request):
        try:
            input_string = request.args.get('input_string')
            python_response = requests.get(GET_TV_CREDITS.format(input_string))
            if python_response.status_code == 200:
                response_json = python_response.json()
                result = []
                top_8=response_json['cast'][:8]
                keys=['name','profile_path','character']

                for actor in top_8:
                    v={}
                    for key in keys:
                        if key=='profile_path':
                            if actor.get(key) is not None:
                                v[key]=image_pre+actor.get(key)
                            else:
                                v[key] = BACKUP_IMAGES[key]
                        else:
                            v[key]=actor.get(key)
                    result.append(v)
                return json.dumps(result)


            else:
                logging.error(traceback.format_exc())

        except:
            logging.error(traceback.format_exc())

    @classmethod
    def get_tv_show_reviews(cls,request):
        try:
            input_string = request.args.get('input_string')
            python_response = requests.get(GET_TV_REVIEWS.format(input_string))
            if python_response.status_code == 200:
                response_json = python_response.json()
                result = []
                top_5=response_json['results'][:5]
                keys=['username','content','rating','created_at']

                for review in top_5:
                    v={}
                    for key in keys:
                        if key=='username':
                            v[key]=review.get('author_details',{}).get('username','')
                        elif key== 'rating':
                            v[key] = review.get('author_details', {}).get('rating', '')
                        else:
                            v[key]=review.get(key)
                    result.append(v)
                return json.dumps(result)

            else:
                logging.error(traceback.format_exc())


        except:
            logging.error(traceback.format_exc())

    @classmethod
    def get_movie_genre_dict(cls, request):
        res = {}
        try:
            response = requests.get(GET_MOVIE_GENRE_LIST)
            if response.status_code == 200:
                genre_json = response.json()['genres']

                for genre in genre_json:
                    res[genre['id']] = genre['name']

            else:
                raise Exception(response.text)

        except:
            logging.error(traceback.format_exc())

        return json.dumps(res)

    @classmethod
    def get_tv_shows_genre_dict(cls, request):
        res={}
        try:
            response = requests.get(GET_TV_GENRE_LIST)
            if response.status_code == 200:
                genre_json = response.json()['genres']

                for genre in genre_json:
                    res[genre['id']] = genre['name']

                return json.dumps(res)
            else:
                raise Exception(response.text)

        except:
            logging.error(traceback.format_exc())











































if __name__=="__main__":
    h = home_page()
    h.trending_endpoint()
    print("hey")





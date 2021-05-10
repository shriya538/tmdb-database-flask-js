from flask import Flask,render_template
from flask import request
from Handler import *

app = Flask(__name__)


@app.route('/')
def first_page():
    return render_template("main_page.html")

@app.route('/movie',methods=['GET'])
def tmdb_trending_endpoint():
    return home_page.tmdb_trending_endpoint(request)

@app.route('/tv',methods=['GET'])
def tmdb_tv_airing_today():
    return home_page.tmdb_tv_airing_today(request)

@app.route('/search_movie',methods=['GET'])
def search_movie_endpoint():
    return search_page.search_movie_endpoint(request)

@app.route('/search_tv',methods=['GET'])
def search_tv_endpoint():
    return search_page.search_tv_endpoint(request)

@app.route('/multisearch',methods=['GET'])
def multi_search_endpoint():
    return search_page.multi_search_endpoint(request)

@app.route('/movie_details',methods=['GET'])
def get_movie_details():
    return search_page.get_movie_details(request)

@app.route('/movie_credits',methods=['GET'])
def get_movie_credits():
    return search_page.get_movie_credits(request)

@app.route('/movie_reviews',methods=['GET'])
def get_movie_reviews():
    return search_page.get_movie_reviews(request)

@app.route('/tv_details',methods=['GET'])
def get_tv_show_details():
    return search_page.get_tv_show_details(request)

@app.route('/tv_credits',methods=['GET'])
def get_tv_show_credits():
    return search_page.get_tv_show_credits(request)

@app.route('/tv_reviews',methods=['GET'])
def get_tv_show_reviews():
    return search_page.get_tv_show_reviews(request)

@app.route('/movie_genre',methods=['GET'])
def get_movie_genre_dict():
    return  search_page.get_movie_genre_dict(request)

@app.route('/tv_show_genre',methods=['GET'])
def get_tv_shows_genre_dict():
    return search_page.get_tv_shows_genre_dict(request)

















if __name__ == '__main__':
    app.run()

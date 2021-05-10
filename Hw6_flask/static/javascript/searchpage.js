let attributes_map = {
    'movies': ['id', 'title', 'overview', 'poster_path', 'release_date', 'vote_average', 'vote_count', 'genre_ids'],
    'tv_shows': ['id', 'name', 'overview', 'poster_path', 'first_air_date', 'vote_average', 'vote_count', 'genre_ids']
}


function alert_invalid_search_query() {
    alert("Please enter valid values.")
}


function render_search() {
    document.getElementById('panel_button_search').style.borderBottom='0.5px solid white';
    document.getElementById('panel_button_home').style.borderBottom=null;


    document.getElementById('movies_tv').innerHTML = '<div id="search_top_div">\n' +
        '    <br><br><br>\n' +
        '    <span id="search_title">Search</span>\n' +
        '    <br><br><br>\n' +
        '<label for="keyword_button" id="keyword_button_label">Keyword</label>\n' +
        '    <div class="keyword_dropdown_star">&#42;</div>\n' +
        '<input type="text" id="keyword_field" name="keyword_button">\n' +
        '    <br><br>\n' +
        '<label for="category_dropdown" id="category_dropdown_label"> Category </label>\n' +
        '    <div class="keyword_dropdown_star">&#42;</div>\n' +
        '<select id="category_dropdown" name="category_dropdown">\n' +
        '    <option value=""></option>\n' +
        '    <option value="movie">Movies</option>\n' +
        '    <option value="tv">TV Shows</option>\n' +
        '    <option value="multisearch">Movies and TV Shows</option>\n' +
        '</select>\n' +
        '    <br><br>\n' +
        '<button type="button" id="search_button">Search</button>\n' +
        '    <button type="button" id="clear_button">Clear</button>\n' +
        '</div>' +
        '<div id="showing_results_text_div">Showing results...</div>' +
         '<div id="display_results"></div>' +
        '<div id="no_results">No results found.</div>';

    document.getElementById('search_button').onclick = () => search();

    document.getElementById('clear_button').onclick = () => clear();

    document.getElementById('panel_button_home').style.color = '#FFFFFF';
    document.getElementById('panel_button_search').style.color = '#940000';
}


function render_search_results_movie(search_result, search_keys) {



        let child=document.createElement('div');
        child.classList.add('model_element_movie');

        let image_div=document.createElement('div');
        image_div.classList.add('image_div');


        let image_model_movie= document.createElement('img');
        image_model_movie.classList.add('image_model_movie');

        image_model_movie.src = search_result['poster_path'];

        image_div.appendChild(image_model_movie)
        child.appendChild(image_div); // added the image to model_element_movie

        let content_div = document.createElement('div');
        content_div.classList.add('content_div');

        let title_model_movie=document.createElement('div');
        title_model_movie.classList.add('title_model_movie');
        title_model_movie.innerHTML=search_result['title']
        content_div.appendChild(title_model_movie);

        content_div.append(document.createElement('br'));//line break

        let year_model_movie=document.createElement('div');
        year_model_movie.classList.add('year_model_movie');
        year_model_movie.innerHTML=search_result['release_date'].split('-')[0]+' | ';


        // genres to be added
        let genre_div=document.createElement('div');
        fetch('/movie_genre').then(response=>response.json()).then(data=>{

            let genre_id_list =search_result['genre_ids'];
            let eng_genre_list=[];
            for(let i=0;i<genre_id_list.length;i++){
                let str_genre=data[genre_id_list[i]];
                eng_genre_list.push(str_genre);
            }
            let eng_genre_string='';
            for(let i=0;i<eng_genre_list.length-1;i++){
                let temp_str=eng_genre_list[i];
                let str=temp_str+', ';
                eng_genre_string+=str;
            }
            eng_genre_string+=eng_genre_list[eng_genre_list.length-1];


            genre_div.classList.add('genre_div');
            genre_div.innerHTML=eng_genre_string;

        })

        // div for genre and year
        let genre_year_div=document.createElement('div');
        genre_year_div.classList.add('genre_year_div');
        genre_year_div.appendChild(year_model_movie);
        genre_year_div.appendChild(genre_div);
        content_div.appendChild(genre_year_div)


        let star_vote=document.createElement('div');
        star_vote.classList.add('star_vote');
        star_vote.innerHTML='&#x2B51;' +'&nbsp;';
        content_div.appendChild(star_vote);

        let vote_average_movie=document.createElement('div');
        vote_average_movie.classList.add('vote_average_movie');
        vote_average_movie.innerHTML=((search_result['vote_average'])/2).toFixed(1) + '/5'+'&nbsp;';
        content_div.appendChild(vote_average_movie);


        let vote_total_movie=document.createElement('div');
        vote_total_movie.classList.add('vote_total_movie');
        vote_total_movie.innerHTML=search_result['vote_count']+' votes';
        content_div.appendChild(vote_total_movie);

        content_div.append(document.createElement('br'));//line break
        content_div.append(document.createElement('br'));//line break

        let overview_movie=document.createElement('div');
        overview_movie.classList.add('overview_movie');
        overview_movie.innerHTML=search_result['overview'];
        content_div.appendChild(overview_movie);

        content_div.append(document.createElement('br'));//line break

        let more_button=document.createElement('button');
        more_button.classList.add('more_button');
        more_button.innerHTML='Show More';
        more_button.onclick = () => showModal(search_result.id,'movie');
        content_div.appendChild(more_button);

        child.appendChild(content_div);

        document.getElementById('display_results').appendChild(child);// the display_results child of movies_tv has a new movie child is the entire shebang
}

function render_search_results_tv(search_result,search_keys){
        // the display_results child of movies_tv has a new movie child is the entire shebang


        let child=document.createElement('div');
        child.classList.add('model_element_movie');

        let image_div=document.createElement('div');
        image_div.classList.add('image_div');


        let image_model_movie= document.createElement('img');
        image_model_movie.classList.add('image_model_movie');
        if (search_result['poster_path']){
            image_model_movie.src = search_result['poster_path'];
        }
        else {
            image_model_movie.src='https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg';
        }
        image_div.appendChild(image_model_movie)
        child.appendChild(image_div); // added the image to model_element_movie

        let content_div = document.createElement('div');
        content_div.classList.add('content_div');

        let title_model_movie=document.createElement('div');
        title_model_movie.classList.add('title_model_movie');
        title_model_movie.innerHTML=search_result['name']
        content_div.appendChild(title_model_movie);

        content_div.append(document.createElement('br'));//line break

        let year_model_movie=document.createElement('div');
        year_model_movie.classList.add('year_model_movie');
        year_model_movie.innerHTML=search_result['first_air_date'].split('-')[0]+' | ';


        // genres to be added
        let genre_div=document.createElement('div');
        fetch('/tv_show_genre').then(response=>response.json()).then(data=>{

            let genre_id_list =search_result['genre_ids'];
            let eng_genre_list=[];
            for(let i=0;i<genre_id_list.length;i++){
                let str_genre=data[genre_id_list[i]];
                eng_genre_list.push(str_genre);
            }
            let eng_genre_string='';
            for(let i=0;i<eng_genre_list.length-1;i++){
                let temp_str=eng_genre_list[i];
                let str=temp_str+', ';
                eng_genre_string+=str;
            }
            eng_genre_string+=eng_genre_list[eng_genre_list.length-1];


            genre_div.classList.add('genre_div');
            genre_div.innerHTML=eng_genre_string;

        })

        // div for genre and year
        let genre_year_div=document.createElement('div');
        genre_year_div.classList.add('genre_year_div');
        genre_year_div.appendChild(year_model_movie);
        genre_year_div.appendChild(genre_div);
        content_div.appendChild(genre_year_div)







        let star_vote=document.createElement('div');
        star_vote.classList.add('star_vote');
        star_vote.innerHTML='&#x2B51;' +'&nbsp;';
        content_div.appendChild(star_vote);

        let vote_average_movie=document.createElement('div');
        vote_average_movie.classList.add('vote_average_movie');
        vote_average_movie.innerHTML=((search_result['vote_average'])/2).toFixed(1) + '/5'+'&nbsp;';
        content_div.appendChild(vote_average_movie);


        let vote_total_movie=document.createElement('div');
        vote_total_movie.classList.add('vote_total_movie');
        vote_total_movie.innerHTML=search_result['vote_count']+' votes';
        content_div.appendChild(vote_total_movie);

        content_div.append(document.createElement('br'));//line break
        content_div.append(document.createElement('br'));//line break

        let overview_movie=document.createElement('div');
        overview_movie.classList.add('overview_movie');
        overview_movie.innerHTML=search_result['overview'];
        content_div.appendChild(overview_movie);

        content_div.append(document.createElement('br'));//line break

        let more_button=document.createElement('button');
        more_button.classList.add('more_button');
        more_button.innerHTML='Show More';
        more_button.onclick = () => showModal(search_result.id,'tv');
        content_div.appendChild(more_button);

        child.appendChild(content_div);

        document.getElementById('display_results').appendChild(child);// the display_results
}


function search() {
    document.getElementById('display_results').innerHTML=null;
    document.getElementById('showing_results_text_div').style.display
    ='None';
    document.getElementById('no_results').style.display='None';
    let query = document.getElementById('keyword_field').value;
    let search_type = document.getElementById('category_dropdown').value;
    if (query === null || search_type === null || query.length === 0 || search_type.length === 0) {
        alert_invalid_search_query();
        return;
    }
    let url;
    if (search_type==='multisearch'){
         url='/multisearch'+'?input_string='+query;
    }
    else{
         url = '/search_' + search_type + '?input_string=' + query;
    }


    fetch(url).then(response => response.json()).then(data => {
        if (data.length!=0) {
            let search_keys;

            document.getElementById('showing_results_text_div').style.display = 'block';



            if (search_type === 'movie') {
                search_keys =attributes_map.movies;
                data.map((o, k) => {
                    render_search_results_movie(o, search_keys);
                    let line_space=document.createElement('div');
                    line_space.classList.add('blank_line');
                    document.getElementById('display_results').appendChild(line_space);

                })

            } else if (search_type === 'tv') {
                search_keys = attributes_map.tv_shows;
                data.map((o, k) => {
                    render_search_results_tv(o, search_keys);
                    let line_space=document.createElement('div');
                    line_space.classList.add('blank_line');
                    document.getElementById('display_results').appendChild(line_space);


                })
            } else if (search_type === 'multisearch') {
                data.map((o, k) => {
                    if (o.media_type === 'movie') {
                        search_keys = attributes_map.movies;
                        render_search_results_movie(o,search_keys);
                    } else {
                        search_keys = attributes_map.tv_shows;
                        render_search_results_tv(o,search_keys)
                    }
                    let line_space=document.createElement('div');
                    line_space.classList.add('blank_line');
                    document.getElementById('display_results').appendChild(line_space);

                })
            } else {
                alert_invalid_search_query();
            }
        } else {
            document.getElementById('no_results').style.display='block';
        }
    })

}



function clear(){
    document.getElementById('display_results').innerHTML='';
    document.getElementById('keyword_field').value='';
    document.getElementById('category_dropdown').getElementsByTagName('option')[0].selected = 'selected';
    document.getElementById('showing_results_text_div').style.display = 'None';
    document.getElementById('no_results').style.display='None';



}


function closeModal() {
    document.getElementById('search_result_modal').style.display = 'None';
    document.getElementById('root_container').style.opacity = '1';
    document.getElementById('cast_credits_container').innerHTML = null;
    document.getElementById('reviews_list_container').innerHTML = null;
    document.getElementById('search_result_languages').textContent = null;
    document.getElementById('search_result_overview').textContent = null;
    document.getElementById('vote_average_model').innerHTML = null;
    document.getElementById('vote_count_model').textContent = null;
    document.getElementById('search_result_genres').textContent = null;
    document.getElementById('search_result_year').textContent = null;
    document.getElementById('search_result_title').textContent = null;
    document.getElementById('search_result_backdrop').src ='';
}

function showModal(item_id, type){
    let details_url = type + '_details?input_string=' + item_id;
    let credits_url = type + '_credits?input_string=' + item_id;
    let reviews_url = type + '_reviews?input_string=' + item_id;
    fetch(details_url).then(response => response.json()).then(responseData => {
        if (responseData) {
            let dataJson = responseData[0];
            document.getElementById('search_result_backdrop').src = dataJson.backdrop_path;
            document.getElementById('search_result_title').textContent = (type==='movie')?dataJson.title:dataJson.name;

            document.getElementById('icon_tmdb').href='https://www.themoviedb.org/'+type+'/'+dataJson.id;

            document.getElementById('search_result_year').textContent = (type==='movie')?dataJson.release_date.split('-')[0]:dataJson.first_air_date.split('-')[0];
            let genres = [];
            for (let x in dataJson.genres){
                genres.push(dataJson.genres[x].name)
            }
            document.getElementById('search_result_genres').textContent = genres.join(', ');
            document.getElementById('vote_count_model').textContent = dataJson.vote_count+' votes';
            document.getElementById('vote_average_model').innerHTML=dataJson.vote_average/2 +'/5';
            document.getElementById('search_result_overview').textContent = dataJson.overview ;
            let langs = [];
            for (let x in dataJson.spoken_languages){
                langs.push(dataJson.spoken_languages[x].english_name)
            }
            document.getElementById('search_result_languages').textContent = 'Spoken languages: ' + langs.join(', ');
            document.getElementById('search_result_modal').style.display = 'block';
            document.getElementById('root_container').style.opacity = '0.3';

        }
        else{
            alert('Sorry some problem occurred!');
        }
    })

    fetch(credits_url).then(response => response.json()).then(responseData => {
        let credits_container = document.getElementById('cast_credits_container');
        credits_container.innerHTML = '';
        if (responseData){
            responseData.map((o, k) => {
                let curr = document.createElement('div');
                curr.classList.add('credits_details_container');
                curr.id = 'cast_' + k;
                let cast_image = document.createElement('img');
                cast_image.src = o.profile_path;
                cast_image.classList.add('cast_image');
                curr.appendChild(cast_image);
                let cast_name = document.createElement('div');
                cast_name.innerHTML = '<strong>' + o.name + '</strong>';
                cast_name.classList.add('cast_name_character');
                curr.appendChild(cast_name)
                let as_div = document.createElement('div');
                as_div.innerHTML = 'AS';
                as_div.classList.add('cast_name_character');
                curr.appendChild(as_div);
                let character = document.createElement('div');
                character.innerHTML = o.character;
                character.classList.add('cast_name_character');
                curr.appendChild(character);
                credits_container.appendChild(curr);
            })
        } else {
            alert('No credits data available!');
        }
    })

    fetch(reviews_url).then(response => response.json()).then(responseData => {
        if (responseData){
            let reviews_container = document.getElementById('reviews_list_container');
            reviews_container.innerHTML = '';
            responseData.map((o, k) => {
                let curr = document.createElement('div');
                curr.id = 'review_' + k;
                curr.classList.add('review')
                let reviewer_div = document.createElement('div');
                reviewer_div.innerHTML = '<strong>' + o.username + '</strong>' +
                    ' on ' +
                    '<span class="review_creation_date">' + o.created_at.slice(0, 10).replaceAll('-', '/') + '</span>';
                reviewer_div.classList.add('reviewer_div')
                curr.appendChild(reviewer_div);

                if (o.rating!==null){
                    let star_vote=document.createElement('div');
                    star_vote.classList.add('star_vote');
                    star_vote.innerHTML='&#x2B51;' +'&nbsp;';
                    curr.appendChild(star_vote);

                    let vote_average_movie=document.createElement('div');
                    vote_average_movie.classList.add('vote_average_movie');
                    vote_average_movie.innerHTML=((o.rating)/2).toFixed(1) + '/5'+'&nbsp;';
                    curr.appendChild(vote_average_movie);


                }


                let review_content_div = document.createElement('div');
                review_content_div.classList.add('review_text');
                review_content_div.innerHTML = o.content;
                curr.appendChild(review_content_div);
                reviews_container.appendChild(curr);
                let line = document.createElement('hr');
                line.classList.add('review_break_line');
                reviews_container.appendChild(line);
            })
        } else {
            alert('No review Data available!');
        }
    })
}

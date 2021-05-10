"use strict";
function constructor_main_class(data, image_id, new_div_id,indicator,year_id) {
    let image = document.getElementById(image_id);
    let max_elements = data.length;
    let current_index = 0;
    let interval = 3000;
    let current_opacity = 0;
    let new_div=document.getElementById(new_div_id);
    let year_div=document.getElementById(year_id);



    function runShow() {
        current_opacity = 0;
        function fade_in_slide() {
            current_opacity += 0.1;
            image.style.opacity = current_opacity;
            if (current_opacity < 1) {
                setTimeout(fade_in_slide, 50);
            }
        }

        image.style.opacity = current_opacity;
        image.src = data[current_index].backdrop_path;

        if(indicator===0) {
            let title_year = data[current_index].title+' ('+data[current_index].release_date.split('-')[0] +') ';


            new_div.innerHTML=title_year;

        }
        else {
            let title = data[current_index].name + ' ('+ data[current_index].first_air_date.split('-')[0]+') ';

            new_div.innerHTML = title;
        }


        current_index = current_index + 1;
        current_index = current_index % max_elements;
        fade_in_slide();
        setTimeout(runShow, interval);
    }

    runShow();

}

function get_slideshow_tv(){
    fetch('/tv').then(response_json => response_json.json())
        .then(data =>{
            let container_id='slideshow_tv';
            let image_id='slides_tv_image';
            let parent = document.getElementById(container_id);
            let image=document.createElement('img');
            image.id=image_id;
            image.classList.add('class_slides_tv_image');
            parent.appendChild(image);

            let year_div_tv=document.createElement('div');
            year_div_tv.id='year_div_movie';

            let new_div_tv=document.createElement('div');
            let div_id='text_image_tv';
            new_div_tv.classList.add('text_image_t');
            new_div_tv.id=div_id;

            new_div_tv.appendChild(year_div_tv);

            parent.appendChild(new_div_tv);

            constructor_main_class(data,image.id,new_div_tv.id,1,year_div_tv.id);
        })
}

function get_slideshow_movies() {
    fetch('/movie').then(response_js => response_js.json())
        .then(data => {
            let container_id = 'slideshow_movies';
            let image_id = 'slides_movie_image';
            let parent = document.getElementById(container_id);
            let image = document.createElement('img');
            image.id = image_id;
            image.classList.add('class_slides_movie_image');
            parent.appendChild(image);

            let year_div_movie=document.createElement('div');
            year_div_movie.id='year_div_movie';



            let new_div_movie=document.createElement('div');
            let div_id='text_image_movie';
            new_div_movie.classList.add('text_image_m')
            new_div_movie.id=div_id;

            new_div_movie.appendChild(year_div_movie);
            parent.appendChild(new_div_movie);



            constructor_main_class(data, image.id,new_div_movie.id,0,year_div_movie.id);

        })
}

function get_home_page(){
    document.getElementById('panel_button_home').style.borderBottom='0.5px solid white';
    document.getElementById('panel_button_search').style.borderBottom=null;

    let parent=document.getElementById('movies_tv');
    parent.innerHTML = '';
    let slideshow_movies=document.createElement('div');
    let title_slideshow_movies=document.createElement('div');
    title_slideshow_movies.innerHTML='Trending Movies';
    let slideshow_movies_id='slideshow_movies';
    slideshow_movies.id=slideshow_movies_id;
    title_slideshow_movies.classList.add('title_slideshow');

    parent.appendChild(slideshow_movies);
    slideshow_movies.appendChild(title_slideshow_movies);
    for (let x = 0; x < 5; x ++){
        parent.append(document.createElement('br'));
    }

    let slideshow_tv=document.createElement('div');
    let title_slideshow_tv=document.createElement('div');
    title_slideshow_tv.innerHTML='TV Shows On-Air Today';
    let slideshow_tv_id='slideshow_tv';
    slideshow_tv.id=slideshow_tv_id;
    title_slideshow_tv.classList.add('title_slideshow');

    parent.appendChild(slideshow_tv);
    slideshow_tv.appendChild(title_slideshow_tv);

    document.getElementById('panel_button_search').style.color = '#FFFFFF';
    document.getElementById('panel_button_home').style.color = '#940000';


    get_slideshow_movies();
    get_slideshow_tv();
}

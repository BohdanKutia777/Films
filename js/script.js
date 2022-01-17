$.each(JSON.parse(localStorage.getItem('films')), function (index, film) {

    let commentsHtml = '', countComments = 0;
    $.each(film['comments'], function (index, comment) {
        commentsHtml += `<li class='li_comment'>${comment.text}</li>`;
        countComments = index;
    });

     $('#films').append(`<div class="card__film">
                <img src="img/film_1.png" alt="films">
                <div class="card__filmDescriptions">
                    <h2 class="card__filmDescriptions__name">${film.title}</h2>
                    <p class="card__filmDescriptions__descriptions">${film.description}</p>

                     <div>
                        <p class="card__descriptions">Country  <span class="results">${film.country}</span></p>
                        <p class="card__descriptions">Year: <span class="results line-1">${film.year}</span></p>
                        <p class="card__descriptions">Genre: <span class="results line-2">${film.genre}</span></p>
                        <p class="card__descriptions">Actors: <span class="results line-3">${film.poster}</span></p>
                        
                        </div>

                    <a href="#" id="${index}" class="delete card_filmDescriptions_button2">Delete</a>
                    <a href="#" id="f_${index}" class="editFilm card_filmDescriptions_button1">Edit</a>
                </div>
        
            </div>
            
            <div>
                    

                    <div  class="toggleComments bg__comment">
                        <h2 class='style__comment'> Comments: ${++countComments}</h2>
                        <ul>
                        
                        ${commentsHtml}
                        
                        
                        </ul>
                        <textarea class='comment_textarea' placeholder='Add your comment' id="comment_${index}"  cols="30" rows="10"></textarea>
                        <button id="btn_comment_${index}" class="addComment form__btn2">Add comment</button>
                    </div>
                    



                    </div>
                    
                    
                    `);
 });


 $(".toggleComments").click(function(e) { 
    $(this).children('ul').slideToggle();

 });


 $(".editFilm").click(function(e) { 


    $('#add').text('Save');

      let indexFilm = $(this).prop('id').substr(2);
      $('#indexSaveFilm').val(indexFilm);

      let films = JSON.parse(localStorage['films']);
      let film = films[indexFilm];

         $('#title').val(film['title']),
         $('#year').val(film['year']),
         $('#country').val(film['country']),
         $('#genre').val(film['genre']),
         $('#poster').val(film['poster']),
         $('#description').val(film['description'])


 });

 $(".addComment").click(function(e){ 

    let idTextarea = $(this).prop('id').substr(12);

    let indexFilm = $('#comment_' + idTextarea).prop('id').substr(8);

    let films = JSON.parse(localStorage['films']);

    films[indexFilm]['comments'].push({
        text:$('#comment_' + idTextarea).val()
    });

    localStorage.setItem('films', JSON.stringify(films));

 });

   $(".delete").click(function(e){ 

    e.preventDefault();

       let films = JSON.parse(localStorage['films']);

       films.splice( $(this).prop('id'), 1 )

       localStorage.setItem('films', JSON.stringify(films));
   });

   $('#plus').click(function () {
       $(".form").toggle();

      let textHeader = $('.page__header__plus');

      if (textHeader.text() == '+') {
        textHeader.text('✕');
      } else {
        textHeader.text(`+`);
      }

   });
   $('#plusBut').click(function () {
       $(".form").toggle();

      let textHeader = $('.page__header__plus');

      if (textHeader.text() == '+') {
        textHeader.text('✕');
      } else {
        textHeader.text('+');
      }

   });
   
  

  $("#add").click(function(){ 

    let indexSaveFilm = $('#indexSaveFilm').val();

    let films = JSON.parse(localStorage.getItem('films'));

    if (indexSaveFilm.length > 0) {
        films[indexSaveFilm]['title'] = $('#title').val();
        films[indexSaveFilm]['year'] = $('#year').val();
        films[indexSaveFilm]['country'] = $('#country').val();
        films[indexSaveFilm]['genre'] = $('#genre').val();
        films[indexSaveFilm]['poster'] = $('#poster').val();
        films[indexSaveFilm]['description'] = $('#description').val();
        localStorage.setItem('films', JSON.stringify(films));

        $('#indexSaveFilm').val('');
    } else {


    if (films == null) {
        films = [];
    }


    const filmsData = {
        title: $('#title').val(),
        year: $('#year').val(),
        country: $('#country').val(),
        genre: $('#genre').val(),
        poster: $('#poster').val(),
        description: $('#description').val(),
        comments: []
    };

    if ($('#title').val().length == 0
    || $('#year').val().length == 0
    || $('#country').val().length == 0
    || $('#genre').val().length == 0
    || $('#poster').val().length == 0
    || $('#description').val().length == 0
    ) {

     alert('Please enter all data');

    } else {

    films.push(filmsData);

    localStorage.setItem('films', JSON.stringify(films));

    }

}


   });

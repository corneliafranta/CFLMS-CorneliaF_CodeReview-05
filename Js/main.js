function getData() {
    return fetch('../Json/movies.json')
        .then(function (resp) {
            return resp.json();
        })
}


class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.image = movie.image;
        this.description = movie.description;
        this.trailer = movie.trailer;
        this.rating = movie.rating;
        this.critic = movie.critic;
        this.criticSource = movie.criticSource;
        this.fsk = movie.fsk;
        this.originalLanguage = movie.originalLanguage;
        this.director = movie.director;
        this.likes = Math.floor(Math.random() * 101);
        this.button_pressed = false;
    }

    increaseLikes(event) {

        if (!event.data.movieObj.button_pressed) {
            event.data.movieObj.likes++;
            event.data.likeCountDisplay.text(event.data.movieObj.likes);
            event.data.movieObj.button_pressed = true;
            this.innerHTML = 'dislike &nbsp; <i class=\'far fa-thumbs-down\'></i>'

        } else {
            event.data.movieObj.likes--;
            event.data.likeCountDisplay.text(event.data.movieObj.likes);
            event.data.movieObj.button_pressed = false;
            this.innerHTML = 'Like &nbsp; <i class=\'far fa-thumbs-up\'></i>'
        }
    }
}

movieObjects = [];

function populateSite(movies) {
    var contentContainer = $('#content');
    contentContainer.text("");
    Object.values(movies).forEach(function (movie) {

        var row = $('<div class="row movie-post"></div>');
        var row2 = $('<div class="row"></div>');
        var imageContainer = $('<div class="imageContainer"></div>');
        var movieImage = $(`<img src="${movie.image}" alt="${movie.name}">`);
        var textContainer = $('<div class="textContainer"></div>');
        var text = $('<div class="text"></div>');
        var like = $('<div class="like"></div>');
        var movieHeading = $(`<h1>${movie.title}</h1>`);
        var description = $(`<p>${movie.description}</p>`);
        var likeButton = $('<button type="button">Like &nbsp;<i class=\'far fa-thumbs-up\'></i></button>');
        var likeCountDisplay = $(`<div class="likeCountContainer" id="like${movie.title}">${movie.likes} </div>`);
        likeButton.click({movieObj: movie, likeCountDisplay: likeCountDisplay}, movie.increaseLikes);

        /* will implement in my own time since its not part of the assignment just ignore it
        var showMoreBtn = $('<button type="button" class="showMore">Show More</button>');
        var videoColumn = $('<div class="videoColumn"></div>');
        var textColumn = $('<div class="textColumn"></div>');
        var trailer = movie.trailer;
        var director = $(`<p>${movie.director}</p>`);
        var originalLanguage = $(`<div>${movie.director}</div>`);
        showMoreBtn.click({})

        */

        contentContainer.append(row);
        row.append(imageContainer);
        imageContainer.append(movieImage);
        row.append(textContainer);
        text.append(movieHeading);
        text.append(description);
        textContainer.append(text);
        row2.append(likeButton);
        row2.append(likeCountDisplay);
        like.append(row2);
        textContainer.append(like);
    });

    /*
    var detailContainer = $('<div class="detailContainer" id="0" style="width: 90%; height: 5em; background-color: #4d6b5b;"></div>');
    var detailContainer2 = $('<div class="detailContainer" id="1" style="width: 90%; height: 5em; background-color: #4d6b5b;"></div>');
    var detailContainer3 = $('<div class="detailContainer" id="2" style="width: 90%; height: 5em; background-color: #4d6b5b;"></div>');
    var rows = $('.movie-post');
    $(rows[1]).after(detailContainer);
    $(rows[3]).after(detailContainer2);
    $(rows[5]).after(detailContainer3)

     */

}

function propComparator(sortBy) {
    return function (a, b) {
        if (a[sortBy] < b[sortBy]) {
            return -1;
        }
        if (a[sortBy] > b[sortBy]) {
            return 1;
        }
        return 0;
    }
}


function sortContent() {
    var sortBy = this.value;
    var orderDirection = this.getAttribute('data-order-direction');
    var sortedMovies = movieObjects.sort(propComparator(sortBy));
    if (orderDirection === "desc") {
        sortedMovies = sortedMovies.reverse()
    }
    populateSite(sortedMovies);
}

/*
function showDetail(movie){

};
*/


getData().then(function (movies) {
    console.log(movies);
    movies.forEach(function (movie) {
        var movieObj = new Movie(movie);
        movieObjects.push(movieObj);
    });


}).then(function () {
    populateSite(movieObjects);


});


sortByFskButton = $("#sortByFskButton");
sortByLikesButton = $("#sortByLikesButton");
sortByFskButton.on('click', sortContent);
sortByLikesButton.on('click', sortContent);
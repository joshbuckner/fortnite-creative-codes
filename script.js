// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("btn-container");
var btns = btnContainer.getElementsByClassName("btn-filter");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

filterSelection("all")

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filter-div");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
    updateHeading();
}

function filterByMapName(c) {
    for (var i = 0; i < btns.length; i++) {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        btns[btns.length - 1].className += " active";
    }

    if (c == "all") c = "";
    for (var i = 0; i < $(".filter-div .card-header").length; i++) {
        removeClass($(".filter-div")[i], "show");
        if ($(".filter-div .card-header")[i].innerHTML.toLowerCase().includes($("#search-input")[0].value.toLowerCase()) && $("#search-input")[0].value.toLowerCase() !== '') {
        // if ($(".filter-div .card-header")[i].innerHTML.toLowerCase() === $("#search-input")[0].value.toLowerCase()) {
            addClass($(".filter-div")[i], "show");
        }
    }


}

function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function searchCards() {
    filterByMapName($("#search-input")[0].value.toLowerCase());
    displaySearchHeading();
}


function updateHeading() {
    setTimeout(function() {
        document.getElementsByClassName("jumbotron-heading")[0].innerHTML = document.getElementsByClassName("active")[0].innerText;
    }, 1);
}


function displaySearchHeading() {
    if ($('.show').length === 0) {
        document.getElementsByClassName("jumbotron-heading")[0].innerHTML = 'Results for "' + $("#search-input")[0].value + '"' + "<br>Map Not Found";
    } else {
        document.getElementsByClassName("jumbotron-heading")[0].innerHTML = 'Results for "' + $("#search-input")[0].value + '"';
    }
}

function showSubmit() {
  $(".submit-map")[0].classList.remove("hidden");
}

function hideSubmit() {
  $(".submit-map")[0].classList.add("hidden");
  console.log('hiding');
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
}())

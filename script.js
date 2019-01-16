// Add active class to the current button (highlight it)
// var btnContainer = $("#btn-container");
var btns = $(".btn-filter");
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
	x = $(".filter-div");
	if (c == "all") c = "";
	for (i = 0; i < x.length; i++) {
		removeClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
	}
	updateHeading();
}

function filterByMapSearch(c) {
	for (var i = 0; i < btns.length; i++) {
		var current = $(".active");
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
	filterByMapSearch($("#search-input")[0].value.toLowerCase());
	displaySearchHeading();
}


function updateHeading() {
	setTimeout(function() {
		$(".jumbotron-heading")[0].innerHTML = document.getElementsByClassName("active")[0].innerText;
	}, 1);
}


function displaySearchHeading() {
	if ($('.show').length === 0) {
		$(".jumbotron-heading")[0].innerHTML = 'Results for "' + $("#search-input")[0].value + '"' + "<br>Map Not Found";
	} else {
		$(".jumbotron-heading")[0].innerHTML = 'Results for "' + $("#search-input")[0].value + '"';
	}
}

function showSubmit() {
	$(".submit-map")[0].classList.remove("hidden");
}

function hideSubmit() {
	$(".submit-map")[0].classList.add("hidden");
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
	'use strict'

	window.addEventListener('load', function() {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = $('.needs-validation')

		// Loop over them and prevent submission
		Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
				if (form.checkValidity() === false) {
					event.preventDefault()
					event.stopPropagation()
				}
				form.classList.add('was-validated')
			}, false)
		})
	}, false)
}())

function createMapTile() {
	if ($("#map-name")[0].value !== "" &&
		$("#author")[0].value !== "" &&
		$("#island-code")[0].value !== "" &&
		$("#category")[0].value !== "") {
		$('#content .row').append('<a class="card-modal" href="#ModalCenter" data-toggle="modal" onclick="generateModalData(`' + $("#map-name")[0].value + '`, `' + $(".file-preview")[0].src + '`, `' + $("#island-code")[0].value + '`, `' + $("#island-code")[0].value + '`);">' + 
			'<div class="filter-div all ' +
			$("#category")[0].value + ' col-lg-4"><div class="card mb-4 shadow-sm text-white lighter-gray-section"><div class="card-header text-center card-heading-larger">' +
			$("#map-name")[0].value + '</div><img src="' + $(".file-preview")[0].src + '" class="card-img-top" alt="..."><div class="card-body"><p class="card-text text-center code-text">Code: ' +
			$("#island-code")[0].value +
			' <br>(' +
			$("#author")[0].value + ')</p></div></div></a></div>');

	}
	return false;
}
// map name input data
// console.log($("#map-name")[0].value);
// author input data
// console.log($("#author")[0].value);
// island code input data
// console.log($("#island-code")[0].value);
// file upload input data
// console.log($("#inputGroupFile01")[0].value);
// category selection input data
// console.log($("#category")[0].value);

function generateModalData(title, image, code, author,) {
	console.log(title, image, code, author)
	$('#modal-title')[0].innerHTML = title;
	$('#modal-image').attr("src", image);
	$('#modal-code')[0].innerHTML = code;
	$('#modal-author')[0].innerHTML = author;
}

function previewFile() {
  var preview = $(".file-preview");
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview[0].src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  } 
  $(".custom-file-label")[0].innerText = document.querySelector('input[type=file]').files[0].name;
}

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
	return new bootstrap.Popover(popoverTriggerEl);
});

window.setTimeout(function() {
	$('.alert').fadeTo(500, 0).slideUp(500, function() {
		$(this).remove();
		$('.flash-container').remove();
	});
}, 3000);

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
	'use strict';

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation');

	// Loop over them and prevent submission
	Array.prototype.slice.call(forms).forEach(function(form) {
		form.addEventListener(
			'submit',
			function(event) {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add('was-validated');
			},
			false
		);
	});
})();

let $firstPart = $('.first-part');
let $secondPart = $('.second-part');
$secondPart.css('height', $firstPart.height());

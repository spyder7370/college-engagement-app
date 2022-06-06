var $recoms = $('#imageTypeLabel1');
var $custom = $('#imageTypeLabel2');
var $recomsContainer = $('.auto-img');
var $customContainer = $('.custom-img');
$recomsContainer.hide();
$customContainer.hide();
$recoms.click(function() {
	if ($recoms.is(':checked')) {
		$recomsContainer.slideDown();
		$customContainer.slideUp();
	}
});
$custom.click(function() {
	if ($custom.is(':checked')) {
		$recomsContainer.slideUp();
		$customContainer.slideDown();
	}
});
// if ($custom.is(':checked')) {
// 	alert('custom checked');
// 	$recomsContainer.slideUp();
// 	$customContainer.slideDown();
// } else if ($recoms.is(':checked')) {
// 	alert('recoms checked');
// 	$recomsContainer.slideDown();
// 	$customContainer.slideUp();
// }

import $ from 'jquery';
$(document).ready(function(){
  $('.multi-button').on('click', 'button', function() {
  $(this).addClass('btn').siblings().removeClass('btn');
});
});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .

var ready;
ready = function() {
  $('.alert').delay(3000).fadeOut();

  $('.weekend').click(function () {
    if ($(this).hasClass('clicked')){
      $(this).removeClass('btn-danger clicked').addClass('btn-success');
      $(this).parents('tr').removeClass('danger').addClass('success');
      $(this).parents('tr').find('th:nth-child(2), th:nth-child(3)').each(function( index, element ) {
        var html = $(element).html().replace(/Вихідний/, ' : ');
        $(element).html(html)
      });
      $(this).parents('tr').find('select').val('00').show();
    }
    else {
      $(this).removeClass('btn-success').addClass('btn-danger clicked');
      $(this).parents('tr').removeClass('success').addClass('danger');
      $(this).parents('tr').find('th:nth-child(2), th:nth-child(3)').each(function( index, element ) {
        var html = $(element).html().replace(/ : /, 'Вихідний');
        $(element).html(html)
      });
      $(this).parents('tr').find('select').val(null).hide();
    }
  });

      $('#q').bind("change input paste", function(){
        var val = $(this).val();
        $.get( "/search_suggestions?query="+val, function(data) {
          $('#results').empty();
          $('#results').show();
          $.each(data, function(index, result) {
            $('#results').append('<li><img src="' + result.photo + '"> &nbsp '+result.fullname+'</li>');
            $('#results').click(function () {
                location.href = '/doctors/'+result.id;
                //this.href = this.href + ('&doctor_id=').val().open;
            });
          });
        });
        //if (typeof (val) == 'undefined' || val == null) {
        //  $('#results').hide();
        //}
      });
};
$(document).ready(ready);
$(document).on('page:load', ready);
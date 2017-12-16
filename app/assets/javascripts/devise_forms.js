$(document).ready(function() {

  var $body = $("body");
  var form = $body.find('form');

  if ($body.hasClass("registrations-new") || $body.hasClass("registrations-create")) {
    FormWizard.init();
    return false;
  }
  // } else if ($body.hasClass("passwords-new")) {

  //   var rules = {
  //                 'user[email]': {
  //                   email: true
  //                 }
  //               },
  //       messages = {},
  //       btnMessage = "Sending instructions";

  // } else if ($body.hasClass("passwords-edit") || $body.hasClass("passwords-update")) {

  //   var rules = {
  //                 'user[password]': {
  //                   minlength: 8
  //                 },
  //                 'user[password_confirmation]': {
  //                   minlength: 8,
  //                   equalTo: "#user_password"
  //                 }
  //               },
  //       messages = {
  //                     'user[password_confirmation]': {
  //                       equalTo: "Password confirmation must match password"
  //                     }
  //                   },
  //       btnMessage = "Resetting password";

  // } else if ($body.hasClass("confirmations-new")) {

  //   var rules = {
  //                 'user[email]': {
  //                   email: true
  //                 }
  //               },
  //       messages = {},
  //       btnMessage = "Sending instructions";

  // } else if ($body.hasClass("sessions-new")) {

  //   var rules = {
  //                 'user[email]': {
  //                   email: true
  //                 }
  //               },
  //       messages = {},
  //       btnMessage = "Signing in";
  // } else if ($body.hasClass("invitations-edit") || $body.hasClass("invitations-update")) {

  //   var rules = {
  //                 'user[password]': {
  //                   minlength: 8
  //                 },
  //                 'user[password_confirmation]': {
  //                   minlength: 8,
  //                   equalTo: "#user_password"
  //                 }
  //               },
  //       messages = {
  //                     'user[password_confirmation]': {
  //                       equalTo: "Password confirmation must match password"
  //                     }
  //                   },
  //       btnMessage = "Setting password";

  // } else if ($body.hasClass("passwords-new")) {
  //   var rules = {
  //                 'user[email]': {
  //                   email: true
  //                 }
  //               },
  //       messages = {},
  //       btnMessage = "Sending instructions";
  // }

  validateForm(form, rules, messages, btnMessage);

  $("#submitForm").click(function(){
    form.submit();
    return false;
  });

  $("input").keypress(function(event) {
    if (event.which == 13) {
      form.submit();
      return false;
    }
  });
});

function validateForm(form, rules, messages, btnMessage) {

  form.formValidation({
    doNotHideMessage: true,
    errorElement: 'span', //default input error message container
    errorClass: 'help-block help-block-error small', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    rules: rules,
    messages: messages,
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').removeClass('has-success').addClass('has-danger'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-danger'); // set error class to the control group
    },
    success: function (label) {
      label
        .addClass('valid') // mark the current input as valid
        .closest('.form-group').removeClass('has-danger').addClass('has-success'); // set success class to the control group
    },
    submitHandler: function (form) {
      disableBtn(btnMessage);
      if ($body.hasClass("sessions-new")) {
        var passw = $('#user_password').val();
        localStorage.setItem('pass_subdomain', passw);
      }
      form.submit();
    }
  });
}

function disableBtn(btnMesssage) {
  $("#submitForm").html("<i class='fa fa-spinner fa-spin'></i> "+btnMesssage+"...").prop('disabled', true);
}

var FormWizard = function() {
  $('#form_wizard_1').find('.button-submit').hide();
  return {
    //main function to initiate the module
    init: function() {
      if (!jQuery().bootstrapWizard) {
        return;
      }

      var form = $('#new_user'),
          error = $('.alert-danger', form),
          success = $('.alert-success', form),
          form_wizard = $('#form_wizard_1'),
          graphic_section = $('#graphic_section_wrapper');
      form.formValidation({
        framework: 'bootstrap',
        live: 'disabled',
        doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
        err: {
          clazz: 'text-danger' // default input error message class
        },
        invalid: 'has-danger',
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        focusInvalid: false, // do not focus the last invalid input
        fields: {
          //account
          'user[first_name]': {
            validators: {
              notEmpty: {
                message: "What can we call you?",
              }
            }
          },
          'user[last_name]': {
            validators: {
              notEmpty: {
                message: "We know you have a last name too",
              }
            }
          },
          'user[nic]':{
            validators: {
              notEmpty: {
                message: 'NIC is necessary to create your account.'
              },
              stringLength: {
                min: 13,
                message: "Looks like your NIC is not valid."
              }
            }
          },
          'user[email]': {
            validators: {
              notEmpty: {
                  message: "We'll need your email to set up your account and get you onboarded"
              }
              // ,
              // remote: {
              //   url: "/users/validate_email",
              //   type: "get",
              //   data: {
              //     'email': function(){ return $('#user_email').val(); }
              //   },
              //   message: "This email address is already taken. If you'd like to add another company under this email address, you can simply sign in to your account and select 'Add Company' from the header dropdown."
              // }
            }
          },
          'user[password]': {
            validators: {
              notEmpty: {
                message: "Necessary to secure your account"
              },
              stringLength: {
                min: 8,
                message: "Just to be safe, passwords should be at least 8 characters."
              }
            }
          },
          'user[cell_number]': {
            validators: {
              notEmpty: {
                message: "Your personal cell/mobile number is required."
              },
              stringLength: {
                min: 10,
                message: "Your cell number seems to be incorrect."
              }
            }
          },
          'user[office_phone_number]': {
            validators: {
              notEmpty: {
                message: "Your office phone number is required for contacting you."
              },
              stringLength: {
                min: 10,
                message: "Your office phone number seems to be incorrect."
              }
            },
            'user[agency_users_attributes][0][agency_attributes][name]': {
              validators: {
                notEmpty: {
                  message: "Your agency has a name."
                }
              }
            },
            'user[agency_users_attributes][0][agency_attributes][subdomain]': {
              validators: {
                notEmpty: {
                  message: "Please provide a subdomain."
                },
                stringLength: {
                  min: 3,
                  message: "Subdomain must be at least 3 characters."
                }
              }
            }
          }
          // 'user[company_users_attributes][0][company_attributes][subdomain]': {
          //   min: 3,
          //   remote: {
          //     data: {
          //       subdomain: function() {
          //         return $('input[name="user[company_users_attributes][0][company_attributes][subdomain]"]').val();
          //       }
          //     },
          //     url: "/check_domain",
          //     type: "get"
          //   }
          // },
          // //location info
          // 'user[company_user_attributes][company_attributes][locations_attributes][0][phone_number]': {
          //   phoneUS: true
          // },
          // 'user[company_user_attributes][company_attributes][locations_attributes][0][zip]': {
          //   minlength: 5,
          //   maxlength: 5
          // }
        },
          
        //   'user[terms_of_services]': {
        //     required: "Just some legal stuff we need"
        //   },
        //   'user[company_users_attributes][0][company_attributes][subdomain]' : {
        //     minlength: "Subdomain must be at least 3 characters",
        //     remote: "This company domain has already been claimed"
        //   }
        // },
        errorPlacement: function (error, element) { // render error placement for each input type
          if (element.attr("name") == "user[terms_of_services]") { // for uniform checkboxes, insert the after the given container
            error.insertAfter(element.closest('label'));
          } else if (element.attr("name") == "user[company_user_attributes][company_attributes][subdomain]") { // for uniform checkboxes, insert the after the given container
            error.insertAfter(element.closest('.input-group'));
          } else {
            error.insertAfter(element); // for other inputs, just perform default behavior
          }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
          App.scrollTo(error, -200);
        },
        highlight: function (element) { // hightlight error inputs
          $(element).closest('.form-group').removeClass('has-success').addClass('has-danger'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
          $(element).closest('.form-group').removeClass('has-danger'); // set error class to the control group
        },
        success: function (label) {
          label
            .addClass('valid') // mark the current input as valid
            .closest('.form-group').removeClass('has-danger').addClass('has-success'); // set success class to the control group
        },
        submitHandler: function (form) {
          form[0].submit();
        }
      }); //ended formValidation

      var displayConfirm = function() {
        $('#tab4 .form-control-static', form).each(function(){
          var input = $("#"+$(this).attr("data-display"), form);
           if (input.is("select")) {
            $(this).html(input.find('option:selected').text());
          }
          else if (input.prop('type') == 'radio') {
            $(this).html($("#"+$(this).attr("data-display")+":checked").attr('c_text'));
          }
           else {
            $(this).html(input.val());
          }
        });
      }

      var handleTitle = function(tab, navigation, index) {
        var total = navigation.find('li').length;
        var current = index + 1;
        // set wizard title
        $('.step-title', form_wizard).text('Step ' + (index + 1) + ' of ' + total);
        // set done steps
        $('li', form_wizard).removeClass("active");
        var li_list = navigation.find('li');
        for (var i = 0; i < index; i++) {
          $(li_list[i]).addClass("active");
        }

        if (current == 1) {
          form_wizard.find('.button-previous').hide();
        } else {
          form_wizard.find('.button-previous').show();
        }

        graphic_section.removeClass("rocket1 rocket2 rocket3 rocket4");
        graphic_section.addClass("rocket"+current);

        if (current >= total) {
          form_wizard.find('.button-next').hide();
          form_wizard.find('.button-submit').show();
          displayConfirm();
          graphic_section.addClass("last-step-bg").removeClass("non-last-step-bg");
        } else {
          form_wizard.find('.button-next').show();
          form_wizard.find('.button-submit').hide();
          graphic_section.addClass("non-last-step-bg").removeClass("last-step-bg");
        }
        // App.scrollTo($('.page-title'));
      }

      var formValidation = form.data('formValidation');
      // default form wizard
      form_wizard.bootstrapWizard({
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        onTabClick: function (tab, navigation, index, clickedIndex) {
          formValidation.validate();
          if (formValidation.isValid() == false) {
            return false;
          }
          handleTitle(tab, navigation, clickedIndex);
        },
        onNext: function (tab, navigation, index) {
          formValidation.validate();
          if (formValidation.isValid() == false) {
            return false;
          }
          console.log("here");
          handleTitle(tab, navigation, index);
        },
        onPrevious: function (tab, navigation, index) {
          handleTitle(tab, navigation, index);
        },
        onTabShow: function (tab, navigation, index) {
          var total = navigation.find('li').length,
              current = index + 1,
              $percent = (current / total) * 100;

          form_wizard.find('.progress-bar').css({
              width: $percent + '%'
          });
        }
      });

      $('#form_wizard_1 .button-submit').click(function () {
        form[0].submit();
      });

      $(".radiosGr .radio").click(function(){
        $(".radiosGr label").removeClass('radio_active')
        $(this).parent('label').addClass('radio_active');
      });
    }
  };
}();

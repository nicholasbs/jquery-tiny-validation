(function ($) {
  $.fn.tinyValidation = function (options) {
    var defaultOptions = {
      immediateValidation: false,
      disableSubmit: true,
      validateOnBlur: true,
      validateOnKeyUp: false,
      errorClass: 'error', // added to inputs with errors
      validClass: 'valid', // added to valid inputs
      onValid: null, // function called when field is valid
      onError: null, // function called when field has error
      validators: {
        email: function (email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return email.match(re) ? true : "Please enter a valid email";
        },
        notEmpty: function (val) {
          return val != "" ? true : "This field is required";
        },
        matchesOtherField: function (val) {
          var $otherEl = $($(this).data('match-field-selector'));
          return val === $otherEl.val();
        }
      }
    };
    options = $.extend(true, defaultOptions, options);

    this.each(function () {
      var $form = $(this),
          numValidatedFields = 0;

      if (options.disableSubmit) $form.find(':submit').attr('disabled', 'true');

      $form.find('input, textarea').each(function () {
        if (!$(this).data('validate')) return;
        numValidatedFields++;

        var validations = $(this).data('validate').split(/\s*,\s*|\s+/),
            showErrors = options.immediateValidation;

        var validateField = function () {
          var val = $(this).val(),
              errors = [],
              i,
              validation,
              res;

          for (i=0; i < validations.length; i++) {
            validation = validations[i];
            res = options.validators[validation].call(this, val);
            if (res == false || typeof res === 'string') {
              // Error or error message returned
              errors.push(res || "This field has an error");
            }
          }

          if (errors.length > 0 && showErrors) {
            $(this).addClass(options.errorClass);
            $(this).removeClass(options.validClass);
            if (typeof options.onError === 'function') options.onError.call(this, errors);
          } else if (errors.length === 0) {
            showErrors = true;
            $(this).addClass(options.validClass);
            $(this).removeClass(options.errorClass);
            if (typeof options.onValid === 'function') options.onValid.call(this);
          }

          if (options.disableSubmit) {
            if ($form.find("." + options.validClass).length == numValidatedFields) {
              $form.find(':submit').removeAttr('disabled');
            } else {
              $form.find(':submit').attr('disabled', 'true');
            }
          }
        };

        if (!options.immediateValidation) $(this).blur(function () { showErrors = true; });
        if (options.validateOnBlur) $(this).blur(validateField);
        if (options.validateOnKeyUp) $(this).keyup(validateField);
        if (options.disableSubmit) {
          $(this).bind('input', validateField);
          $(this).trigger('input');
        }

        if ($form.data("validate-on-load") === true) {
          validateField.call(this);
        }
      });


    });

    return this;
  };
})(jQuery);

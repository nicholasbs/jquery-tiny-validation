(function($) {
  $.fn.tinyValidation = function(options) {
    var defaultOptions = {
      validateOnBlur: true,
      validateOnKeyUp: false,
      errorClass: 'error', // added to inputs with errors
      validClass: 'valid', // added to valid inputs
      onValid: null, // function called when field is valid
      onError: null, // function called when field has error
      validators: {
        email: function(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return email.match(re) ? true : "Please enter a valid email";
        },
        notEmpty: function(val) {
          return val != "" ? true : "This field is required";
        }
      }
    };
    options = $.extend(true, defaultOptions, options);

    this.find('input, textarea').each(function() {
      if (!$(this).attr('data-validate')) return;

      var validations = $(this).attr('data-validate').replace(/\s/g, '').split(',');

      var validateField = function() {
        var val = $(this).val();
        var errors = [];
        for (var i=0; i < validations.length; i++) {
          var validation = validations[i];
          var res = options.validators[validation](val);
          if (res == false || typeof res === 'string') { // Error or error message returned
            errors.push(res || "This field has an error");
          }
        }

        if (errors.length > 0) {
          $(this).addClass(options.errorClass);
          $(this).removeClass(options.validClass);
          if (typeof options.onError === 'function') options.onError.call(this, errors);
        } else {
          $(this).addClass(options.validClass);
          $(this).removeClass(options.errorClass);
          if (typeof options.onValid === 'function') options.onValid.call(this);
        }
      }

      if (options.validateOnBlur) $(this).blur(validateField);
      if (options.validateOnKeyUp) $(this).keyup(validateField);
    });

    return this;
  };
})(jQuery);

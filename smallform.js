(function(window, undefined) {
  function Nuj() {
    this.extend = function(base, add) {
      if (base == undefined) return add;
      for (k in add) {
        base[k] = add[k];
      }
      return base;
    };
  }

  window.Nuj = window.Nuj || new Nuj();
})(window);

(function() {
  var initFormValidation = function(el, options) {
    options = Nuj.extend({validateOnBlur: true}, options);
    if (options.validators) {
      Nuj.extend(validators, options.validators);
    }

    $(el).find('input').each(function() {
      if (!$(this).attr('data-validate')) return;

      var validations = $(this).attr('data-validate').replace(/\s/g, '').split(',');

      var validateField = function() {
        var val = $(this).val();
        var errors = [];
        for (var i=0; i < validations.length; i++) {
          var validation = validations[i];
          if (!validators[validation](val)) {
            errors.push(messages[validation]);
          }
        }

        if (errors.length > 0) {
          $(this).addClass('error');
          $(this).removeClass('valid');
        } else {
          $(this).addClass('valid');
          $(this).removeClass('error');
        }
      }

      if (options.validateOnBlur)
        $(this).blur(validateField);
      if (options.validateOnKeyUp)
        $(this).keyup(validateField);
    });
  };

  // Default validators
  var validators = {
    email: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return email.match(re);
    },
    notEmpty: function(val) {
      return val != "";
    }
  };

  var messages = {
    email: "Please enter a valid email",
    notEmpty: "This field is required"
  };

  window.initFormValidation = window.initFormValidation || initFormValidation; 
})();


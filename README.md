#About

**TinyValidation** is a jQuery plugin for simple form validation. It validates fields using built-in validators (`notEmpty`, `email`) and/or custom validation functions. You specify which form elements to validate through a `data-validate` HTML attribute, which is comma-separated list of validators to run for that element.

##Example

Example markup:

    <form id="form1">
      <label for="name">Name</label>
      <input type="text" id="name" data-validate="notEmpty" />
      <label for="email">Email</label>
      <input type="text" id="email" data-validate="email, notEmpty" />
    </form>

Example JavaScript:
  
    $('#form1').tinyValidation({validateOnKeyUp: true});


##Options

The following options can be passed to `tinyValidation` in an optional hash:

  * `disableSubmit`. Disables all submit buttons unless every field with validations has been marked as valid. Default: `true`
  * `validateOnBlur`. Determines whether validations are run on blur events. Default: `true`.
  * `validateOnKeyUp`. Determines whether validations are run on keyUp events. Default: `false`.
  * `errorClass`. The name of the class added to form elements with invalid values. Default: `error`.
  * `validClass`. The name of the class added to form elements with valid values. Default: `valid`.
  * `onError`. Function called after a field has failed validation. The first argument passed to the function is the form element, and the second is an array of error messages (as strings). Default: `null`
  * `onValid`. Function called after a field has been validated successfully. The function will be passed the form element that was validated.
  * `validators`. A hash in which the keys are the names of validation functions, and the values are functions that accept an input value and return true if the validation succeeds, and false (or an error message) if the validation fails.

##Custom validation functions

In addition to the `notEmpty` and `email` validation functions provided by default, you can define your own. The following example checks if a field follows the standard format for a US zip code (e.g., 12345 or 12345-1234).

    $('#form1').tinyValidation({
      validators: {
        zipCode: function(zip) {
          var re = /^\d\d\d\d\d(-?\d\d\d\d)?$/;
          return re.test(zip) ? true : "Invalid zip code (ex. 12345 or 12345-1234)";
    }}});

This function will be called for any input fields with `zipCode` in its `data-validate` HTML attribute.

##License

Copyright (c) 2011, Nicholas Bergson-Shilcock.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
  * Neither the name of the <organization> nor the
    names of its contributors may be used to endorse or promote products
    derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

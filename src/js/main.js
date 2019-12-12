
// Upload multiple images
const fileSelect = document.getElementById("photo-select"),
  fileElem = document.getElementById("gallery-photo-add");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
}, false);

$(function () {
  var imagesPreview = function (input, placeToInsertImagePreview) {

    if (input.files) {
      var filesAmount = input.files.length;
      for (i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = function (event) {
          $($.parseHTML('<img>')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
        }
        reader.readAsDataURL(input.files[i]);
      }
    }
  };

  $('#gallery-photo-add').on('change', function () {
    imagesPreview(this, 'div.gallery');
  });
});

// Scan barcode
var Quagga = window.Quagga;
var App = {
    _scanner: null,
    init: function() {
        this.attachListeners();
    },
    decode: function(file) {
        Quagga
            .decoder({readers: ['code_128_reader']})
            .locator({patchSize: 'medium'})
            .fromSource(file, {size: 800})
            .toPromise()
            .then(function(result) {
                document.querySelector('input.scanner').value = result.codeResult.code;
            })
            .catch(function() {
                document.querySelector('input.scanner').value = "Not Found";
            })
            .then(function() {
                this.attachListeners();
            }.bind(this));
    },
    attachListeners: function() {
        var self = this,
            button = document.querySelector('.input-field .button.scan'),
            fileInput = document.querySelector('.input-field input[type=file]');
        button.addEventListener("click", function onClick(e) {
            e.preventDefault();
            button.removeEventListener("click", onClick);
            document.querySelector('.input-field input[type=file]').click();
        });
        fileInput.addEventListener("change", function onChange(e) {
            e.preventDefault();
            fileInput.removeEventListener("change", onChange);
            if (e.target.files && e.target.files.length) {
                self.decode(e.target.files[0]);
            }
        });
    }
};
App.init();


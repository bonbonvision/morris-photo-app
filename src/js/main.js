
// Upload multiple images
const fileSelect = document.getElementById("photoBtn"),
  fileElem = document.getElementById("photoInput");

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

  $('#photoInput').on('change', function () {
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

// Upload files to Firebase
var auth = firebase.auth();
//A reference to firebase storage service — it allows you to use all of the methods they make available for storing data and files.
var storageService = firebase.storage();
// A reference to your actual instantiation of that service — leads to your specific database and root file location where things get uploaded
var storageRef = storageService.ref();
// var input = document.getElementById("trackingInput").value;

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var file = evt.target.files[0];

  var metadata = {
    'contentType': file.type
  };

  // Push to child path.
  // [START oncomplete]
  storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    console.log('File metadata:', snapshot.metadata);
    // Let's get a download URL for the file.
    snapshot.ref.getDownloadURL().then(function(url) {
      console.log('File available at', url);
      // [START_EXCLUDE]
      document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
      // [END_EXCLUDE]
    });
  }).catch(function(error) {
    // [START onfailure]
    console.error('Upload failed:', error);
    // [END onfailure]
  });
  // [END oncomplete]
}

window.onload = function() {
  document.getElementById('file').addEventListener('change', handleFileSelect, false);
  document.getElementById('file').disabled = true;

  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log('Anonymous user signed-in.', user);
      document.getElementById('file').disabled = false;
    } else {
      console.log('There was no anonymous session. Creating a new anonymous user.');
      // Sign the user in anonymously since accessing Storage requires the user to be authorized.
      auth.signInAnonymously().catch(function(error) {
        if (error.code === 'auth/operation-not-allowed') {
          window.alert('Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
              'sign-in on your Firebase project.');
        }
      });
    }
  });
}
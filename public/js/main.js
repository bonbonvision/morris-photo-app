// Declare Variables
var storageRef = storageService.ref(),
folderName = document.querySelector('#folderNameInput'),
addImgBtn = document.getElementById("addImgBtn"),
selectedImgFiles = document.getElementById("selectedImgFiles");
// uploadBtn = document.querySelector('#uploadBtn');


// Get Image Folder Name and Barcode Scanner
// var Quagga = window.Quagga;
// var App = {
//     _scanner: null,
//     init: function() {
//         this.attachListeners();
//     },
//     decode: function(file) {
//         Quagga
//             .decoder({readers: ['code_128_reader']})
//             .locator({patchSize: 'medium'})
//             .fromSource(file, {size: 800})
//             .toPromise()
//             .then(function(result) {
//                 folderName.value = result.codeResult.code;
//             })
//             .catch(function() {
//                 folderName.value = "Not Found";
//             })
//             .then(function() {
//                 this.attachListeners();
//             }.bind(this));
//     },
//     attachListeners: function() {
//         var self = this,
//             scannerBtn = document.querySelector('#scannerBtn'),
//             scannerFile = document.querySelector('#scannerFile');
//             scannerBtn.addEventListener("click", function onClick(e) {
//             e.preventDefault();
//             scannerBtn.removeEventListener("click", onClick);
//             document.querySelector('#scannerFile').click();
//         });
//         scannerFile.addEventListener("change", function onChange(e) {
//             e.preventDefault();
//             scannerFile.removeEventListener("change", onChange);
//             if (e.target.files && e.target.files.length) {
//                 self.decode(e.target.files[0]);
//             }
//         });
//     }
// };
// App.init();





// Upload multiple images
//   addImgBtn.addEventListener("click", function (e) {
//   if (selectedImgFiles) {
//     selectedImgFiles.click();
//   }
// }, false);

// $(function () {
//   var imgPreview = function (input, placeToInsertImgPreview) {

//     if (input.files) {
//       var filesAmount = input.files.length;
//       for (i = 0; i < filesAmount; i++) {
//         var reader = new FileReader();
//         reader.onload = function (event) {
//           $($.parseHTML('<img>')).attr('src', event.target.result).appendTo(placeToInsertImgPreview);
//         }
//         reader.readAsDataURL(input.files[i]);
//       }
//     }
//   };

//   $('#selectedImgFiles').on('change', function () {
//     imgPreview(this, 'div.img-gallery');
//   });
// });


// Upload files to Firebase


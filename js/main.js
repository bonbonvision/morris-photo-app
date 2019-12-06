// var loadFile = function (event) {
//   var image = document.getElementById('outputPhoto1')
//   image.src = URL.createObjectURL(event.target.files[0]);
// };

// 2nd Test
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

// 3rd Test

// window.URL = window.URL || window.webkitURL;

// const fileSelect = document.getElementById("fileSelect"),
//   fileElem = document.getElementById("fileElem"),
//   fileList = document.getElementById("fileList");

// fileSelect.addEventListener("click", function (e) {
//   if (fileElem) {
//     fileElem.click();
//   }
//   e.preventDefault();
// }, false);

// function handleFiles(files) {
//   if (!files.length) {
//     fileList.innerHTML = "<p>No files selected!</p>";
//   } else {
//     fileList.innerHTML = "";
//     const list = document.createElement("ul");
//     fileList.appendChild(list);
//     for (let i = 0; i < files.length; i++) {
//       const li = document.createElement("li");
//       list.appendChild(li);

//       const img = document.createElement("img");
//       img.src = window.URL.createObjectURL(files[i]);
//       img.height = 60;
//       // img.onload = function() {
//       //   window.URL.revokeObjectURL(this.src);
//       // }
//       li.appendChild(img);
//       const info = document.createElement("span");
//       info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
//       li.appendChild(info);
//     }
//   }
// }
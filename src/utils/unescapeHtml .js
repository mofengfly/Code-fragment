String.prototype.unescapeHtml = function () {
  var temp = document.createElement("div");
  temp.innerHTML = this;
  var result = "";
  for (var i = 0; i < temp.childNodes.length; i++) {
   result = result + temp.childNodes[i].nodeValue;
  }
  temp.removeChild(temp.firstChild)
  return result;
}

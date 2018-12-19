
// Send to DB from here
$("#add-btn").on("click", function (event) {
  event.preventDefault();
  var newLink = {
    title: $("#title").val().trim(),
    url: $("#url").val().trim(),
    sso: getCookie("sso"),
    metadata: $("#metadata").val().trim(),
    view: checkView(($("#view").is(':checked'))),
    typeid: getType($("#typeid").val().trim(), $("#typex").val())
  };

  // data integrity check //

  if (!/^[0-9A-Za-z\s\-]+$/.test(newLink.title)) {
    return alert("invalid character in Title field.  Upper and lower case letters and numbers please.")
  }
  if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test($("#url").val())) {
    return alert("invalid link in URL field.  Please check and re-enter.")
  }
  if (!/^[0-9A-Za-z\s\-]+$/.test(newLink.metadata)) {
    return alert("invalid character in Description field.  Upper and lower case letters and numbers please.")
  }
  if (!/^[0-9A-Za-z\s\-]+$/.test(newLink.typeid)) {
    return alert("invalid character in Type field.  Upper and lower case letters and numbers please.")
  }


  $.post("/api/new", newLink)
    .then(function (data) {
      console.log(data);
      alert("Adding link...");
    });
  $("#title").val("");
  $("#url").val("");
  $("#metadata").val("");
  $("#typeid").val("");
});



// Need cookie value for sso into DB
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// Need to determine type from dropdown or new
function getType(typeid, typex) {
  if (typeid != '') {
    return typeid
  } else {
    return typex
  }
}

// True or false for checkbox
function checkView(view) {
  if (view == true) {
    return 1
  } else {
    return 0
  }
}

// Check the login status via cookies

var loginShow = "Login";
var url = "http://isscindart01.admin.net.ge.com/gebang/register.php";
var aurl = "http://isscindart01.admin.net.ge.com/gebang/registera.php";
var sso = getCookieValue("sso");
var name = decodeURI(getCookieValue("name"));
var target = "_self";

if (sso != "") {
  var loginName = name;
  loginShow = "Logout";
  url = "./logout.html";
  aurl = "./add.html";
  target = "_self";
  $("#login-name").html(loginName);
}

var loginResults = $("<a>");
loginResults.html(loginShow);
loginResults.attr("href", url).attr('target', target);;
$("#login-section").html(loginResults);
$("#login-name").html(loginName);

var addResults = '<a class="btn btn-primary btn-md" href= ' + aurl + ' role="button" id="add-btn"><span class="fa fa-fire"></span> Add Link</a>';
$("#add-section").html(addResults);

function getCookieValue(a) {
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}
var numbering = {};
numbering.pagePrefix = "page_";
numbering.pageSuffix = ".jpg";
numbering.incrementAndPad = function(number, increment) {
  var page = (parseInt(number, 10) + increment).toString();
  return page.padStart(3, "0");
}
numbering.copyToClipboard = function(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
numbering.currentPageNumber = function() {
  var page = $("#page").attr("src").replace(numbering.pagePrefix, "").replace(numbering.pageSuffix, "");
  return parseInt(page, 10);
}
numbering.convertTagsToCommands = function() {
  $(".tag").each(function() {
    var page = $(this).attr("page");
    var xPos = $(this).attr("xPos");
    var yPos = $(this).attr("yPos");
    var label = $(this).attr("label");
    var fill = $(this).attr("fill");
    var text =
      `convert ${page} -background none -fill ${fill} -stroke 2 -pointsize 150 -font Times-Bold  \\( label:${label} -set page +${xPos}+${yPos} \\) +write info: -layers merge a_${page}; mv a_${page} ${page};`
    $("#box").append('<div class="tagref">' + text + '</div>');
    $(this).remove();
  });
}
numbering.turnPage = function() {
  $("#label").text($("#page").attr("src"));
  numbering.convertTagsToCommands();
}
numbering.imageClickHandler = function(e) { //Offset mouse Position
  var index = $("#index:text").val() * 1;
  var suffix = $("#suffix:text").val();
  var image = $(this);
  var imageScaleRatio = image.height() / image[0].naturalHeight;
  var xMouse = e.pageX;
  var yMouse = e.pageY;
  var xPos = Math.floor((xMouse - image.offset().left) / imageScaleRatio);
  var yPos = Math.floor((yMouse - image.offset().top) / imageScaleRatio);
  var currentPage = $("#page").attr("src");
  var label = numbering.incrementAndPad(index, 0) + suffix;

  $("#index:text").val(index + 1)
  var tag = $("<div class='tag'></div>");
  tag.css({
    top: yMouse,
    left: xMouse
  });
  tag.css('font-size', 150 * imageScaleRatio + "px");
  tag.attr("xPos", xPos);
  tag.attr("yPos", yPos);
  tag.attr("page", currentPage);
  tag.attr("label", label);
  if (e.shiftKey) {
    tag.attr("fill", "black");
    tag.toggleClass('alt-color');
  } else {
    tag.attr("fill", "green1");
    tag.toggleClass('main-color');
  }
  tag.text(label)
  $("body").append(tag);
}
numbering.goToNext = function() {
  var num = numbering.currentPageNumber();
  $("#page").attr("src", numbering.pagePrefix + numbering.incrementAndPad(num, 1) + numbering.pageSuffix);
  numbering.turnPage();
};
numbering.goToPrev = function() {
  var num = numbering.currentPageNumber();
  if (num * 1 > 0) {
    $("#page").attr("src", numbering.pagePrefix + numbering.incrementAndPad(num, -1) + numbering.pageSuffix);
    numbering.turnPage();
  }
};
numbering.goToNext10 = function() {
  var num = numbering.currentPageNumber();
  $("#page").attr("src", numbering.pagePrefix + numbering.incrementAndPad(num, 10) + numbering.pageSuffix);
  numbering.turnPage();
};
numbering.goToPrev10 = function() {
  var num = numbering.currentPageNumber();
  if (num * 1 > 10) {
    $("#page").attr("src", numbering.pagePrefix + numbering.incrementAndPad(num, -10) + numbering.pageSuffix);
    numbering.turnPage();
  }
};
numbering.clear = function() {
  numbering.copyToClipboard('#box')
  $('#box').empty();
};
numbering.convert = function() {
  numbering.convertTagsToCommands();
  numbering.copyToClipboard('#box')
};
numbering.navigationHandler = function(e) {
  // [
  if (e.which === 91) {
    numbering.goToPrev10();
  }
  // w W
  if (e.which === 119 || e.which === 87) {
    numbering.goToPrev();
  }
  // e E
  if (e.which === 101 || e.which === 69) {
    numbering.goToNext();
  }
  // ]
  if (e.which === 93) {
    numbering.goToNext10();
  }
  // return
  if (e.which === 13) {
    numbering.convert();
  }
  // c
  if (e.which === 99) {
    numbering.clear();
  }
};
jQuery(document).ready(function() {
  $(document).on('keypress', numbering.navigationHandler);
  $('#page').click(numbering.imageClickHandler);
  $("#copy-button").click(function(e) {
    numbering.copyToClipboard('#box')
  });
  $("#clear-button").click(numbering.clear);
  $("#convert-button").click(numbering.convert);
  $("#prev10-button").click(numbering.goToPrev10);
  $("#prev-button").click(numbering.goToPrev);
  $("#next-button").click(numbering.goToNext);
  $("#next10-button").click(numbering.goToNext10);
});

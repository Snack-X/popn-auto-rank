var popn_data, cv, ctx, id;
var medal_img;

$(function() {
  $(".step1").show();
  $(".b-load").click(goStep2);
});

function goStep2() {
  id = $(".i-id").val().trim();
  if(id === "") return;
  $.getJSON("http://misc.korsnack.kr/popn/proxy.php?id=" + id, onGetJSON);
}

function onGetJSON(r) {
  if(r.result === false) {
    alert("그런 사람은 없습니다.");
    return;
  }

  if(r.username !== id) {
    alert("아이디는 대소문자를 구별합니다. 다음부터는 " + r.username + " 을(를) 입력해주세요.");
  }

  popn_data = r;

  $(".step1").hide();

  $(".step2").show();
  $(".b-draw").click(goStep3);
}

function goStep3() {
  var level = parseInt($("input[name=level]:checked").val(), 10);
  if(level < 45 || level > 49) {
    alert("그런거 없다.");
    return;
  }

  $(".step2").hide();

  $(".step3").show();

  cv = $("canvas").get(0);
  ctx = cv.getContext("2d");

  loadImage(level);
}

function loadImage(level) {
  chart = new Image();
  medal_img = new Image();

  chart.onload = function() {
    medal_img.src = "img/medal.png";
  };
  medal_img.onload = function() {
    drawChart(level);
  };

  chart.src = "img/" + level + ".jpg";
}

function drawChart(level) {
  $(cv).width(chart.width);
  $(cv).height(chart.height);
  cv.width = chart.width;
  cv.height = chart.height;

  ctx.drawImage(chart, 0, 0);

  // 클리어 여부 체크
  for(var i in popn_data.data[level]) {
    var song = popn_data.data[level][i];

    if(song.meda == "l") continue;

    var id = crc32(song.name + song.diff);

    if(typeof song_position[level][id] === "undefined") {
      console.info("Unidentified song found: " + song.name + " => " + id);
      continue;
    }

    drawMedal(song.meda, level, song_position[level][id][0], song_position[level][id][1]);
  }
}

function drawMedal(medal, level, x, y) {
  var sx = (medal.charCodeAt(0) - 97) * 26; // a~k
  var sy = 0;
  var dx, dy;

  if(level === 45 || level === 46 || level === 47 || level === 48) {
    dx = position[level].x.start + (x * (position[level].x.size + position[level].x.gap));
    dx -= 13;
    dy = position[level].y.pos[y];
    dy -= 13;

  }
  else if(level === 49) {
    dx = x - 13;
    dy = y - 13;
  }

  ctx.drawImage(medal_img, sx, sy, 26, 26, dx, dy, 26, 26);
}

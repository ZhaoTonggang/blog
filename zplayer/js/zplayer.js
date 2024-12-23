function zplayer(option) {
	var p = option;
	var defaultOption = {
		autoPlay: !1,
		lrcStart: !1,
		showLrc: !1,
		fixed: !1,
		listFolded: !1,
		listMaxHeight: 240
	};
	for (const t in defaultOption) {
		defaultOption.hasOwnProperty(t) && !p.hasOwnProperty(t) && (p[t] = defaultOption[t])
	}
	var y, cur_m = 0,
		random_cur_m = 0,
		m = "",
		musicListHtml = "",
		ht = "",
		playType = 0,
		curPlayType = 0,
		playTypes = ["z-icon-retweet", "z-icon-retweet-one", "z-icon-random", "z-icon-reorder-list"],
		playList = [],
		playListRandom = [];
	for (i = 0; i < p.musics.length; i++) {
		playList.push(i);
		i == 0 ? musicListHtml += '<li class="playing" index="' + i + '">' + p.musics[i].title + "&nbsp; - &nbsp;" + p
			.musics[i].author + "</li>" : musicListHtml += '<li index="' + i + '">' + p.musics[i].title +
			"&nbsp; - &nbsp;" + p.musics[i].author + "</li>"
	}
	ht += '<div class="zplayer">' +
		'	<div class="zplayer-content">' +
		'		<div class="zplayer-pic">' +
		'			<img src="' + p.musics[0].pic + '">' +
		'		</div>' +
		'		<div class="zplayer-info">' +
		'			<div class="zplayer-music">' +
		'			    <div class="zplayer-music-text">' +
		'				  <span class="zplayer-title">' + p.musics[0].title + '</span>' +
		'				  <span class="zplayer-author"> - ' + p.musics[0].author + '</span>' +
		'			    </div>' +
		'					<div class="zplayer-menu-bars">' +
		'						<i class="z-icon z-icon-backward"></i>' +
		'						<i class="z-icon z-icon-play"></i>' +
		'						<i class="z-icon z-icon-pause display-none"></i>' +
		'						<i class="z-icon z-icon-forward"></i>' +
		'					</div>' +
		'			</div>';
	if (!p.fixed) {
		ht += p.showLrc ? '<div class="zlrc">' : '<div class="zlrc" style="display:none">';
		ht += '	<div class="zplayer-lrc">' +
			'		<div class="zplayer-lrc-contents" style="transform: translateY(0);">' +
			'		</div>' +
			'	</div>' +
			'</div>';
	}
	ht += '			<div class="zplayer-controller">' +
		'				<div class="zplayer-bar-wrap">' +
		'					<div class="zplayer-bar">' +
		'						<div class="zplayer-loaded" style="width: 0"></div>' +
		'						<div class="zplayer-played" style="width: 0">' +
		'							<span class="zplayer-thumb"></span>' +
		'						</div>' +
		'					</div>' +
		'				</div>' +
		'				<div class="zplayer-time">' +
		'					<span class="zplayer-ptime">00:00</span>/<span class="zplayer-dtime">00:00</span>' +
		'					<div class="zplayer-menu-volume">';
	var volumeCoocie = getCookie("zplayer-volume");
	var volInit = volumeCoocie == "" ? "100%" : volumeCoocie * 100 + "%";
	var volIcon = volumeCoocie == "" ? "z-icon-volume-up" : (volumeCoocie >= 0.8 ? "z-icon-volume-up" : (volumeCoocie ==
		0 ? "z-icon-volume-off" : "z-icon-volume-down"))
	ht += '<i class="volume-icon z-icon ' + volIcon +
		'"></i><div class="zplayer-volume-bar"><div class="zplayer-volume-played" style="width:' + volInit +
		'"><span class="zplayer-volume-thumb"></span></div></div>';
	ht += p.lrcStart ? (p.showLrc ? '<i class="lrc-icon z-icon z-icon-list-alt"></i>' :
		'<i class="lrc-icon z-icon z-icon-list-alt lrc-hide"></i>') : '';
	ht += '<i class="player-type-icon z-icon z-icon-retweet"></i>' +
		'				<i class="zplayer-list-btn z-icon z-icon-reorder">' +
		'				</i>' +
		'					</div>' +
		'				</div>' +
		'			</div>' +
		'		</div>' +
		'	</div>';
	ht += p.fixed ?
		'<div class="ss-btn"><i class="z-icon z-icon-chevron-left display-none"></i><i class="z-icon z-icon-chevron-right"></i></div>' :
		'';
	ht += p.listFolded ? '<ol style="max-height:0px;" class="zplayer-list">' + musicListHtml + '</ol>' :
		'<ol style="max-height:' + p.listMaxHeight + 'px;" class="zplayer-list">' + musicListHtml + '</ol>';
	ht += '</div>';
	if (p.fixed) {
		ht += p.showLrc ? '<div class="zlrc">' : '<div class="zlrc" style="display:none">';
		ht += '	<div class="zplayer-lrc">' +
			'		<div class="zplayer-lrc-contents" style="transform: translateY(0);">' +
			'		</div>' +
			'	</div>' +
			'</div>';
	}
	p.element.innerHTML = ht;
	if (p.fixed) {
		p.element.classList.add("zplayer-fixed");
	}
	if (p.lrcStart) {
		p.lrc = l(p.musics[0].lrc);
		if (p.showLrc) {
			p.element.classList.add("zplayer-withlrc");
		}
		p.lrcContents = p.element.getElementsByClassName("zplayer-lrc-contents")[0];
		for (d = 0; d < p.lrc.length; d++) {
			m += "<p>" + p.lrc[d][1] + "</p>";
		}
		p.lrcContents.innerHTML = m;
		p.lrcIndex = 0;
		p.lrcContents.getElementsByTagName("p")[0].classList.add("zplayer-lrc-current");
	}
	p.audio = document.createElement("audio");
	p.audio.src = p.musics[0].url;
	p.audio.loop = 0;
	p.audio.preload = "metadata";
	p.audio.volume = volumeCoocie == "" ? 0.8 : volumeCoocie;
	p.audio.addEventListener("durationchange", function () {
			1 !== p.audio.duration && (p.element.getElementsByClassName("zplayer-dtime")[0].innerHTML =
				secondToTime(p.audio.duration))
		}),
		p.audio.addEventListener("loadedmetadata", function () {
			p.loadedTime = setInterval(function () {
				var e = p.audio.buffered.end(p.audio.buffered.length - 1) / p.audio.duration;
				updateBar("loaded", e, "width");
				1 === e && clearInterval(p.loadedTime);
			}, 500)
		})
	p.audio.addEventListener("ended", function () {
		if (playType == 0) {
			cur_m = ((cur_m + 1) == p.musics.length) ? 0 : cur_m + 1;
			playSwitch(cur_m);
		} else if (playType == 1) {
			playSwitch(cur_m);
		} else if (playType == 2) {
			if (curPlayType != playType) {
				for (var i = 0; i < playListRandom.length; i++) {
					if (cur_m == playListRandom[i]) {
						random_cur_m = i < (playListRandom.length - 1) ? (i + 1) : 0;
						cur_m = playListRandom[random_cur_m];
						break;
					}
				}
			} else {
				random_cur_m = ((random_cur_m + 1) == p.musics.length) ? 0 : random_cur_m + 1;
				cur_m = playListRandom[random_cur_m];
			}
			playSwitch(cur_m);
		} else if (playType == 3) {
			if (cur_m != (p.musics.length - 1)) {
				cur_m = ((cur_m + 1) == p.musics.length) ? 0 : cur_m + 1;
				playSwitch(cur_m);
			} else {
				p.PauseButton.classList.add("display-none");
				p.PlayButton.classList.remove("display-none");
				p.audio.pause();
				clearInterval(p.playedTime)
			}
		}
		curPlayType = playType;
	})
	p.audio.addEventListener("error", function () {
		p.element.getElementsByClassName("zplayer-author")[0].innerHTML = " - 歌曲加载失败 - ";
		p.element.getElementsByClassName("zplayer-dtime")[0].innerHTML = "00:00";
		p.PauseButton.classList.add("display-none");
		p.PlayButton.classList.remove("display-none");
		if (p.musics.length > 1) {
			setTimeout(function () {
				pn(2);
			}, 1000)
		}
	})
	p.PlayButton = p.element.getElementsByClassName("z-icon-play")[0];
	p.PauseButton = p.element.getElementsByClassName("z-icon-pause")[0];
	p.volumeIcon = p.element.getElementsByClassName("volume-icon")[0];
	p.lrcIcon = p.element.getElementsByClassName("lrc-icon")[0];
	p.playTypeIcon = p.element.getElementsByClassName("player-type-icon")[0];
	p.hidePlayerButton = p.element.getElementsByClassName("z-icon-chevron-left")[0];
	p.showPlayerButton = p.element.getElementsByClassName("z-icon-chevron-right")[0];
	p.musicList = p.element.getElementsByClassName("zplayer-list")[0].getElementsByTagName("li");
	p.playedBar = p.element.getElementsByClassName("zplayer-played")[0];
	p.loadedBar = p.element.getElementsByClassName("zplayer-loaded")[0];
	p.thumb = p.element.getElementsByClassName("zplayer-thumb")[0];
	p.bar = p.element.getElementsByClassName("zplayer-bar")[0];
	p.volumeThumb = p.element.getElementsByClassName("zplayer-volume-thumb")[0];
	p.volumeBar = p.element.getElementsByClassName("zplayer-volume-bar")[0];
	p.volumePlayedBar = p.element.getElementsByClassName("zplayer-volume-played")[0];
	p.listButton = p.element.getElementsByClassName("zplayer-list-btn")[0];
	p.playerList = p.element.getElementsByClassName("zplayer-list")[0];
	p.bw = p.element.getElementsByClassName("zplayer-menu-bars")[0].getElementsByClassName("z-icon-backward")[0];
	p.fw = p.element.getElementsByClassName("zplayer-menu-bars")[0].getElementsByClassName("z-icon-forward")[0];
	for (var i = 0; i < p.musicList.length; i++) {
		p.musicList[i].addEventListener("click", function () {
			clickLi(this);
		})
	}
	p.PlayButton.addEventListener("click", function () {
		play();
	})
	p.PauseButton.addEventListener("click", function () {
		pause();
	})
	p.volumeIcon.addEventListener("click", function () {
		p.audio.muted ? (p.audio.muted = !1,
			p.volumeIcon.className = 0.8 <= p.audio.volume ? "volume-icon z-icon z-icon-volume-up" :
			"volume-icon z-icon z-icon-volume-down",
			updateBar("volumePlayed", p.audio.volume, "width")) : (p.audio.muted = !0,
			p.volumeIcon.className = "volume-icon z-icon z-icon-volume-off",
			updateBar("volumePlayed", 0, "width"))
	})
	if (p.lrcStart) {
		p.lrcIcon.addEventListener("click", function () {
			this.classList.contains("lrc-hide") ? (p.element.classList.add("zplayer-withlrc"), this.classList
					.remove("lrc-hide"), p.element.getElementsByClassName("zlrc")[0].style.display = "block") :
				(p.element.classList.remove("zplayer-withlrc"), this.classList.add("lrc-hide"), p.element
					.getElementsByClassName("zlrc")[0].style.display = "none");
		})
	}
	if (p.fixed) {
		p.hidePlayerButton.addEventListener("click", function () {
			p.element.getElementsByClassName("zplayer")[0].style.transform = "translateX(-270px)";
			p.hidePlayerButton.classList.add("display-none");
			p.showPlayerButton.classList.remove("display-none")
		})
		p.showPlayerButton.addEventListener("click", function () {
			p.element.getElementsByClassName("zplayer")[0].style.transform = "translateX(0)";
			p.showPlayerButton.classList.add("display-none");
			p.hidePlayerButton.classList.remove("display-none")
		})
	}
	p.playTypeIcon.addEventListener("click", function () {
		p.playTypeIcon.classList.remove(playTypes[playType]);
		playType = (playType + 1) % 4;
		p.playTypeIcon.classList.add(playTypes[playType]);
		if (playType == 2) {
			playListRandom = shuffle(playList);
		}
	})
	p.bar.addEventListener("click", function (e) {
		var a = e || window.event;
		y = p.bar.clientWidth;
		var i = (a.clientX - t(p.bar)) / y;
		updateBar("played", i, "width");
		p.element.getElementsByClassName("zplayer-ptime")[0].innerHTML = secondToTime(i * p.audio.duration);
		p.audio.currentTime = parseFloat(p.playedBar.style.width) / 100 * p.audio.duration;
		play();
	})
	p.thumb.addEventListener("mousedown", function () {
		y = p.bar.clientWidth;
		clearInterval(p.playedTime);
		document.addEventListener("mousemove", e);
		document.addEventListener("mouseup", a)
	})
	p.thumb.addEventListener("touchstart", function () {
		event.preventDefault();
		y = p.bar.clientWidth;
		clearInterval(p.playedTime);
		document.addEventListener("touchmove", te);
		document.addEventListener("touchend", ta)
	})
	p.volumeThumb.addEventListener("mousedown", function () {
		y = p.volumeBar.clientWidth;
		document.addEventListener("mousemove", voe);
		document.addEventListener("mouseup", voa)
	})
	p.volumeBar.addEventListener("click", function (e) {
		var a = e || window.event;
		y = p.volumeBar.clientWidth;
		i = (a.clientX - t(p.volumeBar)) / y;
		p.volumeIcon.className = 0.8 <= i ? "volume-icon z-icon z-icon-volume-up" : (i == 0 ?
			"volume-icon z-icon z-icon-volume-off" : "volume-icon z-icon z-icon-volume-down")
		p.audio.volume = i;
		updateBar("volumePlayed", i, "width");
	})
	p.listButton.addEventListener("click", function (e) {
		(p.playerList.style.maxHeight == "" || p.playerList.style.maxHeight == "0px") ? p.playerList.style
			.maxHeight = p.listMaxHeight + "px": p.playerList.style.maxHeight = "0px"
	})
	p.bw.addEventListener("click", function () {
		pn(1);
	})
	p.fw.addEventListener("click", function () {
		pn(2);
	})
	p.autoPlay && play();

	function clickLi(e) {
		cur_m = parseInt(e.getAttribute("index"));
		if (playType == 2) {
			for (var i = 0; i < playListRandom.length; i++) {
				if (cur_m == playListRandom[i]) {
					random_cur_m = i;
				}
			}
		}
		playSwitch(cur_m);
		curPlayType = playType;
	}

	function e(e) {
		var a = e || window.event,
			i = (a.clientX - t(p.bar)) / y;
		mvb(i)
	}

	function a() {
		document.removeEventListener("mouseup", a);
		document.removeEventListener("mousemove", e);
		p.audio.currentTime = parseFloat(p.playedBar.style.width) / 100 * p.audio.duration;
	}

	function te(e) {
		var a = e || window.event,
			i = (a.touches[0].clientX - t(p.bar)) / y;
		mvb(i);
	}

	function mvb(i) {
		i = i > 0 ? i : 0;
		i = 1 > i ? i : 1;
		updateBar("played", i, "width");
		p.lrcStart && updateLrc(parseFloat(p.playedBar.style.width) / 100 * p.audio.duration);
		p.element.getElementsByClassName("zplayer-ptime")[0].innerHTML = secondToTime(i * p.audio.duration)
	}

	function ta() {
		document.removeEventListener("touchend", ta);
		document.removeEventListener("touchmove", te);
		p.audio.currentTime = parseFloat(p.playedBar.style.width) / 100 * p.audio.duration;
	}

	function t(e) {
		for (var a, t = e.offsetLeft, i = e.offsetParent; null !== i;) {
			t += i.offsetLeft,
				i = i.offsetParent
		}
		return a = document.body.scrollLeft + document.documentElement.scrollLeft,
			t - a
	}

	function i(e) {
		for (var a, t = e.offsetTop, i = e.offsetParent; null !== i;) {
			t += i.offsetTop,
				i = i.offsetParent
		}
		return a = document.body.scrollTop + document.documentElement.scrollTop,
			t - a
	}

	function voe(e) {
		var a = e || window.event,
			i = (a.clientX - t(p.volumeBar)) / y;
		i = i > 0 ? i : 0;
		i = 1 > i ? i : 1;
		if (p.audio.muted) {
			p.audio.muted = !1;
		}
		p.audio.volume = i;
		updateBar("volumePlayed", i, "width");
		if (i >= 0.8) {
			p.volumeIcon.classList.remove("z-icon-volume-down", "z-icon-volume-off");
			p.volumeIcon.classList.add("z-icon-volume-up")
		} else {
			if (i == 0) {
				p.volumeIcon.classList.remove("z-icon-volume-down", "z-icon-volume-up");
				p.volumeIcon.classList.add("z-icon-volume-off")
			} else {
				p.volumeIcon.classList.remove("z-icon-volume-off", "z-icon-volume-up");
				p.volumeIcon.classList.add("z-icon-volume-down")
			}
		}
		setCookie("zplayer-volume", i, 365);
	}

	function voa() {
		document.removeEventListener("mousemove", voe);
	}

	function l(e) {
		if (e) {
			for (var t = (e = e.replace(/([^\]^\n])\[/g, function (e, t) {
					return t + "\n["
				})).split("\n"), n = [], i = t.length, a = 0; a < i; a++) {
				var r = t[a].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g),
					o = t[a].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, "").replace(
						/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, "").replace(/^\s+|\s+$/g, "");
				if (r)
					for (var s = r.length, l = 0; l < s; l++) {
						var u = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(r[l]),
							c = 60 * u[1] + parseInt(u[2]) + (u[4] ? parseInt(u[4]) / (2 === (u[4] + "").length ? 100 :
								1e3) : 0);
						n.push([c, o])
					}
			}
			return (n = n.filter(function (e) {
					return e[1]
				})).sort(function (e, t) {
					return e[0] - t[0]
				}),
				n
		}
		return [
			[0, "暂无歌词，请您欣赏"]
		]
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	function shuffle(arr) {
		var _arr = arr.slice()
		for (var i = 0; i < _arr.length; i++) {
			var j = getRandomInt(0, i)
			var t = _arr[i]
			_arr[i] = _arr[j]
			_arr[j] = t
		}
		return _arr
	}

	function playSwitch(i) {
		p.PlayButton.classList.add("display-none");
		p.PauseButton.classList.remove("display-none");
		p.element.getElementsByClassName("zplayer-pic")[0].getElementsByTagName("img")[0].src = p.musics[i].pic;
		p.element.getElementsByClassName("zplayer-title")[0].innerHTML = p.musics[i].title;
		p.element.getElementsByClassName("zplayer-author")[0].innerHTML = " - " + p.musics[i].author;
		var playingLi = p.element.getElementsByClassName("zplayer-list")[0].getElementsByClassName("playing");
		if (playingLi.length > 0) {
			playingLi[0].classList.remove("playing");
		}
		p.element.getElementsByClassName("zplayer-list")[0].getElementsByTagName("li")[i].classList.add("playing");
		if (p.lrcStart) {
			p.lrcContents.innerHTML = "";
			p.lrcContents.style.transform = "translateY(0px)";
			m = "";
			p.lrc = l(p.musics[i].lrc);
			for (d = 0; d < p.lrc.length; d++) {
				m += "<p>" + p.lrc[d][1] + "</p>";
				p.lrcContents.innerHTML = m;
				p.lrcIndex = 0;
				p.lrcContents.getElementsByTagName("p")[0].classList.add("zplayer-lrc-current");
			}
		}
		clearInterval(p.loadedTime);
		clearInterval(p.playedTime);
		p.audio.src = p.musics[i].url;
		var t = p.audio.play();
		t && t.catch(function (t) {
			console.warn(t),
				p.PauseButton.classList.add("display-none");
			p.PlayButton.classList.remove("display-none");;
		})
		p.playedTime = setInterval(function () {
			updateBar("played", p.audio.currentTime / p.audio.duration, "width"),
				p.lrcStart && updateLrc(),
				p.element.getElementsByClassName("zplayer-ptime")[0].innerHTML = secondToTime(p.audio
					.currentTime)
		}, 100)
	}

	function pn(e) {
		if (playType == 2) {
			if (curPlayType != 2) {
				for (var i = 0; i < playListRandom.length; i++) {
					if (cur_m == playListRandom[i]) {
						random_cur_m = (i < playListRandom.length - 1) ? (i + 1) : 0;
						cur_m = playListRandom[random_cur_m];
						break;
					}
				}
			} else {
				random_cur_m = (e == 1 ? ((random_cur_m == 0) ? p.musics.length - 1 : random_cur_m - 1) : ((
					random_cur_m < (p.musics.length - 1)) ? random_cur_m + 1 : 0));
				cur_m = playListRandom[random_cur_m];
			}
		} else {
			cur_m = (e == 1 ? ((cur_m == 0) ? p.musics.length - 1 : cur_m - 1) : ((cur_m < (p.musics.length - 1)) ?
				cur_m + 1 : 0));
		}
		curPlayType = playType;
		playSwitch(cur_m)
	}

	function updateBar(e, a, t) {
		a = a > 0 ? a : 0,
			a = 1 > a ? a : 1,
			p[e + "Bar"].style[t] = 100 * a + "%"
	}

	function secondToTime(e) {
		var a = function (e) {
				return 10 > e ? "0" + e : "" + e
			},
			t = parseInt(e / 60),
			i = parseInt(e - 60 * t);
		return a(t) + ":" + a(i)
	}

	function updateLrc(e) {
		if (e || (e = p.audio.currentTime),
			e < p.lrc[p.lrcIndex][0] || (p.lrcIndex == p.lrc.length - 1 ? false : e >= p.lrc[p.lrcIndex + 1][0]))
			for (var a = 0; a < p.lrc.length; a++)
				e >= p.lrc[a][0] && (!p.lrc[a + 1] || e < p.lrc[a + 1][0]) && (p.lrcIndex = a,
					p.lrcContents.style.transform = "translateY(" + (20 * -p.lrcIndex + 20) + "px)",
					p.lrcContents.getElementsByClassName("zplayer-lrc-current")[0].classList.remove(
						"zplayer-lrc-current"),
					p.lrcContents.getElementsByTagName("p")[a].classList.add("zplayer-lrc-current"))
	}

	function play() {
		p.PlayButton.classList.add("display-none");
		p.PauseButton.classList.remove("display-none");
		var t = p.audio.play();
		t && t.catch(function (t) {
			console.warn(t),
				p.PauseButton.classList.add("display-none");
			p.PlayButton.classList.remove("display-none");;
		})
		clearInterval(p.playedTime);
		p.playedTime = setInterval(function () {
			updateBar("played", p.audio.currentTime / p.audio.duration, "width");
			p.lrcStart && updateLrc(),
				p.element.getElementsByClassName("zplayer-ptime")[0].innerHTML = secondToTime(p.audio
					.currentTime)
		}, 100)
	}

	function pause() {
		p.PauseButton.classList.add("display-none");
		p.PlayButton.classList.remove("display-none");
		p.audio.pause();
		clearInterval(p.playedTime)
	}

	function add(music) {
		playList.push(p.musics.length);
		p.musics.push(music);
		var musicDom = document.createElement("li");
		musicDom.setAttribute('index', p.musics.length - 1);
		musicDom.innerHTML = music.title + '&nbsp; - &nbsp;' + music.author;
		musicDom.addEventListener("click", function () {
			clickLi(musicDom);
		})
		p.playerList.appendChild(musicDom);
		if (playType == 2) {
			playListRandom = shuffle(playList);
			curPlayType = 1;
		}
	}

	function remove(i) {
		if (i > 0 && playList.length > i) {
			playList.splice(playList.length - 1, 1);
			p.musics.splice(i, 1);
			p.playerList.removeChild(p.playerList.getElementsByTagName("li")[i]);
			if (playType == 2) {
				for (random_i = 0; random_i < playListRandom.length; random_i++) {
					if (playListRandom[random_i] == i) {
						playListRandom.splice(random_i, 1);
					} else if (playListRandom[random_i] > i) {
						playListRandom[random_i]--;
					};
				}
			}
			if (cur_m === i) {
				pn(2);
			}
		}
	}
	return {
		"play": play,
		"pause": pause,
		"add": add,
		"remove": remove
	};
}
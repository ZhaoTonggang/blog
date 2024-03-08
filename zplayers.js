let zp3 = new zplayer({
	element: document.getElementById("player3"),
// 	autoPlay: 0,
	/*是否开启自动播放,默认false*/
	lrcStart: 1,
	/*是否开启歌词功能 ，默认false（为true时musics集合中需要传入lrc字段。）*/
// 	showLrc: 1,
	/*开启歌词功能后是否展示歌词内容 ，默认false*/
	fixed: 1,
	/*是否固定在底部，默认false*/
	listFolded: 1,
	/*列表是否折叠，默认false*/
	listMaxHeight: 240,
	/*列表最大高度，默认240*/
	musics: [{
		title: "这世界那么多人",
		author: "莫文蔚",
		url: "https://music.163.com/song/media/outer/url?id=1842025914.mp3",
		pic: "https://p1.music.126.net/LOTxqRjFm03VJEOHJbUqMw==/109951165944804127.jpg",
		lrc: "[00:00.000] 作词 : 王海涛[00:01.000] 作曲 : Akiyama Sayuri[00:02.000] 编曲 : 彭飞[00:03.000] 制作人 : 荒井十一/彭飞[00:18.754]这世界有那么多人[00:25.191]人群里 敞着一扇门[00:31.197]我迷朦的眼睛里长存[00:38.007]初见你  蓝色清晨[00:45.179]这世界有那么多人[00:50.980]多幸运 我有个我们[00:57.976]这悠长命运中的晨昏[01:04.591]常让我 望远方出神[01:12.251]灰树叶飘转在池塘[01:18.179]看飞机轰的一声去远乡[01:24.683]光阴的长廊 脚步声叫嚷[01:31.230]灯一亮 无人的空荡[01:39.027]晚风中闪过 几帧从前啊[01:45.061]飞驰中旋转 已不见了吗[01:52.099]远光中走来 你一身晴朗[01:59.084]身旁那么多人 可世界不声 不响[02:11.842]这世界有那么多人[02:18.705]多幸运 我有个我们[02:25.067]这悠长命运中的晨昏[02:31.287]常让我 望远方出神[02:38.903]灰树叶飘转在池塘[02:45.324]看飞机轰的一声去远乡[02:51.286]光阴的长廊 脚步声叫嚷[02:57.931]灯一亮 无人的空荡[03:05.408]晚风中闪过 几帧从前啊[03:12.195]飞驰中旋转 已不见了吗[03:18.442]远光中走来 你一身晴朗[03:25.538]身旁那么多人 可世界不声 不响[03:35.622]笑声中浮过 几张旧模样[03:41.803]留在梦田里 永远不散场[03:48.489]暖光中醒来 好多话要讲[03:55.747]世界那么多人 可是它不声 不响[04:07.895]这世界有那么个人[04:14.348]活在我 飞扬的青春[04:21.439]在泪水里浸湿过的长吻[04:27.966]常让我 想啊想出神[04:29.956] 弦乐 : 彭飞[04:31.946] 吉他 : 胡洋[04:33.936] 曼陀林 : 彭飞[04:35.926] 鼓 : 荒井十一[04:37.916] 录音室 : Studio 21A[04:39.906] 录音师 : 倪涵文[04:41.896] 混音室 : Studio 21A[04:43.886] 混音师 : 周天澈[04:45.876] 母带工程师 : 周天澈"
	},{
		title:"理想三旬",
		author:"陈泓宇",
		url:"https://music.163.com/song/media/outer/url?id=31445772.mp3",
		pic:"https://p4.music.126.net/cqTTEPAaxXG3cOwaE4E_-g==/109951163104103366.jpg",
		lrc:"[00:00.000] 作词 : 唐映枫[00:00.113] 作曲 : 陈鸿宇[00:00.226] 编曲 : 陈鸿宇/马雨阳[00:00.340]混音：马雨阳[00:01.340]雨后有车驶来[00:03.510]驶过暮色苍白[00:06.090]旧铁皮往南开 恋人已不在[00:10.890]收听浓烟下的 诗歌电台[00:15.700]不动情的咳嗽 至少看起来[00:20.420]归途也还可爱[00:22.870]琴弦少了姿态[00:25.160]再不见那夜里 听歌的小孩[00:30.170]时光匆匆独白[00:32.380]将颠沛磨成卡带[00:34.810]已枯卷的情怀 踏碎成年代[00:39.970]MUSIC[00:49.170]就老去吧 孤独别醒来[00:54.650]你渴望的离开[00:59.540]只是无处停摆[01:03.700]就歌唱吧 眼睛眯起来[01:09.858]而热泪的崩坏[01:14.218]只是没抵达的存在[01:18.650]MUSIC[01:37.090]青春又醉倒在[01:39.840]籍籍无名的怀[01:42.200]靠嬉笑来虚度 聚散得慷慨[01:46.989]辗转却去不到 对的站台[01:51.890]如果漂泊是成长 必经的路牌[01:56.530]你迷醒岁月中[01:58.840]那贫瘠的未来[02:01.418]像遗憾季节里 未结果的爱[02:05.808]弄脏了每一页诗[02:08.310]吻最疼痛的告白[02:10.859]而风声吹到这 已不需要释怀[02:15.718]就老去吧 孤独别醒来[02:20.598]你渴望的离开[02:26.000]只是无处停摆[02:30.138]就歌唱吧 眼睛眯起来[02:36.000]而热泪的崩坏[02:40.220]只是没抵达的存在[02:47.239]MUSIC[03:06.019]就甜蜜地忍耐[03:08.459]繁星润湿窗台[03:10.878]光影跳动着像在 困倦里说爱[03:15.679]再无谓的感慨[03:18.348]以为明白[03:20.418]梦倒塌的地方 今已爬满青苔"
	}]
});

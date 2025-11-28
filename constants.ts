import { Activity, ActivityCategory, UserRole, User, Review, Reward, Post } from './types';

// ==========================================
// 核心数据区：使用反引号包裹 Excel 数据
// ==========================================
const RAW_EXCEL_DATA = `编号	名称	标题	副标题	描述	类别	封面图	主办方	活动时间	地点	外链	内容编号	创建日期	最近更新	来源
1	秋季排球训练营，堂堂登场！一起在这里成长为真正的排球少年吧！	秋季排球训练营，堂堂登场！一起在这里成长为真正的排球少年吧！	空	课程设置：基础班：​ 每周六下午14:00-16:00。针对零基础或初学者，系统教学垫球、发球、传球等基本功。进阶班：​ 每周日下午14:00-16:00。针对有基础者，强化扣球、拦网、战术配合及比赛意识。	社团，学生社团与文化活动/体育与健康	https://mmbiz.qpic.cn/sz_mmbiz_png/2EETxmfibTUaJO65SaJ4uxSRraqgRQA5pJ82gDs74PWA3X8nOjqJ5ez0GUTPibp0eJ665Y5RMibibxIBxRTeicghZ4w/640?wx_fmt=png&from=appmsg&wxfrom=13&tp=wxpic#imgIndex=0	北大排协	空，周六14：00-16：00/周日14：00-16：00	五四排球场	https://mp.weixin.qq.com/s/_ZAQp4RQ-nJf-EMRvo_zqA	1	2025/11/21	2025/11/21	微信公众号文章	
2	未名杯 | 2025北京大学“未名杯”辩论赛报名启动！	未名杯 | 2025北京大学“未名杯”辩论赛报名启动！	空	2025北京大学“未名杯”辩论赛由校辩论协会主办、益达口香糖赞助，将于9月在燕园校区举办。赛事面向校内在读生、校友及1名外援组成的队伍（4-12人）招募8队，8月20日-24日预报名、25日-26日补录，报名表发至pku_debate@163.com。赛程为9月13日-14日初赛、20日-21日半决赛、26日决赛，单败淘汰制。赛制含立论、质询、辩驳等四大环节，设冠亚季军及最佳辩手奖，获奖队伍/个人将获奖杯、证书及大礼包，详情可咨询赛事公邮。	社团，学生社团与文化活动	空	北京大学学生辩论协会	2025/8/25，20：00-2025/8/26/23：59	线上	https://mp.weixin.qq.com/s/dG57KVfaYP7xXDLGTXLCSg	2	2025/11/21	2025/11/21	微信公众号文章	
3	预告 | 相声专场·不亦说乎	预告 | 相声专场·不亦说乎	空	“不亦说乎·相声专场”将于10月18日19:00在北大理教209举办，由北大与北航学生曲艺社团联合呈现。活动免票入场且同步B站直播，节目涵盖快板《张羽煮海》及《旅行乌龙》《道德法庭》等6个对口相声作品。两校社团分别成立于2004年和2017年，以传承推广传统曲艺为宗旨，本次演出将通过多元曲艺形式活跃校园艺术氛围。	社团，学生社团与文化活动	https://mmbiz.qpic.cn/mmbiz_jpg/rib1P5WP2otCYwSepTRXefVf2qmbVW5HmUUJwjRjGAQlkLG3wiaYygEdYuDVdwgUfNnr7jhyiahtLWOQOnzzgR46w/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0	北京大学学生曲艺协会，北京航空航天大学学生曲艺团	2025/10/18，19：00	理教209	https://mp.weixin.qq.com/s/oZEscK9IWwGtM54os4PrDA	3	2025/11/21	2025/11/21	微信公众号文章	
4	讲座报名 | 植物科绘讲座	讲座报名 | 植物科绘讲座	空	北大生物标本馆与绿色生命协会联合推出植物科绘系列活动，9月26日19:00-20:30举办首场讲座，由余天一与小叶老师主讲，分享植物博物画发展历程并展示原画，限100名额。后续设3次工作坊，10月17日起陆续开展墨线图入门、进阶及水彩画教学，需全程参与。北大师生可于9月25日12:00前用指定邮箱问卷报名，工作坊名额20个，标本馆志愿者与绿协会员优先，报名后需邮件确认。	社团，学生社团与文化活动	空	北大绿协	2025/9/26，19：00-20：30	空	https://mp.weixin.qq.com/s/R9Vjwi2dMQoh7LtY5WlMhQ	4	2025/11/21	2025/11/21	微信公众号文章	
5	科普征稿 | 第二届北京大学“有意思的研究”征稿活动	科普征稿 | 第二届北京大学“有意思的研究”征稿活动	空	为响应北大“科技创新年”号召，北大科协启动第二届“有意思的研究”科普征稿活动，面向在校学生征集北大科研进展或国际前沿科技相关作品。本次新增科普视频赛道，与传统文字赛道并行，鼓励用生动形式让高深科研变得通俗易懂。优秀作品将获奖金、证书及向上级组织举荐的机会，诚邀科研学子分享成果，传播科技魅力，助力科普人才培养与校园科技文化氛围营造。	社团，学生社团与文化活动/学术类活动	https://mmbiz.qpic.cn/sz_mmbiz_png/vsC1BtsRJAibTFuDy3kYiahecqllPYdl1bF55zP0FrMOpX8DgO9coFun0q2ly6U84Z3Ne0g5cPmTFyWr4wCPibj7g/640?wx_fmt=png&wxfrom=13&tp=wxpic#imgIndex=1	北大科协	2025/7/10	线上	https://mp.weixin.qq.com/s/XfEJKNC3CV2co5avc-9nAw	5	2025/11/21	2025/11/21	微信公众号文章	
6	预告｜北京大学手风琴协会十六周年系列活动	预告｜北京大学手风琴协会十六周年系列活动	空	北京大学手风琴协会十六周年音乐会暨许笑男原创作品讲演音乐会，将于6月8日20:00在百周年纪念讲堂李莹厅举行。音乐会涵盖合奏、重奏与独奏，曲目含《白桦林》《一步之遥》等经典及许笑男原创作品，由北大手协成员与中央音乐学院多位获奖青年演奏家联袂呈现，贺庆莲担任艺术指导。现场无门票预约，观众需于当日18:00-18:25到场领票，诚邀音乐爱好者共赴这场跨曲风的听觉盛宴。	社团，学生社团与文化活动	空	北大手风琴协会	2025/06/08，18:00-18:25	北大讲堂李莹厅	https://mp.weixin.qq.com/s/JHLq2q0kdHVejrYV8OmX4Q	6	2025/11/21	2025/11/21	微信公众号文章	
7	招募｜让喵们暑假也有饭吃	招募｜让喵们暑假也有饭吃	空	北大猫协2025年夏喂猫志愿者招募启动！服务时间为6月2日至9月28日，面向全校在校生及教职工开放，非猫协成员也可报名。参与喂猫可计入志愿服务时长，诚邀爱心人士踊跃报名填表，共同守护燕园猫咪的夏日温饱～	社团，学生社团与文化活动/志愿服务与公益	空	北大猫协	2025/6/2-2025/9/28	北大	https://mp.weixin.qq.com/s/P9jTWSMB0thP5ZqFfOEXKQ	7	2025/11/21	2025/11/21	微信公众号文章	
8	急救讲座｜北大羽协CPR&AED急救培训报名	急救讲座｜北大羽协CPR&AED急救培训报名	空	北大羽协联合校红十字会推出免费心肺复苏（CPR+AED）取证培训，旨在普及应急救护知识、提升师生应急响应能力。培训由中国红十字总会训练中心老师授课，采用课堂讲授、操作示范与实操练习相结合的方式，还将讲解运动热身注意事项。活动将于2025年10月19日14:00-17:30在校医院地下一层报告厅举行，参与可获电子证书，且全程不收取任何费用，诚邀北大师生通过问卷报名参与。	社团，学生社团与文化活动/体育与健康	空	北大羽协，北大红十字会	2025/10/19，14：00-17：30	北京大学校医院地下一层报告厅	https://mp.weixin.qq.com/s/ChOC0CKRkQSbpJLQP0gLtw	8	2025/11/21	2025/11/21	微信公众号文章	
9	补充招募 | 亚瑟王仍在抵御他的阴影	补充招募 | 亚瑟王仍在抵御他的阴影	空	亚瑟王仍在抵御他的阴影音乐剧演员招募	社团，学生社团与文化活动	https://mmbiz.qpic.cn/mmbiz_jpg/DRz0U813oibFs9q4kUGraPRw1WYpnkV06TuJCuw9owS8mqKqzicP0V0gPDllCg7R2cVHmEjDVc71L8nNG1SQU1AQ/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0	北大音乐剧社	空	空	https://mp.weixin.qq.com/s/OxLsRXWjToq0ht3YwECCKA	9	2025/11/21	2025/11/21	微信公众号文章	
10	领票通知&节目预告02｜“我与舞” 舞蹈专场	领票通知&节目预告02｜“我与舞” 舞蹈专场	空	北大舞团2024年度专场《我与舞》将于6月7日19:30在百周年纪念讲堂李莹厅上演。专场涵盖《咏春·八卦掌》《女儿花》《碇步桥》等7个节目，融合武术元素、民族舞与现代舞，以“舞与我共生”为核心，展现生命强度与成长感悟。校内师生可于6月6日9:00-20:30凭有效证件，在新太阳活动中心1层易拉宝处领票，每人限领一张，诚邀共赴这场舞蹈盛会。	社团，学生社团与文化活动	https://mmbiz.qpic.cn/sz_mmbiz_png/2hKvXJ5Fvc7nEHvibMbs3vr95QOYkYPTUBGzvib8tHLicibdbL0egyXsWy6pkr7zjG1wPeCLdtnG6SAD0OebOd1neQ/640?wx_fmt=png&from=appmsg&wxfrom=13&tp=wxpic#imgIndex=6	北京大学学生舞蹈团	2024/6/6，9:00-20:30	新太阳活动中心1层北大舞团易拉宝处	https://mp.weixin.qq.com/s/Dg1FjXehjsJqFEDzipAnKw	10	2025/11/21	2025/11/21	微信公众号文章	
11	讲座预告 | 年轻人如何从传统文化中受益	讲座预告 | 年轻人如何从传统文化中受益	空	北京大学学生耕读社主办“年轻人如何从传统文化中受益”主题讲座，将于4月12日19:00-20:30在双创中心讲堂（二教地下）开讲。主讲人南系如（南怀瑾先生曾孙女、南怀瑾文教基金会理事）将围绕传统文化与青年成长展开，解答传统文化生命力、应对焦虑内卷等疑问，分享如何从传统文化中获得内心宁静、养成健康生活方式，助力年轻人轻松学习传统文化、实现自我提升。	社团，学生社团与文化活动/学术类活动	https://mmbiz.qpic.cn/sz_mmbiz_png/vOwiaQ8tDRxhs5NKicmde5yogFG2Wo6uU63licVSU59NSo3xth7iaPYY0slyj7yMT8j80eYB5bb5OSLIMmZTZ9NOlQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1	北京大学学生耕读社	2025/4/12，19：00-20：30	北京大学双创中心讲堂（二教地下）	https://mp.weixin.qq.com/s/nar1e_whVr05wcvCXRyPVg	11	2025/11/21	2025/11/21	微信公众号文章	
12	公告 | 北大山鹰社2026冬训申请正式开始	公告 | 北大山鹰社2026冬训申请正式开始	空	北大山鹰社2026冬训报名启动，参与冬训是参加暑期登山活动的必备条件。冬训分两批：2026年1月12日-16日及2月下旬（二选一），2025年12月1日-21日将开展三周前期训练（含体能、技术及知识讲座）。培训内容涵盖冰雪技术、绳结保护、装备使用等，训练风险可控（冰坡训练限高2米，配备队医及医药）。报名截止2025年11月28日17:00，需提交个人申请书、家长及院系意见书等材料，选拔需满足野外活动参与、训练出勤率等相关标准，详情可查阅BBS。	社团，学生社团与文化活动/体育与健康	空	北大山鹰社	2026/1/12-2026/1/16或2026/2下旬	京郊	https://mp.weixin.qq.com/s/H1uof1-q_CtYacDt3AXycg	12	2025/11/21	2025/11/21	微信公众号文章	
13	北京大学第十九届散打对抗赛等你来！	北京大学第十九届散打对抗赛等你来！	空	北京大学第十九届散打对抗赛将于2025年11月30日下午在第二体育馆二层举办，面向全校健康在读学生及博士后（无省市级以上散打赛事经历）。比赛不限体重，赛前统一秤重分级，采用单败淘汰制（3人组为循环赛），每局1分30秒、三局两胜制，主办方提供护头、护胸等必备护具。报名截止11月21日22时，需线上填写问卷报名，选手须参加11月23日或25日的赛前会议及秤重。赛事设各量级前三名奖牌、证书及奖品，中场平板支撑挑战赛可获文创福利，现场还有抽奖活动，诚邀武术爱好者切磋竞技！	社团，学生社团与文化活动/体育与健康	data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E，https://mmbiz.qpic.cn/mmbiz_png/QqfJnH6SS6NwDiaNzTBVxuBLszwybNW9J3Cd4bIKHcsia3bRuo9QLk3H78BqibAMofuia5r5ORpicRZ7fpWDaOHZb3g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14	pku散打社	2025/11/30	北京大学第二体育馆二层	https://mp.weixin.qq.com/s/fRR8k45O1Kx_aQAoZErr1A	13	2025/11/21	2025/11/21	微信公众号文章	
14	预告 | 沽上漫行寻古韵，津门旧轨赴新程	预告 | 沽上漫行寻古韵，津门旧轨赴新程	空	北大铁协将于11月22日推出“津门旧风”主题天津运转活动，带你穿梭现代交通与历史文脉。活动将乘坐多种交通工具，探访杨柳青古镇（体验年画文化）、意风区（欧式风貌建筑）、静海老站房（德式建筑遗产）等景点，感受京津冀交通便捷与文化交融。活动无额外收费，个人承担旅途费用，报名需于11月16日24:00前填写问卷，成功后将通过邮件确认，诚邀感兴趣的同学共赴这场冬日文化之旅。	社团，学生社团与文化活动	https://mmbiz.qpic.cn/mmbiz_jpg/giadQ8cWlq6W9vmo8IzKeM1icpVJxwibAvIBPD30UIa8QGAGvp1fz7cT2dyyhian6Z5Gt79nW53rWYeKnvozey0NMg/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=7	北大铁协	2025/11/22	天津	https://mp.weixin.qq.com/s/5jnjfuBb77bXoTawz3UBrA	14	2025/11/21	2025/11/21	微信公众号文章	
15	活动报名 | "未名・水木"科转思享会	活动报名 | "未名・水木"科转思享会	空	“未名・水木”科技成果转化思享会将于2025年11月16日14:00-17:00在东升大厦举办（具体地点报名后通知）。活动采用“1+1”深度共创模式，邀请北大、清华及wteam社群的创业者、投资人等，为生物、医疗、AI for Science等领域的科转难题提供解决方案。流程含破冰宣誓、确定主事、深度提问、建议反馈等环节，助力思想碰撞与资源对接，诚邀相关领域创业者、投资人扫码报名参与。	社团，学生社团与文化活动/职业发展类	https://mmecoa.qpic.cn/sz_mmecoa_png/PzjvYSMjUeKOgunkFibweicr0pds4Cvw9ica22QeiaEiaeo0dVIZWS8ibVhG4MrkhQBsficEa2IU342xr8iaicCPRGuJBVw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4	北大创新学社，清华MBA创业俱乐部，wtean	2025/11/16，14: 00– 17: 00 	东升大厦	https://mp.weixin.qq.com/s/DRQD5xsL6QAONvCv8RWjYw	15	2025/11/21	2025/11/21	微信公众号文章	
16	CC·活动｜社庆暨趣味运动会来啦！	CC·活动｜社庆暨趣味运动会来啦！	空	pkucc社庆暨轮滑趣味运动会将于2025年11月9日19:30-22:00在英杰交流中心门前广场举办，轮滑大神与萌新均可参与。活动含自由组队（3-5人/队）、五大趣味游戏竞赛（你画我猜、保龄桩等）、颁奖合影及自由轮滑环节，参与者需全程穿戴轮滑鞋与护具。赛事设一至三等奖，奖品含发光轮、定制飘带等，参与即得活动标，还招募NPC协助组织游戏，诚邀轮滑爱好者共赴盛会！	社团，学生社团与文化活动/体育与健康	https://mmbiz.qpic.cn/mmbiz_jpg/95Q2ovrdgiamUVSoAhAj7U9VFx7AicnH9F8bNSia8YI6yW9zP2FSR7Qw0ibSx5KAof1C5l28U1JWqktIXpV3asibsqQ/640?wx_fmt=jpeg&from=appmsg&wxfrom=13&tp=wxpic&watermark=1#imgIndex=0	pkucc	2025/11/9，19:30-22:00	英杰交流中心门前广场	https://mp.weixin.qq.com/s/q4NM2EsN2MLig2kLx2m97w	16	2025/11/21	2025/11/21	微信公众号文章	
17	【崇礼外滑】11.22-11.23雪如意滑雪活动	【崇礼外滑】11.22-11.23雪如意滑雪活动	空	北大雪协推出11月22日-23日崇礼雪如意滑雪活动，全日制在读大学生可报名，会员价575元、非会员595元（含两住两滑及交通）。雪场设32条雪道及5条高速缆车，适配各水平滑雪者，活动含双板/单板新手教学与进阶指导。11月21日18点起集合出发，23日17点返程，需签署安全承诺书，滑雪必须佩戴头盔。报名截止11月19日12时，需通过雪协微店购买，填写学信网验证码，名额不满30人则活动取消，详情可关注活动群通知。	社团，学生社团与文化活动/体育与健康	https://mmbiz.qpic.cn/mmbiz_png/UEjFrysMWwVvrOufs2icXia3Tm6cRKmPjR3AaY4nehZC08MObZZkwFK3SMdSklpexdARC8MAOdo6bA0HnbkcsicZA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2，https://mmbiz.qpic.cn/mmbiz_png/UEjFrysMWwVvrOufs2icXia3Tm6cRKmPjRZaekPjAhhaoBhZ3pGGXgxsrBsIh5AU9MP0wuBd0mG8ruMv8TjgmC2g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12	pkuski	2025/11/22-2025/11/23	雪如意滑雪小镇	https://mp.weixin.qq.com/s/jO3y4rCRMOA63PBdCtzpTw	17	2025/11/21	2025/11/21	微信公众号文章	
18	下厨房 · 联谊活动｜烹协x元火：明日方舟DIY小蛋糕	下厨房 · 联谊活动｜烹协x元火：明日方舟DIY小蛋糕	空	PKU烹协联合元火动漫社推出“明日方舟”主题DIY蛋糕联谊活动，11月21日在新太阳学生中心348举办，分上午9:30-11:30、下午14:30-16:30两场。活动仅限烹协会员参与，每场各招募24人（两社团各12人），费用19.9元/人。可提前提交定制糯米纸图案打造专属蛋糕，到场参与者均可参与周边抽奖（百分百中奖）。报名采用抽签制，需于11月15日10:00前填写问卷，名额可转出不可退款，成功报名将通过微信群通知。	社团，学生社团与文化活动	https://mmbiz.qpic.cn/mmbiz_png/bcic4QHTqzJxOR6k0t5vKs2PQAsgk38Pz7GV4YkpescibefZIh4bSzZn2WPvhBPtMkPXKwyrVlic34YwzfQtCryvg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8	pku烹协，元火	2025/11/21，9:30-11:30或14:30-16:30	新太阳学生中心 348	https://mp.weixin.qq.com/s/7yYpTOSZWa5o0lmn89u7xw	18	2025/11/21	2025/11/21	微信公众号文章	
19	读书会预告 | 「我们」×元培书房×范晔：《小径分岔的花园》	读书会预告 | 「我们」×元培书房×范晔：《小径分岔的花园》	空	「我们」文学社与元培书房联合举办博尔赫斯《小径分岔的花园》读书会，将于 2025 年 11 月 16 日 14:30 在俄文楼 201 开展。活动由北大外国语学院西班牙语系副教授范晔主讲，无理论阅读经验要求，社团群成员可直接参与，群外同学需在公众号后台留言加入，诚邀文学爱好者共探经典。	社团，学生社团与文化活动	https://mmbiz.qpic.cn/mmbiz_png/4OGYDdZ1LZmVwvrFd7IiahUEdF4O7krQJoLKGZkDSz5nCzvBDJe4GT9U6CA2wKeiaaDFY85BvZ4dz5rmtyjZuscg/640?wx_fmt=png&from=appmsg&wxfrom=13&tp=wxpic#imgIndex=0	pku我们文学社，元培书院	2025/11/16，14：30	俄文楼201	https://mp.weixin.qq.com/s/ljVlcOYF2gaHZW72L7wC1Q	19	2025/11/21	2025/11/21	微信公众号文章	
20	活动预告｜“初相见”迎新手语班	活动预告｜“初相见”迎新手语班	空	北大爱心社手语分社 “初相见” 迎新手语班开放报名！9 月 27 日 18:30 在二教 105 举办，面向全校同学，无基础要求。活动含手语分社介绍、小团长团歌展示、日常问候与校园热点词汇教学，还将教授手语歌《虫儿飞》，轻松解锁手语技能。感兴趣的同学可填写问卷入群了解详情，无论爱不爱说话，都能在这里感受手语魅力～	社团，学生社团与文化活动/志愿服务与公益	空	北大爱心社手语分社	2025/9/27，18:30	二教 105	https://mp.weixin.qq.com/s/H2lhajJzk3PPm3TbpceQ0g	20	2025/11/21	2025/11/21	微信公众号文章	
21	第三届全国大学生公共经济与政策论文大赛正式启动 | 北大经院报名通知	第三届全国大学生公共经济与政策论文大赛正式启动 | 北大经院报名通知	空	第三届全国大学生公共经济与政策论文大赛由五所高校联合主办，将于北大经济学院举办。赛事面向全国本科在校生，以校为单位组队（1-5 人，可配 1-2 名指导老师），征集与公共经济与政策相关的原创论文（正文字数≥8000 字），鼓励学术性研究与社会实践类论文参赛。大赛分初赛（通讯评审）和决赛（现场答辩），设一至优秀奖及对应奖金（最高 5000 元 / 队），一等奖队伍可获北大经院夏令营入营资格。4 月 10 日前需填写报名问卷，4 月 20 日前提交论文至指定邮箱，可添加 QQ 群 1026264277 咨询详情。	国家级、竞赛与创新创业	空	北京大学经济学院、山东大学经济学院、上海财经大学公共经济与管理学院、厦门大学经济学院、中国人民大学财政金融学院	2025/4/10，23：59	线上	https://mp.weixin.qq.com/s/wM-WvvKkik8j9oq4Onxl3w	21	2025/11/21	2025/11/21	微信公众号文章	
22	中国歌剧舞剧院 大型民族舞剧《赵氏孤儿》	中国歌剧舞剧院 大型民族舞剧《赵氏孤儿》	空	北大百周年纪念讲堂与中国歌剧舞剧院再度携手，引入经典舞剧《赵氏孤儿》。这部鸿篇巨制以舞蹈演绎程婴舍子救孤、忍辱负重十六年的忠义故事，胡阳、孙富博等主演联袂呈现，演出时长约 90 分钟无中场休息。作为国家级艺术剧院，中国歌剧舞剧院曾推出《孔子》《李白》等经典剧目，此次将以精湛技艺传递中华传统文化精髓，丰富校园美育生活，为师生带来跨越时空的艺术盛宴。	校级、学生社团与文化活动	https://hall.pku.edu.cn/images/2025-10/3b756ac5e2d6454e8a05511485d8965f.jpg，https://hall.pku.edu.cn/images/buy-code.png	北京大学会议中心	2025/11/21，19：00	讲堂观众厅	https://hall.pku.edu.cn/hdgp/zxyc/w/0962abdb6cbf49d484aaec4222939ab3.htm	22	2025/11/21	2025/11/21	北京大学百周年纪念讲堂官网	
23	十佳·报名 | 北大十佳，一路“声”花	十佳·报名 | 北大十佳，一路“声”花	空	2024-2025 学年北京大学校园十佳歌手大赛启动，主题为 “声逢博雅，花开未名”。选手需于 10 月 7 日 23:59 前扫码问卷报名，可选择个人或不超过 10 人的团队形式，初赛演唱时长控制在 2 分半内，伴奏需在 10 月 10 日 12:00 前按要求发送至指定邮箱，晋级名单将按评委打分比例确定。同时招募主持人，10 月 7 日 12:00 前问卷报名，面向全校在读生，有大型活动主持经验者优先，入选者将参与初复赛主持。选手及主持人报名咨询可发送邮件至 PKU2025topsinger@163.com，注明对应主题。	校级，学生社团与文化活动	https://mmbiz.qpic.cn/sz_mmbiz_png/sTHGDZ2o0PT0YJswRWRZgTuzlCC4XX8QgZ8u2kUhoN10HlNDpTKVxbUYgW81MOk1h1kaywU8y835vDTXSibxXcw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1	北京大学学生会	2024/10/07，23：29	线上	https://mp.weixin.qq.com/s/NxVHRfBKFURxwHHuHsdL_g	23	2025/11/21	2025/11/21	微信公众号文章	
24	北大讲座·预告 | 杜晓勤：中国古典诗歌，一门尚未被AI超越的艺术	北大讲座·预告 | 杜晓勤：中国古典诗歌，一门尚未被AI超越的艺术	空	北大讲座《中国古典诗歌：一门尚未被 AI 超越的艺术》即将开讲，聚焦古典诗歌的人文内核与不可替代的诗心。讲座由北大中文系主任杜晓勤教授主讲，他将带领大家深入唐宋诗篇，探寻穿越千年的人文精神，解读诗歌源于生命体悟与情感共鸣的独特魅力。活动将于 11 月 13 日 15:00-17:00 在新燕园校区学术交流中心第五会议室举办，为燕园、学院路校区同学提供往返班车。北大全体在校学生可于 11 月 12 日 21:00 前扫描二维码填写问卷报名，名额有限，报名成功将收到短信通知，问卷内附活动微信群二维码。	校级，学术类活动	https://mmbiz.qpic.cn/sz_mmbiz_png/Hv5Kq9DE2HShE3CHZQvxUmIEzAbHqicN3RwBGibsGJ6F8Yjyl1WygxxGUAiaUmjLszLWZtWwRdFKTubV5E9YxzPaA/640?wx_fmt=png&wxfrom=13&tp=wxpic#imgIndex=2	北大团委	2025/11/13，15：00-17：00	北京大学新燕园校区学术交流中心第五会议室	https://mp.weixin.qq.com/s/U_m7lHl_nbkY90hwH5thPw	24	2025/11/21	2025/11/21	微信公众号文章	
25	冠军讲堂 · 预告 | 苗浩：凌云铁人志，赤子铸梦心	冠军讲堂 · 预告 | 苗浩：凌云铁人志，赤子铸梦心	空	北大“冠军讲堂”第四讲来袭！课程《体育文化与创新精神》由校体育教研部等联合开设，11月12日18:40-20:30在二教404开讲。特邀中国首位铁人三项职业运动员苗浩分享拼搏经历，他屡破亚洲纪录，是首位闯入大铁8小时大关的亚洲人。课程由乒乓球世界冠军、北大教授刘伟主持，开放旁听名额，扫码填问卷即报名，选课生无需单独报名，邀你感受超越极限的力量。	校级，体育与健康	https://mmbiz.qpic.cn/sz_mmbiz_png/Hv5Kq9DE2HSeGOCs8LgnMEZCxnG66LzJ0ETdhTCM6ribGR89ia3D1ElibmH8ibIDBaZ3C0ib4KD4e6icIFl9bELXWzMw/640?wx_fmt=png&wxfrom=13&tp=wxpic#imgIndex=2	北大团委，北大体育教研室	2025/11/12，18：40-20：30	第二教学楼404教室	https://mp.weixin.qq.com/s/Mn5n7LRsO6Td28XxgkFjrA	25	2025/11/21	2025/11/21	微信公众号文章	
26	挑战杯 | 关于第三十四届“挑战杯”系列赛事特别贡献奖研究课题招标的公告	挑战杯 | 关于第三十四届“挑战杯”系列赛事特别贡献奖研究课题招标的公告	空	北京大学第三十四届“挑战杯”特别贡献奖研究课题招标启动，设71个课题，涵盖校园治理、教育改革、青年发展等领域。全校学生可投标，需于2025年11月8日17:00前按规范提交申报书等材料至指定邮箱。每人限参与一个课题竞标，中标者将获理论指导支持，名单将于11月24日前公布。	校级，竞赛与创新创业	空	北大团委，北京大学“挑战杯”科技工程办公室	2025/11/08，17：00	线上	https://mp.weixin.qq.com/s/y1wAK2WkxDVgx0wkJxdsCQ	26	2025/11/21	2025/11/21	微信公众号文章	
27	志愿大讲堂第十五讲报名 | 九三阅兵展风采，志愿精神永相传	志愿大讲堂第十五讲报名 | 九三阅兵展风采，志愿精神永相传	空	北大《志愿大讲堂》将于11月2日18:00-20:00在经济学院东旭报告厅开讲。本期邀请三位九三阅兵优秀志愿者代表，分享“背对精彩，面向责任”的志愿故事。“志愿服务”模块选课生需在思政实践平台报名（限300人），其他同学填问卷报名（限30人），11月2日16:00截止，成功报名将获邮件通知，助力学子感悟志愿精神。	校级，志愿服务与公益	空	北大团委	2025/11/02，18：00-20：00	北京大学经济学院东旭报告厅	https://mp.weixin.qq.com/s/0yG8MEq8sTL8WSpXjNPSdw	27	2025/11/21	2025/11/21	微信公众号文章	
28	预约火热进行时 | 北京大学“学雷锋·做实事·进社区”志愿服务主题实践活动项目名录	预约火热进行时 | 北京大学“学雷锋·做实事·进社区”志愿服务主题实践活动项目名录	空	为深入学习贯彻党的二十大精神，全面落实习近平总书记关于志愿服务和劳动育人的重要指示精神，奋力推动学雷锋活动融入日常、化为经常，让雷锋精神在新时代绽放更加璀璨的光芒，北京大学团委联动近50个院系、6家附属医院，全面启动北京大学第六期“学雷锋·做实事·进社区志愿服务主题实践活动。本期活动校团委联动院系，结合专业特色，首批推出5类25个特色志愿服务项目，供国企央企、街道社区、中小学等单位在线预约。	校级，志愿服务与公益	https://mmbiz.qpic.cn/sz_mmbiz_png/Hv5Kq9DE2HQkmOPvz6mEqgOanUib9XJUh6SG1DFQXnDy6E5OcDvUiaZ85ScsfH6g3rGMToibKwicaFeuicwNIX2LoBQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1	北大团委	空	空	https://mp.weixin.qq.com/s/f2FQl0qbG7d22pbvfd3GdA	28	2025/11/21	2025/11/21	微信公众号文章	
29	报名开启｜算力管够，奖品丰厚！“燕缘·滴水湖”大学生AI+国际创业大赛等你来战！	报名开启｜算力管够，奖品丰厚！“燕缘·滴水湖”大学生AI+国际创业大赛等你来战！	空	“燕缘・滴水湖” 大学生 AI + 国际创业大赛已开启报名，由上海临港北京大学国际科技创新中心（北大与上海临港新片区共建的科技创新服务平台）主办。大赛依托北大官方支持的 “燕缘科创生态” 体系，聚焦科技成果转化与产学研融合，提供充足算力支持及丰厚奖励。如需咨询，可通过邮箱 iicsh@pku.edu.cn 或官网http://iicsh.pku.edu.cn联系，诚邀大学生创业者参与。	国家级，竞赛与创新创业	https://mmbiz.qpic.cn/sz_mmbiz_png/Hv5Kq9DE2HS8sKC7eouaMm5MGxQMib6otuduPXfGEsOLN8w0RfDtuyudH9C1ZR9NhQ0wFaAIOFpeuulaucYjLxA/640?wx_fmt=png&wxfrom=13&tp=wxpic#imgIndex=1	青年报社，南汇新城镇人民政府，上海临港北京大学国际科技创新中心	2025/6/16	线上	https://mp.weixin.qq.com/s/lpvE6Qs5OCliH6IZvmo3hA	29	2025/11/21	2025/11/21	微信公众号文章	
30	宣讲+双选 | 宜昌市2026年“招才兴业”暨“千企百校行”北京大学专场招聘活动	宣讲+双选 | 宜昌市2026年“招才兴业”暨“千企百校行”北京大学专场招聘活动	空	宜昌市2026年“招才兴业”暨“千企百校行”北大专场招聘会，将于2025年11月21日9:00-12:00在英杰交流中心一楼阳光厅举办。宜昌作为“三峡门户”，经济总量超6000亿元，聚焦新材料、生命健康等领域，正推进多项国家重大工程。活动面向应往届毕业生，汇聚29家高校、事业单位等，提供岗位信息与人才引进政策，扫码可查详情，诚邀学子赴宜就业创业。	校级，职业发展类	https://mmbiz.qpic.cn/sz_mmbiz_jpg/G6DJOIibBPzYXwqdGvyON1qE5fTCf6qjp6Y1bn7BlibzSQrZZ8L0icIS1t2g5PmmibLm7CzqFU87ibxnMPK4iavHQpiaA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0	北京大学学生就业指导服务中心，宜昌市招聘单位	2025/11/21，9：00	英杰交流中心阳光厅	https://mp.weixin.qq.com/s/EkcYDbstx2-YiJzbQFdxTQ	30	2025/11/21	2025/11/21	微信公众号文章	
31	2025 北大光华 - 凯洛格国际 EMBA 全球公开课 @香港站	2025 北大光华 - 凯洛格国际 EMBA 全球公开课 @香港站	空	北大光华 - 凯洛格国际 EMBA 项目在香港举办全球公开课。颜色教授将解读《中国宏观经济政策的历史渊源与未来展望》，王辉教授介绍项目概况，现场设互动答疑环节。	院系级、学术类活动	https://mmbiz.qpic.cn/mmbiz_jpg/d0fxSGSnuhorPxGulWziba3MQ3X9rc6BH3oAnKTrXK3x4WKnhGsK9CZics7322smlA8zlZH1VzHHibdLdYxJ1xZqg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1	北京大学光华管理学院	2025/11/28 15:30-17:30	香港 Hong Kong	https://mp.weixin.qq.com/s/y_ODLiZj21t0L2zSNIYdUg	31	2025/11/21	2025/11/21	微信公众号文章	
32	首届经济学自主知识体系前沿学术论坛	首届经济学自主知识体系前沿学术论坛	空	“首届经济学自主知识体系前沿学术论坛” 拟于 2025 年 11 月 15 日在北京大学举办	院系级，学术类活动	https://mmbiz.qpic.cn/sz_mmbiz_png/KKGDLJCtzoIELAmzPlxs0nLoiaXq7PEWJloklW8p6RGudIvFy9Lib351SfKnuIFdnDMD8lKfMB7ichaQgGIUga8xA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1	经济学自主知识体系学术共同体，北京大学光华管理学院	2025/11/15，09:00-17:00	北京大学光华管理学院	https://mp.weixin.qq.com/s/Ibwq_Jfom6AR8jfJUKIzKA	32	2025/11/21	2025/11/21	微信公众号文章	
33	Frontier Electronics Technology Talk 学术论坛	Frontier Electronics Technology Talk 学术论坛	听众报名丨 Frontier Electronics Technology Talk	北京大学电子信息科学类实验班主办的电子信息技术学术论坛 Frontier Electronics Technology Talk（FET⟡）将于 2025 年 11 月 22 日（星期六）举行，现面向信息科学技术学院、电子学院和集成电路学院开放观众报名通道，欢迎各位同学前来参加～	院系级，学术类活动	空	北京大学信息科学技术学院	2025/11/14，15:00	科学报告厅（中关新园 1 号楼 2 层）	https://eecs.pku.edu.cn/info/1047/7873.htm	33	2025/11/21	2025/11/21	北京大学信息科学技术学院官网	
34	“创新 +” 工作站研究项目中期答辩	“创新 +” 工作站研究项目中期答辩	空	北京大学信息科学技术学院 “创新 +” 工作站是探索科技创新实践与劳动育人新机制的尝试，学生自主组建团队申报课题，	院系级，学术类活动	空	北京大学信息科学技术学院	2025/11/14，15:00	北京大学理科一号楼 1127 会议室	https://eecs.pku.edu.cn/info/1047/7873.htm	34	2025/11/21	2025/11/21	北京大学信息科学技术学院官网	
35	知存讲座（混元大语言模型强化学习实践）	知存讲座（混元大语言模型强化学习实践）	空		院系级，学术类活动	https://eecs.pku.edu.cn/virtual_attach_file.vsb?afc=unRvUDoll4olW2onl-PUllioz-aLmrSfL4CYMzl8U8C4MzG0gihFp2hmCIa0M1yYn1y4UYyYMzv8L774oRlsnmCsLR-Pol-snmlbnRrkLmWFL4-inlL4MzMFLNUPnmlJqjfTQ4Oeo4xTQ5MmgDTJQty0LzGiLkysM474gtA8pUzcc&oid=1828791678&tid=1050&nid=7713&e=.jpeg	北京大学信息科学技术学院	2025/10/31，18:40	理教 107	https://eecs.pku.edu.cn/info/1050/7713.htm	35	2025/11/21	2025/11/21	北京大学经济学院官网	
36	“对话投资总监” 系列讲座（股指期货的量化择时模型）	“对话投资总监” 系列讲座（股指期货的量化择时模型）	空	北大经院黎新平老师主持。内容包括深度解析股指期货的量化择时模型，梳理量化择时框架演进（经典模型到高频预测模型），结合 A 股市场特征讨论策略在不同行情下的表现差异，分享股指期货择时信号与现货组合管理、阿尔法策略协同构建投资组合的方法；介绍光证资管（2012 年成立，前身为光大证券资产管理总部，注册资本 2 亿，全资控股，依托集团优势提供资产配置方案）	院系级，学术类活动	空	北京大学经济学院	2025/11/19，19：00-20：30	北京大学经济学院 107 会议室	https://econ.pku.edu.cn/ltjz/57b66ab95d0b46f68ae4986ac206a03d.htm	36	2025/11/21	2025/11/21	北京大学经济学院官网	
37	“健康与劳动经济学” 工作坊	“健康与劳动经济学” 工作坊	空	主讲人林琳（华东师范大学公共管理学院助理教授，美国俄亥俄州立大学经济学博士，研究领域为劳动与健康经济学等，成果发表于多本国际期刊），由北大全健院蒋少翔老师主持，北大经院秦雪征、施新政等及北大全健院刘国恩、黄成等老师参与。内容聚焦《平价医疗法案》（ACA）实施后，低收入人群医保参保率提升对医生选址及医疗服务可及性差异的影响，通过回归模型分析医保参保（私人保险、医疗补助计划）对医生选址的作用，探讨其对医疗服务差异的影响，及对其他医疗提供者分布的作用	院系级，学术类活动	空	北大经院，北大全健院	2025/11/19，10：00-11：30	北京大学经济学院 305 会议室	https://econ.pku.edu.cn/ltjz/57b66ab95d0b46f68ae4986ac206a03d.htm	37	2025/11/21	2025/11/21	北京大学经济学院官网	
38	行业研究前沿》课程系列讲座（碳中和和能源转型）	行业研究前沿》课程系列讲座（碳中和和能源转型）	空	主讲人郭鹏（广发证券发展研究中心副总经理、环保公用行业首席分析师，新财富钻石分析师，多次获最佳分析师评选第一名，深度覆盖行业动向，参与多项并购、IPO 项目），由北京大学经济学院锁凌燕教授主持。内容围绕碳中和与能源转型前沿展开	院系级，学术类活动	空	北京大学经济学院，北京大学中国保险与社会保障研究中心，北京大学中国金融与投资研究中心	2025/11/18，18：40-20：30	线上（腾讯会议）	https://econ.pku.edu.cn/ltjz/57b66ab95d0b46f68ae4986ac206a03d.htm	38	2025/11/21	2025/11/21	北京大学经济学院	
39	【展览活动】 灵光独耀：沈宗灵先生旧藏档案文献展	【展览活动】 灵光独耀：沈宗灵先生旧藏档案文献展		沈宗灵（1923—2012），浙江杭州人，中国当代著名法理学家、比较法学家、教育家，北京大学法学院教授，中国法理学和比较法学研究的开拓者与奠基人之一。其一生治学严谨，学术视野宏阔，以毕生心力推动了中国法理学的独立建制与理论创新，为中国法学走向现代化作出了卓越贡献。正如《五灯会元》所言：“灵光独耀，迥脱根尘。”这是他一生精神的写照：专注学问、远离浮华，以独立之思、清正之德照耀后学。	院系级，学术类活动	https://www.law.pku.edu.cn/images/2025-11/7e2744f10ff449d7bd0f87d30db29577.png	北京大学法学院，北京大学沈宗灵法学基金	2025/11/10—2025/12/20	北京大学法学院凯原楼四层 法律图书馆	https://www.law.pku.edu.cn/xwzx/xzjz/db9f52210e724bda900e37f386ad72e8.htm	39	2025/11/21	2025/11/21	北京大学法学院官网	
40	王文宇对赌协议讲座	王文宇对赌协议讲座		讲座由台湾大学法律学院兼任教授、开南大学法律学院院长王文宇主讲，北京大学法学院戴昕主持，楼建波、贺剑、邹星光评议。王文宇教授有丰富学术与实务经历，研究领域涵盖公司企业法等，讲座聚焦对赌协议的缺失与改善，从法律经济学视角展开分析	院系级，学术类活动	https://www.law.pku.edu.cn/images/2025-10/25eda5a2fb6d4cc29031d1503362c56c.png	北京大学法学院	2025/10/29，12:00-14:00	北京大学法学院凯原楼 307 会议室	https://www.law.pku.edu.cn/xwzx/xzjz/dc6c39a3a5de42398660a4a308c7fa51.htm	40	2025/11/21	2025/11/21	北京大学法学院官网	
41	Alena Douhan 集体安全法系列讲座	Alena Douhan 集体安全法系列讲座	空	Alena Douhan：LAW OF COLLECTIVE SECURITY	院系级，学术类活动	https://www.law.pku.edu.cn/images/2025-10/6bf6de138b2d4a52a8f34f96b9f17d17.jpeg	北京大学法学院	2025/10/27、2025/10/31、2025/11/01、2025/11/07（具体时段详见描述）	凯原楼 303、凯原楼 307（分场次）	https://www.law.pku.edu.cn/xwzx/xzjz/796dbb81d5c84265b1441ee5486a5be9.htm	41	2025/11/21	2025/11/21	北京大学法学院官网	
42	北大 - 早大合作研究交流会	北大 - 早大合作研究交流会	空	会议主题为 “Kazuo Ishiguro: Film and Literature”，于 2025 年 10 月 24 日举办，北京时 09:00-13:45，东京时 10:00-14:45，线下会议室为北京大学国际关系学院 C105，语言为英语和日语	院系级，学术类活动	https://www.sis.pku.edu.cn/images/content/2025-10/20251017164701974443.jpg	北京大学国际关系学院	2025/10/24，09:00-13:45（北京时间）	C105, School of International Studies, Peking University（北京大学国际关系学院 C105 会议室）	https://www.sis.pku.edu.cn/message27/1387750.htm	42	2025/11/21	2025/11/21	北京大学国际关系学院官网	
43	特朗普对加拿大贸易冲击讲座	特朗普对加拿大贸易冲击讲座	空	加拿大卡尔顿大学政治学教授包天民应北京大学美国研究中心邀请主讲，北京大学国际关系学院王勇主持，50 余位师生参与。包天民分析加美双边贸易关系历史演进、特朗普关税措施影响，提出加拿大应对策略，会后与师生交流	院系级，学术类活动	空	北京大学国际关系学院	2025/11/5	空	https://www.sis.pku.edu.cn/news641/1388082.htm	43	2025/11/21	2025/11/21	北京大学国际关系学院官网	
44	Boltzmann 方程 Cauchy 问题报告	Boltzmann 方程 Cauchy 问题报告	空	报告人徐超江（南京航空航天大学），研究非角切断 Boltzmann 方程的 Cauchy 问题，证明弱解具有 “类似于热传导方程” 的解析光滑性效应，即给定有限界光滑初始值，解在时间大于零时关于所有空间变量和速度变量解析	院系级，学术类活动	空	北京大学数学科学学院	2025/11/22，14:00-15:00	智华楼四元厅	https://www.math.pku.edu.cn/kxyj/xsbg/tlb/analysisforpde/170988.htm	44	2025/11/21	2025/11/21	北京大学数学科学学院官网	
45	Virasoro 代数共形块报告	Virasoro 代数共形块报告	空	报告人 Shinji Koshida（Aalto University），从张量范畴视角探讨二维共形场论中的共形块，介绍顶点算子代数模的张量范畴理论核心思想，讨论 Liouville 共形场论的相关框架，报告人 2018 年获东京大学博士学位，现任 Aalto 大学研究院研究员	院系级，学术类活动	空	北京大学数学科学学院	2025/11/24，14:00-15:00	智华楼四元厅	https://www.math.pku.edu.cn/kxyj/xsbg/tlb/probabilityandstatistics/170948.htm	45	2025/11/21	2025/11/21	北京大学数学科学学院官网	
46	通信受限场景量化辨识方法午餐会	通信受限场景量化辨识方法午餐会	空	报告人韩天凝（中国科学院数学与系统科学研究院），研究通信受限下系统辨识，提出补偿机制算法，解决丢包与二值观测问题，节省通信资源，需 11 月 25 日 15:00 前填问卷报名，12:00 提供午餐，12:15-13:15 报告	院系级，学术类活动	空	北京大学数学科学学院	2025/11/26，12:00-13:15		https://www.math.pku.edu.cn/kxyj/xsbg/tlb/computationaandappliedmath/171002.htm	46	2025/11/21	2025/11/21	北京大学数学科学学院官网	
47	青年媒体人圆桌论坛	青年媒体人圆桌论坛	空	由北京大学新闻与传播学院研究生会联合多校新传学院研究生会主办，陈开和致辞，6 位青年媒体从业者分享职业经历，围绕记者准入条件、难忘经历、职业成就感、AI 时代挑战交流，现场设自由提问环节，深化校际与行业交流	院系级，学术类活动	https://mmbiz.qpic.cn/mmbiz_jpg/icTM4xkzGuCMgwEls8cOwtSWNlYp0CjdACSeATP6oNGicyGnTshRtmDEdfJw0m08he9DDnjGbvTXlzzhhVzvuwaw/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0	北京大学新闻与传播学院	2025/11/082	蒙民伟楼报告厅	https://mp.weixin.qq.com/s/dzlBmZ0fU5MsPOiSryM4Zw	47	2025/11/21	2025/11/21	微信公众号	
48	新闻与传播学院四中全会学习会	新闻与传播学院四中全会学习会	空	2025 年 10 月 31 日在蒙民伟楼 347 会议室召开，田丽领学全会精神，强调系统、联系实际、交流学习，各党支部书记及学生代表分享体会，卢亮总结并布置工作，推动全会精神落地	院系级，学术类活动	空	新闻与传播学院党委	2025/10/31	蒙民伟楼 347 会议室	https://sjc.pku.edu.cn/info/1037/13903.htm	48	2025/11/21	2025/11/21	北京大学新闻与传播学院官网	
49	新闻与传播学院十五五规划研讨会	新闻与传播学院十五五规划研讨会	空	11 月 3 日召开，陈刚主持，田丽领学全会精神，陈刚指出 2026 年是建院 25 周年，会议决定成立 “十五五” 规划领导小组，对接国家战略，加速双一流建设，培养人才，推出成果	院系级，学术类活动	空	北京大学新闻与传播学院党政班子	2025/11/3	空	https://sjc.pku.edu.cn/info/1037/13893.htm	49	2025/11/21	2025/11/21	北京大学新闻与传播学院官网	
50	Ethical Voice 研究讲座	Ethical Voice 研究讲座	空	主讲人 Dr. Ted A. Paterson（俄勒冈州立大学），探讨道德发声的前因、相关因素与结果，介绍领导力、文化等对道德发声环境的影响，以及角色期望的作用、道德发声后果，最后讨论未来研究方向	院系级，学术类活动	https://www.psy.pku.edu.cn/images/2025-10/ea77beff3e7744cc825bde1fcc5f6e39.jpg	北京大学心理与认知科学学院	2025/11/4，14:00-16:00	Room 1805 Wangkezhen Building（王克桢楼 1805 室）	https://www.psy.pku.edu.cn/xwzx/xsbg/a6480eab34f04dde8c35e2491c03c1f9.htm	50	2025/11/21	2025/11/21	北京大学心理与认知科学学院官网	
51	PTSD 症状干预研究讲座	PTSD 症状干预研究讲座	空	主讲人 Jochen Gensichen 教授（慕尼黑大学），研究全科医生主导的简短叙事暴露干预对重症监护后 PTSD 症状的影响，发现该干预可行且能减轻症状，12 个月随访效果持续，支持在初级保健中进一步评估，教授有丰富学术经历与荣誉	院系级，学术类活动	空	北京大学心理与认知科学学院	2025/9/16，13:30-15:00	王克桢楼 1113	https://www.psy.pku.edu.cn/xwzx/xsbg/50132psy391016.htm	51	2025/11/21	2025/11/21	北京大学心理与认知科学学院官网	
52	游泳学习项目影响评估讲座	游泳学习项目影响评估讲座	空	主讲人 Dr. Derwin Chan（香港教育大学），分享香港最大游泳学习项目（2016-2018 年为 1.65 万名小学生提供 20 节游泳课）的影响评估，开展准实验与纵向研究，生成儿童游泳能力等相关假设，体现影响评估对社会行为科学研究的价值，主讲人研究领域广泛且有诸多学术任职	院系级，学术类活动	空	北京大学心理与认知科学学院	2025/09/18，14:00 - 15:30	博雅学堂 201	https://www.psy.pku.edu.cn/xwzx/xsbg/50132psy390927.htm	52	2025/11/21	2025/11/21	北京大学心理与认知科学学院官网	
53	北大教育论坛第 329 讲	北大教育论坛第 329 讲	报告一：在人工智能时代蓬勃发展：重构学习与教学，迈向人机共生共教的未来 报告二：教育评价数智化变革的审思与进路		院系级，学术类活动	空	北京大学教育学院	2025/11/11，14:00-16:00	教育学院 209 教室	https://www.gse.pku.edu.cn/syxw/jzxx/1051jyxy170684.htm	53	2025/11/21	2025/11/21	北京大学教育学院官网	
54	教育数智化转型京港学术交流	教育数智化转型京港学术交流	空	响应教育数字化转型号召，11 月 25-27 日举办，设开幕式、教师论坛、学生论坛，线下在北京大学教育学院，线上用腾讯会议，邀请多单位专家，不收会务费，推动前沿技术与教育融合	院系级，学术类活动	空	北京大学教育学院	2025/11/25-2025/11/27	1. 线下：北京大学教育学院 112 教室、北京大学教育学院 103 教室	https://www.gse.pku.edu.cn/syxw/kyxx/1051jyxy170985.htm	54	2025/11/21	2025/11/21	北京大学教育学院官网	
55	环境学科优秀青年人才国际论坛	环境学科优秀青年人才国际论坛	空	由北京大学环境科学与工程学院和深圳研究生院环境与能源学院联合主办，聚焦学术前沿，12 月 25 日前简历投递，12 月 31 日前发邀请，2026 年 1 月线上分论坛遴选，2 月下旬主论坛，覆盖多环境学科方向，为受邀学者报销差旅，提供优厚待遇招聘英才	院系级，学术类活动	空	北京大学环境科学与工程学院	2026/02（主论坛）	2. 线上：腾讯会议（分场次会议号：#648-114-462、#584-793-575、#733-433-294）	https://cese.pku.edu.cn/tzgg/170720.htm	55	2025/11/21	2025/11/21	北京大学环境科学与工程学院官网	
56	中英气候与可持续研究国际研讨会	中英气候与可持续研究国际研讨会	空	11 月 8 日在北京大学环境科学与工程学院举行，中英专家围绕环境气候政策模型发展、政策应用与合作方向探讨，含主旨报告、模型方法分享、圆桌交流，推动模型对接与数据共享，搭建长期合作平台	院系级，学术类活动	空	北京大学环境科学与工程学院	2025/11/8	空	https://cese.pku.edu.cn/xwzx/170877.htm	56	2025/11/21	2025/11/21	北京大学环境科学与工程学院官网	
57	民政部访问北大座谈	民政部访问北大座谈	民政部一行访问北京大学并进行座谈交流		院系级，学术类活动	空	北京大学人口研究所	2025/10/21	空	https://ipr.pku.edu.cn/xwzx/75bb0b028978461cac287f35dd98b134.htm	57	2025/11/21	2025/11/21	北京大学人口研究所官网	
58	出土文献与商周制度青年学者工作坊	出土文献与商周制度青年学者工作坊	出土文献与商周制度比较研究青年学者工作坊		院系级，学术类活动	空	北京大学出土文献与古代文明研究所	2025/11/22-2025/11/23	北京大学中国古代史研究中心报告厅	https://mp.weixin.qq.com/s/jWl4OLFCaGX3SSwniia1Og	58	2025/11/21	2025/11/21	微信公众号	
59	生成式人工智能可信决策讲座	生成式人工智能可信决策讲座	生成式人工智能的可信决策		院系级，学术类活动	空	北京大学信息管理系	2025/11/20，15：10-17：00	二教 505	http://www.im.pku.edu.cn/xwgg/jzxx/391908.htm	59	2025/11/21	2025/11/21	北京大学信息管理系官网	
60	高原丝路文化研讨会	高原丝路文化研讨会	空	2025 年 8 月 22-23 日在拉萨举办，由北京大学艺术学院等 4 家单位联合主办，设 8 个议题，近 30 位专家学者参与，探讨高原丝路多元文化交流价值，加强北大与西藏大学合作，体现北大援藏责任	院系级，学术类活动	https://www.art.pku.edu.cn/images/2025-09/107f6a98dccf480b891a313d347e2ccb.jpeg	北京大学艺术学院、西藏大学艺术学院、浙江大学汉藏佛教艺术研究中心、中国艺术研究院文艺研究杂志社	2025/08/22-2025/08/23	空	https://www.art.pku.edu.cn/xyxw/023c7c9607b640efbe4e531875a49950.htm	60	2025/11/21	2025/11/21	北京大学艺术学院官网	
61	行为科学与政策干预学术研讨会	行为科学与政策干预学术研讨会	空	聚焦 “可持续发展的行为洞察”，11 月 10 日在北京大学光华管理学院举办，含开幕式、主旨报告、成果展示、实践分享、产学研沙龙，邀请国内外专家，欢迎相关人员报名	院系级，学术类活动	https://mmbiz.qpic.cn/sz_mmbiz_jpg/KKGDLJCtzoI8Fz8zxg8TXjLJ3X0tjMGePOdiaiao9Kqv2y8icqd9eO6CfR4Aqeib6G3XnwVzMQbZm1PZ2vI3nH5duQ/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6	北京大学光华管理学院行为科学与政策干预（BeSA）研讨会	2025/11/10	北京大学光华管理学院	https://mp.weixin.qq.com/s/TK3ezXcYLv8ARui5egEyGQ	61	2025/11/21	2025/11/21	微信公众号	
62	经济史学名家系列讲座	经济史学名家系列讲座	第 234 讲	历史上的科技革命与产业变革	院系级，学术类活动	空	北京大学经济学院经济史学系，北京大学社会经济史研究所，北京大学外国经济学说研究中心	2025/11/18，10：00-12：00	北京大学经济学院 303 会议室	https://econ.pku.edu.cn/ltjz/57b66ab95d0b46f68ae4986ac206a03d.htm	62	2025/11/21	2025/11/21	北京大学经济学院官网	`;

// ==========================================
// 数据解析逻辑
// ==========================================

const mapCategory = (rawCategory: string): ActivityCategory => {
  if (!rawCategory) return ActivityCategory.SOCIAL;
  const c = rawCategory.toLowerCase();
  if (c.includes('学术') || c.includes('讲座') || c.includes('科研')) return ActivityCategory.ACADEMIC;
  if (c.includes('体育') || c.includes('运动') || c.includes('比赛')) return ActivityCategory.SPORTS;
  if (c.includes('文化') || c.includes('艺术') || c.includes('十佳') || c.includes('歌')) return ActivityCategory.CULTURE;
  if (c.includes('就业') || c.includes('职业') || c.includes('招聘')) return ActivityCategory.CAREER;
  if (c.includes('志愿') || c.includes('公益')) return ActivityCategory.VOLUNTEER;
  return ActivityCategory.SOCIAL;
};

const parseDateTime = (rawTime: string) => {
  if (!rawTime) return { date: 'TBD', time: 'TBD' };
  const normalized = rawTime.replace('，', ',').replace('：', ':');
  const parts = normalized.split(',');
  return {
    date: parts[0] ? parts[0].trim() : 'TBD',
    time: parts[1] ? parts[1].trim() : 'All Day'
  };
};

const parseExcelData = (rawData: string): Activity[] => {
  const lines = rawData.trim().split('\n');
  if (lines.length < 2) return [];

  return lines.slice(1)
    .filter(line => line.trim() !== '')
    .map((line, index) => {
      const cols = line.split('\t');
      
      const { date, time } = parseDateTime(cols[8]);

      return {
        id: cols[0] || `auto-${index}`,
        title: cols[2] && cols[2] !== '空' ? cols[2] : (cols[1] || '未命名活动'),
        titleEn: '',
        description: cols[4] || '',
        descriptionEn: '',
        category: mapCategory(cols[5]),
        image: cols[6] && cols[6].startsWith('http') ? cols[6] : `https://picsum.photos/400/250?random=${index}`,
        organizer: cols[7] || 'Unknown',
        date: date,
        time: time,
        location: cols[9] || 'TBD',
        externalLink: cols[10] && cols[10].startsWith('http') ? cols[10] : undefined, // 解析外链 (Column 10)
        tags: [cols[5] || 'Activity'],
        registeredCount: Math.floor(Math.random() * 200) + 10,
        maxCapacity: 500,
        status: 'upcoming'
      };
    });
};

export const ACTIVITIES: Activity[] = parseExcelData(RAW_EXCEL_DATA);

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    activityId: '101',
    activityTitle: 'Campus Marathon 2023',
    rating: 5,
    content: 'Great atmosphere and well organized!',
    timestamp: '2023-11-15'
  },
  {
    id: 'r2',
    activityId: '102',
    activityTitle: 'Python Workshop',
    rating: 4,
    content: 'Very informative but a bit fast-paced.',
    timestamp: '2024-03-10'
  }
];

export const MOCK_REWARDS: Reward[] = [
  { id: 'rw1', title: 'PKU Coffee Voucher', cost: 100, icon: '☕', description: 'Redeem for a free coffee at any campus cafe.' },
  { id: 'rw2', title: 'Library Fast Pass', cost: 500, icon: '📚', description: 'Skip the queue for study room booking for one week.' },
  { id: 'rw3', title: 'Limited Edition Badge', cost: 300, icon: '🎖️', description: 'Exclusive 126th Anniversary metal badge.' },
  { id: 'rw4', title: 'Gym Access Card', cost: 200, icon: '💪', description: 'One-time entry to Khoo Teck Puat Gym.' },
];

export const MOCK_USER: User = {
  name: "Alex Zhang",
  role: UserRole.GRADUATE,
  preferences: [ActivityCategory.ACADEMIC, ActivityCategory.CAREER],
  joinedActivities: ['23'],
  savedActivities: [],
  completedActivities: ['101', '102'], 
  redeemedRewards: [],
  points: 340,
  reviews: MOCK_REVIEWS
};

// Initial Mock Posts for the feed
export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: 'Li Si',
    userRole: 'Undergraduate',
    content: 'Anyone going to the AI lecture this afternoon? Looking for someone to walk with from the library.',
    tag: 'Team Up',
    timestamp: '10 mins ago',
    likes: 12,
    commentsCount: 2,
    isLiked: false,
    comments: [
      { id: 'c1', user: 'Wang Wu', content: 'I am going! Meet at the south gate?', timestamp: '5 mins ago', likes: 1 },
      { id: 'c2', user: 'Chen Qi', content: 'Count me in.', timestamp: '2 mins ago', likes: 0 }
    ]
  },
  {
    id: 'p2',
    user: 'Wang Wu',
    userRole: 'Graduate',
    content: 'Found a blue umbrella in Classroom 302. Left it at the front desk.',
    tag: 'Lost & Found',
    timestamp: '1 hour ago',
    likes: 5,
    commentsCount: 1,
    isLiked: true,
    comments: [
      { id: 'c3', user: 'Zhang San', content: 'Thank you! That might be mine.', timestamp: '30 mins ago', likes: 2 }
    ]
  }
];

export const MOCK_COMMENTS = [
  { id: '1', user: 'User123', content: "Is the calligraphy workshop beginner friendly?", timestamp: "2h ago", likes: 5 },
  { id: '2', user: 'ArtStudent', content: "Yes! The teacher is very patient.", timestamp: "1h ago", likes: 8 },
];
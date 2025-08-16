(function(){
  // ----- 데이터 모델 및 저장 -----
  const STORAGE_KEY = 'speedquiz_state_v2';
  const DEFAULT_CATEGORIES = [
    {name:"동물",words:[
      "고양이","개","늑대","여우","호랑이","사자","표범","치타","재규어","퓨마","곰","판다","코알라","캥거루","코끼리","기린","하마","코뿔소",
      "들소","물소","소","말","당나귀","얼룩말","낙타","라마","알파카","사슴","노루","엘크","무스","순록","멧돼지","돼지","원숭이","침팬지",
      "고릴라","오랑우탄","바분","하이에나","너구리","라쿤","오소리","스컹크","수달","비버","다람쥐","청설모","토끼","햄스터","기니피그","두더지",
      "고슴도치","독수리","매","올빼미","부엉이","비둘기","참새","까치","까마귀","펭귄","타조","공작","백조","오리","거위","닭","칠면조","앵무새",
      "플라밍고","갈매기","물개","바다사자","고래","돌고래","상어","가오리","문어","오징어","해파리","거북","악어","이구아나","도마뱀","뱀",
      "카멜레온","개구리","두꺼비","도롱뇽","개미핥기","아르마딜로","미어캣","딱따구리","수컷사슴","코요테","오리너구리"
    ]},
    {name:"음식",words:[
      "김치","비빔밥","불고기","라면","떡볶이","삼겹살","김밥","갈비","잡채","냉면","치킨","피자","햄버거","초밥","우동","된장찌개","순두부찌개","만두",
      "파전","설렁탕","감자탕","부대찌개","갈비탕","칼국수","비지찌개","콩나물국밥","해장국","물회","회덮밥","쌈밥","보쌈","족발","쫄면","막국수","불닭",
      "타코","부리토","파스타","리조또","라자냐","스테이크","바비큐립","감바스","빠에야","케밥","후무스","카레","난","틴달루","버터치킨","사모사","짜장면",
      "짬뽕","탕수육","마라탕","꿔바로우","훠궈","초코케이크","티라미수","치즈케이크","크레페","붕어빵","호떡","팥빙수","카스테라","경단","모찌","도넛",
      "와플","팬케이크","토스트","샐러드","요거트볼","과일화채","핫도그","옥수수버터구이","순대","어묵","국수","감자전","김치전","새우탕","라볶이","주먹밥"
    ]},
    {name:"나라",words:[
      "대한민국","일본","중국","미국","캐나다","멕시코","브라질","아르헨티나","칠레","페루","콜롬비아","베네수엘라","영국","아일랜드","프랑스","독일","이탈리아",
      "스페인","포르투갈","네덜란드","벨기에","룩셈부르크","스위스","오스트리아","덴마크","노르웨이","스웨덴","핀란드","아이슬란드","폴란드","체코","슬로바키아",
      "헝가리","루마니아","불가리아","그리스","터키","러시아","우크라이나","벨라루스","카자흐스탄","인도","파키스탄","네팔","부탄","방글라데시","스리랑카","몰디브",
      "인도네시아","말레이시아","싱가포르","태국","베트남","라오스","캄보디아","미얀마","필리핀","호주","뉴질랜드","사우디아라비아","아랍에미리트","카타르",
      "쿠웨이트","이란","이라크","이스라엘","요르단","레바논","이집트","남아프리카공화국","나이지리아","케냐","에티오피아","모로코","튀니지","알제리","가나",
      "코트디부아르","세네갈","탄자니아","앙골라","콩고민주공화국","페루","볼리비아","파라과이","우루과이","쿠바","도미니카공화국","아이티","자메이카","파푸아뉴기니"
    ]},
    {name:"직업",words:[
      "의사","간호사","약사","치과의사","수의사","물리치료사","심리상담사","교사","교수","유치원교사","요리사","제빵사","바리스타","소믈리에","경찰관","소방관",
      "군인","판사","검사","변호사","법무사","회계사","세무사","은행원","증권딜러","보험설계사","기자","아나운서","PD","작가","편집자","번역가","통역사","디자이너",
      "그래픽디자이너","UX디자이너","건축가","인테리어디자이너","토목기사","전기기사","기계공학자","화학공학자","연구원","데이터사이언티스트","프로그래머",
      "게임개발자","모바일개발자","보안전문가","네트워크엔지니어","시스템관리자","제품매니저","프로덕트오너","마케터","광고기획자","카피라이터","세일즈","CS상담원",
      "항공기조종사","승무원","항해사","선장","배관공","용접공","목수","미용사","메이크업아티스트","네일아티스트","사진가","영화감독","배우","가수","무용수",
      "운동선수","코치","트레이너","피트니스강사","요가강사","플로리스트","농부","정원사","환경공학자","수의테크니션","드론조종사","콘텐츠크리에이터"
    ]},
    {name:"스포츠",words:[
      "축구","농구","야구","배구","테니스","탁구","배드민턴","골프","하키","럭비","미식축구","핸드볼","수영","다이빙","수구","서핑","요트","카누","카약","조정",
      "스키","스노보드","바이애슬론","컬링","피겨스케이팅","스피드스케이팅","사이클","BMX","산악자전거","트라이애슬론","마라톤","단거리달리기","허들","장대높이뛰기",
      "멀리뛰기","세단뛰기","높이뛰기","역도","레슬링","유도","태권도","가라테","복싱","킥복싱","주짓수","펜싱","양궁","사격","승마","클라이밍","스케이트보드",
      "스포츠클라이밍","e스포츠","철인3종","파쿠르","프리다이빙","모터스포츠","포뮬러원","래프팅"
    ]},
    {name:"과일",words:[
      "사과","배","복숭아","자두","살구","포도","거봉","청포도","딸기","블루베리","라즈베리","블랙베리","체리","오렌지","귤","한라봉","레몬","라임","자몽","망고",
      "파인애플","바나나","키위","멜론","수박","참외","석류","감","곶감","대추","밤","두리안","리치","롱안","망고스틴","코코넛","구아바","패션프루트","아보카도",
      "무화과","유자","금귤","산딸기","머루","다래","크랜베리","건포도","대추야자","카키","용과","스타후르츠","파파야","멋진딸기","자두포도","백포도","홍시","청시"
    ]},
    {name:"채소·식재료",words:[
      "양파","대파","쪽파","마늘","생강","감자","고구마","당근","무","순무","비트","연근","우엉","가지","오이","애호박","단호박","봄동","양배추","배추","상추","깻잎",
      "시금치","청경채","브로콜리","콜리플라워","아스파라거스","버섯","새송이","느타리","표고","팽이","양송이","고추","피망","파프리카","옥수수","완두콩","강낭콩",
      "병아리콩","렌틸콩","토마토","방울토마토","가지버섯","두부","어묵","미역","다시마","김","쑥갓","미나리","부추","무순","새싹채소","콩나물","숙주나물","케일",
      "루콜라","버터레터스","치커리","올리브","오크라","아티초크"
    ]},
    {name:"가전·전자제품",words:[
      "스마트폰","태블릿","노트북","데스크탑","모니터","키보드","마우스","프린터","스피커","헤드폰","이어폰","마이크","웹캠","외장하드","USB메모리","SSD","라우터",
      "공유기","스위치허브","NAS","TV","프로젝터","셋톱박스","게임콘솔","컨트롤러","VR헤드셋","드론","액션캠","디지털카메라","캠코더","전자책리더","스마트워치",
      "피트니스밴드","전기포트","커피머신","에스프레소머신","믹서기","에어프라이어","전자레인지","오븐","인덕션","가스레인지","청소기","로봇청소기","세탁기",
      "건조기","식기세척기","공기청정기","가습기","제습기","선풍기","서큘레이터","에어컨","보조배터리","멀티탭","충전기","무선충전기","빔스크린","NAS하드트레이",
      "광학드라이브","캡처보드","튜너"
    ]},
    {name:"탈것·교통수단",words:[
      "자동차","오토바이","자전거","킥보드","전동킥보드","버스","광역버스","마을버스","지하철","기차","KTX","트램","택시","카풀","여객선","페리","요트","카누",
      "카약","보트","세스나","헬리콥터","비행기","열기구","우주선","로켓","트럭","덤프트럭","불도저","포클레인","지게차","구급차","소방차","경찰차","청소차",
      "굴절버스","전차","스노우모빌","썰매","마차","말","케이블카","리프트","스케이트보드","인라인스케이트","세그웨이","호버보드","킥보드공유","카셰어링",
      "RV","캠핑카","트레일러","유조차","컨테이너선","유람선","수상택시","고속정"
    ]},
    {name:"학문·교과",words:[
      "국어","영어","수학","과학","사회","역사","지리","물리","화학","생명과학","지구과학","통계","확률","미적분","기하","문학","작문","문법","철학","윤리",
      "논리학","심리학","경제학","경영학","회계학","법학","정치학","사회학","인류학","교육학","언어학","미술","음악","체육","가정","기술가정","정보","컴퓨터과학",
      "프로그래밍","데이터과학","인공지능","기계학습","전자공학","전기공학","기계공학","건축학","토목공학","환경공학","화학공학","생명공학","해양학","천문학",
      "고고학","역사철학","미학","연극영화","디자인","미디어학","저널리즘"
    ]},
    {name:"한국 도시·지명",words:[
      "서울","부산","대구","인천","광주","대전","울산","세종","수원","고양","용인","창원","성남","부천","청주","남양주","전주","천안","안산","안양","김해","평택",
      "포항","의정부","시흥","파주","김포","광명","군포","화성","동탄","춘천","원주","강릉","속초","양양","삼척","태백","청송","영주","문경","경주","울진","영덕",
      "거제","통영","사천","여수","순천","광양","목포","군산","익산","정읍","목동","잠실","강남","홍대","해운대","광안리","송도","판교","대덕특구","송정","마곡"
    ]},
    {name:"일상 물건",words:[
      "연필","샤프","볼펜","만년필","지우개","자","각도기","컴퍼스","노트","공책","수첩","포스트잇","메모지","테이프","가위","커터칼","클립","스테이플러","바인더",
      "파일철","봉투","도장","스탬프","잉크","풀","딱풀","목공본드","문구칼","탁상시계","벽시계","일력","달력","사진틀","앨범","액자","머그컵","텀블러","물병",
      "도시락통","접시","그릇","수저","젓가락","포크","나이프","도마","칼","국자","뒤집개","주방장갑","행주","수세미","빗자루","쓰레받기","휴지통","분리수거통",
      "세제","섬유유연제","표백제","빨래집게","빨래건조대","옷걸이","구두주걱","신발장","슬리퍼","우산","우비","손전등","건전지","라이터","성냥","연장함",
      "망치","드라이버","펜치","렌치","줄자","수평계","타카","철사","케이블타이","테이프커터","멀티툴","돋보기","티슈","물티슈","키친타월","비닐봉지","지퍼백"
    ]},
    {name:"1~3세대 아이돌",words:[
      "서태지와아이들","H.O.T.","젝스키스","S.E.S.","핑클","신화","베이비복스","god",
      "클릭비","NRG","Koyote","터보","Diva","채리넷","샤크라","코요태","Fly to the Sky",
      "동방신기","SS501","빅뱅","슈퍼주니어","소녀시대","원더걸스","카라","2NE1",
      "브라운아이드걸스","다비치","포미닛","f(x)","샤이니","2PM","인피니트","씨스타",
      "미쓰에이","티아라","애프터스쿨","시크릿","B1A4","엠블랙","FT아일랜드","CNBLUE",
      "비스트","U-KISS","제국의아이들","레인보우","나인뮤지스","달샤벳","보이프렌드",
      "걸스데이","에이핑크","BTS","EXO","블랙핑크","트와이스","세븐틴","레드벨벳",
      "갓세븐","마마무","몬스타엑스","여자친구","비투비","iKON","위너","NCT",
      "워너원","IOI","코스믹걸스","오마이걸","러블리즈","VIXX","뉴이스트","B.A.P",
      "EXID","AOA","SF9","아스트로","KARD","드림캐쳐","펜타곤","VICTON","UP10TION",
      "구구단","프리스틴","CLC","WekiMeki"
    ]},
    {name:"4~5세대 아이돌",words:[
      "스트레이키즈","에스파","아이브","TXT","ITZY","엔하이픈","트레저","에이티즈",
      "(여자)아이들","더보이즈","엔시티드림","엔시티127","WayV","크래비티",
      "스테이씨","케플러","LOONA","NewJeans","르세라핌","NMIXX","TEMPEST",
      "CIX","AB6IX","ONEUS","ONEWE","VERIVERY","P1Harmony","GHOST9",
      "EPEX","MIRAE","DKZ","WEi","MCND","TO1","Ciipher","KINGDOM",
      "FIFTYFIFTY","fromis_9","VIVIZ","CLASSy","Lapillus","제로베이스원",
      "라이즈","투어스","보이넥스트도어","베이비몬스터","ILLIT","KISS OF LIFE",
      "xikers","PLAVE","tripleS","UNIS","KATSEYE","MEOVV","QWER","BADVILLAIN",
      "VCHA","T5","ALL(H)OURS","EVNNE","NOWADAYS","H1-KEY","ARTMS",
      "YOUNITE","Primrose","CandyShop","VVUP"
    ]},
    {name:"세계 도시",words:[
      "뉴욕","런던","파리","도쿄","홍콩","싱가포르","방콕","서울","시드니","로마",
      "바르셀로나","마드리드","리스본","이스탄불","두바이","리우데자네이루","케이프타운",
      "모스크바","베이징","상하이","멕시코시티","상파울루","뭄바이","델리","카이로",
      "카사블랑카","나이로비","요하네스버그","토론토","밴쿠버","로스앤젤레스",
      "샌프란시스코","마이애미","시카고","시애틀","베를린","암스테르담","브뤼셀",
      "취리히","빈","프라하","부다페스트","바르샤바","아테네","헬싱키","오슬로",
      "스톡홀름","코펜하겐","더블린","키이우","타이베이","자카르타","쿠알라룸푸르",
      "하노이","호치민시티","마닐라","산티아고","부에노스아이레스","리마","보고타"
    ]},
    {name:"세계 랜드마크",words:[
      "자유의여신상","에펠탑","빅벤","도쿄타워","시드니오페라하우스","콜로세움",
      "피사의사탑","파르테논신전","만리장성","타지마할","마추픽추","페트라","콜로세움",
      "크렘린","붉은광장","성소피아성당","버즈칼리파","페트로나스타워","루브르박물관",
      "노트르담대성당","사그라다파밀리아","알함브라궁전","금문교","엠파이어스테이트빌딩",
      "윈저성","버킹엄궁전","웨스트민스터사원","파르네세광장","이츠타칼피라미드",
      "앙코르와트","파타야플로팅마켓","그랜드캐니언","요세미티폭포","나이아가라폭포",
      "석굴암","경복궁","창덕궁","남산타워","롯데월드타워","도쿄스카이트리",
      "타이페이101","상트페테르부르크예배당","성바실성당","에르미타주박물관",
      "기자의피라미드","스핑크스","콜로세움","판테온","파리개선문","브란덴부르크문",
      "아야소피아","토파피궁전","바티칸성베드로대성당"
    ]},
    {name:"한국 음식",words:[
      "김치","비빔밥","불고기","삼겹살","갈비","잡채","냉면","된장찌개","김밥",
      "떡볶이","순두부찌개","만두","파전","설렁탕","감자탕","부대찌개","갈비탕",
      "칼국수","비지찌개","콩나물국밥","해장국","물회","회덮밥","쌈밥","보쌈",
      "족발","쫄면","막국수","불닭","라볶이","주먹밥","김치전","감자전","새우탕",
      "순대","어묵","호떡","붕어빵","팥빙수","경단","모찌","카스테라","약과",
      "한과","떡국","만둣국","소고기무국","미역국","북엇국","된장국","고추장",
      "간장게장","양념게장","곱창","대창","막창","삼계탕","닭볶음탕","추어탕",
      "홍합탕","해물탕","김치찌개","청국장","동태찌개","육개장","떡만두국"
    ]},
    {name:"세계 음식",words:[
      "피자","파스타","초밥","사시미","라면","우동","소바","타코","부리토","퀘사디야",
      "파에야","리스토토","라자냐","스테이크","햄버거","핫도그","케밥","팔라펠",
      "후무스","카레","난","버터치킨","사모사","짜장면","짬뽕","탕수육","마라탕",
      "훠궈","포","반미","나시고랭","사테","락사","나시르막","차슈","교자",
      "딤섬","샤오롱바오","만두","티라미수","크레페","마카롱","크로와상","바게트",
      "파블로바","치즈케이크","초코케이크","도넛","와플","팬케이크","에그타르트",
      "파이에야","토마토수프","미네스트로네","보르시치","가스파초","포르투","타진",
      "커스크스","페투치니","스파게티","라비올리","김밥","오니기리","돈부리",
      "비리야니","도사","파니르","달","라씨","팟타이","똠얌꿍","그린커리",
      "마사만커리","수블라키","무사카","바클라바","돌마"
    ]},
        {name:"드라마 - 1980~1990년대", words:[
      "모래시계","여명의눈동자","사랑이뭐길래","첫사랑","질투","마지막승부","한지붕세가족","전원일기","서울의달","프로포즈",
      "별은내가슴에","젊은이의양지","미스터큐","파일럿","그대그리고나","사랑과야망","사랑을그대품안에","허준","왕과비","용의눈물",
      "카이스트","순풍산부인과","청춘의덫","형제의강","은실이","토마토","웨딩드레스","마지막장면","의가형제","짝",
      "사랑을위하여","백마고지","남자는외로워","사랑밖에는난몰라","백야3.98","옥이이모","일요일은즐거워","대추나무사람걸렸네","사랑이꽃피는나무","여자셋남자셋",
      "도시남자","신고합니다","남자셋여자셋","사랑의짐","이상한여행","사랑의원","사랑의리퀘스트","사랑의기쁨","세친구","사랑을그대품안에리메이크"
    ]},
    {name:"드라마 - 2000년대", words:[
      "겨울연가","가을동화","풀하우스","파리의연인","미안하다사랑한다","내이름은김삼순","궁","대장금","천국의계단","올인",
      "발리에서생긴일","황진이","눈의여왕","커피프린스1호점","아이리스","연애시대","베토벤바이러스","꽃보다남자","선덕여왕","이산",
      "주몽","외과의사봉달희","내조의여왕","온에어","바람의화원","태왕사신기","일지매","쾌도홍길동","뉴하트","환상의커플",
      "프라하의연인","그들이사는세상","고맙습니다","불멸의이순신","해신","타짜","에덴의동쪽","스포트라이트","불새","내생애마지막스캔들",
      "돌아온일지매","친구우리들의전설","홍자매의쾌걸춘향","봄의왈츠","베이비페이스미남","쩐의전쟁","로비스트","쩐의전쟁2","달자의봄","탐나는도다"
    ]},
    {name:"드라마 - 2010년대", words:[
      "시크릿가든","뿌리깊은나무","해를품은달","응답하라1997","응답하라1994","미생","피노키오","킬미힐미","프로듀사","도깨비",
      "태양의후예","시그널","또오해영","비밀의숲","슬기로운감빵생활","미스터션샤인","나의아저씨","라이브","스카이캐슬","호텔델루나",
      "킹덤","동백꽃필무렵","괜찮아사랑이야","너의목소리가들려","구르미그린달빛","육룡이나르샤","닥터스","보이스","하늘에서내리는일억개의별","라이어게임",
      "검법남녀","비밀의문","로맨스는별책부록","그녀는예뻤다","김비서가왜이럴까","W","아는와이프","응답하라1988","치즈인더트랩","구해줘",
      "낭만닥터김사부","푸른바다의전설","하이에나","블랙독","청춘시대","지정생존자","보좌관","마더","신의선물14일","달의연인"
    ]},
    {name:"드라마 - 2020년대", words:[
      "이태원클라쓰","슬기로운의사생활","스위트홈","철인왕후","빈센조","마인","오월의청춘","런온","더킹:영원의군주","도시남녀의사랑법",
      "이상한변호사우영우","더글로리","재벌집막내아들","일타스캔들","퀸메이커","무빙","DP","괴물","스물다섯스물하나","환혼",
      "오징어게임","지금우리학교는","나의해방일지","유미의세포들","경이로운소문","경이로운소문2","마스크걸","눈물의여왕","킹더랜드","소년시대",
      "사랑의불시착","모범택시","모범택시2","경찰수업","악의마음을읽는자들","이브","낮과밤","멜랑꼴리아","빅마우스","조선구마사",
      "행복배틀","모범형사","모범형사2","원더우먼","마우스","구경이","안나","링크","슈룹","헌트리"
    ]},
    {name:"영화 - 디즈니/픽사", words:[
      "인사이드아웃","인사이드아웃2","겨울왕국","겨울왕국2","라푼젤","모아나","주토피아","토이스토리","토이스토리2","토이스토리3",
      "토이스토리4","코코","업","소울","빅히어로","몬스터주식회사","몬스터대학교","니모를찾아서","도리를찾아서","월-E",
      "인크레더블","인크레더블2","카","카2","카3","벅스라이프","온워드","루카","턴레드","엘리멘탈",
      "라야와마지막드래곤","주먹왕랄프","주먹왕랄프2","공주와개구리","알라딘(애니)","알라딘(실사)","라이온킹(애니)","라이온킹(실사)","뮬란(애니)","뮬란(실사)",
      "미녀와야수(애니)","미녀와야수(실사)","정글북(애니)","정글북(실사)","덤보(애니)","덤보(실사)","포카혼타스","헤라클레스","타잔","노틀담의꼽추"
    ]},
    {name:"영화 - 액션", words:[
      "미션임파서블","미션임파서블2","미션임파서블3","미션임파서블:고스트프로토콜","미션임파서블:로그네이션","미션임파서블:폴아웃","007카지노로얄","007스카이폴","007스펙터","007노타임투다이",
      "분노의질주","분노의질주더세븐","존윅","존윅2","존윅3","존윅4","다이하드","킬빌","더레이드","매드맥스:분노의도로",
      "어벤져스","어벤져스:에이지오브울트론","어벤져스:인피니티워","어벤져스:엔드게임","캡틴아메리카:윈터솔져","캡틴아메리카:시빌워","아이언맨","아이언맨2","아이언맨3","토르:라그나로크",
      "블랙팬서","스파이더맨:홈커밍","스파이더맨:파프롬홈","스파이더맨:노웨이홈","로건","데드풀","데드풀2","인셉션","테넷","다크나이트",
      "다크나이트라이즈","킹스맨:시크릿에이전트","킹스맨:골든서클","올드가드","익스트랙션","홉스앤쇼","트랜스포머","트랜스포머3","트랜스포머:비스트의서막","맨오브스틸"
    ]},
    {name:"영화 - 스릴러/범죄", words:[
      "세븐","파이트클럽","메멘토","셔터아일랜드","곡성","추격자","살인의추억","악마를보았다","올드보이","아가씨",
      "범죄와의전쟁","신세계","범죄도시","범죄도시2","범죄도시3","범죄도시4","내부자들","부당거래","더유주얼서스펙트","프리즈너스",
      "조디악","나이브스아웃","나이브스아웃2","용의자X의헌신","공공의적","공공의적2","타짜","도둑들","방황하는칼날","끝까지간다",
      "살인자의기억법","숨바꼭질","비열한거리","범죄의재구성","세븐데이즈","테이큰","테이큰2","테이큰3","본아이덴티티","본슈프리머시",
      "본얼티메이텀","나를찾아줘","컨테이젼","서치","맨헌트","추격자2","콜드체이싱","악질경찰","공작","강철비"
    ]},
    {name:"영화 - 로맨스/드라마", words:[
      "라라랜드","노트북","어바웃타임","원데이","브리짓존스의일기","러브액츄얼리","미비포유","비포선라이즈","비포선셋","비포미드나잇",
      "타이타닉","포레스트검프","쇼생크탈출","원스","그린북","굿윌헌팅","피아니스트","히든피겨스","레미제라블","맘마미아",
      "문라이트","콜미바이유어네임","바닷마을다이어리","사울의아들","캐롤","피아노","바벨","블루재스민","매치포인트","인턴",
      "브루클린","이터널선샤인","500일의썸머","그녀","행복을찾아서","바이올렛에버가든극장판","작은아씨들(2019)","원더","스팅","그랜드부다페스트호텔",
      "인생은아름다워","카사블랑카","바람과함께사라지다","해피투게더","그 시절, 우리가 좋아했던 소녀","러브레터","중경삼림","하울의움직이는성","센과치히로의행방불명","마녀배달부키키"
    ]},
    {name:"영화 - SF/판타지", words:[
      "인터스텔라","인셉션","테넷","매트릭스","매트릭스2","매트릭스3","매트릭스레저렉션","블레이드러너2049","블레이드러너","어라이벌",
      "그래비티","마션","가디언즈오브갤럭시","가디언즈오브갤럭시2","듄","듄2","스타워즈:새로운희망","스타워즈:제국의역습","스타워즈:제다이의귀환","로그원",
      "스타워즈:포스의각성","스타워즈:라스트제다이","스타워즈:라이즈오브스카이워커","해리포터와마법사의돌","해리포터와비밀의방","해리포터와아즈카반의죄수","해리포터와불의잔","해리포터와불사조기사단","해리포터와혼혈왕자","해리포터와죽음의성물",
      "반지의제왕:반지원정대","반지의제왕:두개의탑","반지의제왕:왕의귀환","호빗:뜻밖의여정","호빗:스마우그의폐허","호빗:다섯군대전투","닥터스트레인지","앤트맨","앤트맨와스프","엑스마키나",
      "루시","설국열차","업그레이드","프레데터","에일리언","에일리언2","트론:레거시","레디플레이어원","고스트버스터즈","파시픽림"
    ]},
    {name: "한국영화", words: [
      "기생충","올드보이","부산행","엑시트","극한직업","타짜","친절한금자씨","괴물","살인의추억","공기놀이",
      "베테랑","도둑들","암살","광해","왕의남자","태극기휘날리며","실미도","쉬리","공동경비구역JSA","좋은놈나쁜놈이상한놈",
      "설국열차","변호인","관상","7번방의선물","명량","국제시장","아가씨","곡성","추격자","악마를보았다",
      "신과함께","밀정","베를린","마더","하울링","남산의부장들","사도","택시운전사","1987","내부자들",
      "미쓰백","봉오동전투","PMC:더벙커","스윙키즈","악인전","돈","범죄도시","오션스","미션파서블","승리호",
      "파괴된사나이","헌트","비상선언","모가디슈","자백","헤어질결심"
    ]},
    {name: "소설", words: [
      "해리포터","반지의제왕","호빗","1984","동물농장","멋진신세계","파우스트","돈키호테","오만과편견","제인에어",
      "폭풍의언덕","위대한개츠비","호밀밭의파수꾼","데미안","젊은베르테르의슬픔","죄와벌","카라마조프가의형제들","전쟁과평화","안나카레니나","백년의고독",
      "마음","채식주의자","82년생김지영","파친코","아몬드","달콤한나의도시","미움받을용기","종의기원","이기적유전자","사피엔스",
      "호모데우스","노르웨이의숲","1Q84","해변의카프카","상실의시대","태엽감는새","데미안","변신","성","오만과편견",
      "프랑켄슈타인","드라큘라","모비딕","올리버트위스트","위대한유산","셜록홈즈","앵무새죽이기","캐치22","시계태엽오렌지","샤이닝",
      "미드나잇라이브러리","책도둑","연금술사","깃털없는새","구의증명","달러구트꿈백화점","소피의선택"
    ]},
        {name: "비디오 게임 - 액션 & 어드벤처", words: [
      "데빌메이크라이5(데메크5)", "그랜드테프트오토V(GTA5)", "어쌔신크리드 발할라(어크 발할라)", "갓 오브 워", "베요네타3",
      "컨트롤", "세키로", "몬스터 헌터 월드(몬헌 월드)", "스파이더맨 마일즈 모랄레스", "히트맨3",
      "다잉 라이트2", "배트맨 아캄 나이트", "파크라이6", "저스트 코즈4", "블랙미스 우쿵",
      "산나비", "데이브 더 다이버", "섀도 오브 툼레이더(툼레이더)", "둠 이터널", "사이버펑크2077", "레지던트 이블4 리메이크", "라스트 오브 어스 파트2(라오어2)",
      "언차티드4", "라이프 이즈 스트레인지", "젤다의 전설 브레스 오브 더 와일드(젤다 BOTW)", "호라이즌 포비든 웨스트", "아우터 와일드", "고스트 오브 쓰시마",
      "레드 데드 리뎀션2(레데리2)", "사이버쇼크2", "디트로이트 비컴 휴먼(디트로이트)", "텔테일 워킹데드(워킹데드)", "파이어워치", "Sable(세이블)", "투 더 문",
      "고로고아", "러스티 레이크", "어 스페이스 포 더 언바운드", "셜록 홈즈 챕터 원", "케나", "이터널 스트랜드", "켄터키 루트 제로", "디스코 엘리시움",
      "어쌔신크리드 오디세이(어크 오디세이)", "미러스 엣지 카탈리스트(미러스 엣지)", "컵헤드", "홀로우 나이트", "오리 앤 더 윌 오브 더 위스프(오리)", "그리스",
      "타이탄폴2", "스트레이", "블러드본", "데드셀즈(데드셀)", "하데스", "젤다의 전설 티어스 오브 더 킹덤(젤다 TOTK)", "프린스 오브 페르시아", "고스트러너", "컨커러스 블레이드"
    ]},
    {name: "비디오 게임 - RPG & 전략", words: [
      "위쳐3 와일드 헌트(위쳐3)", "엘든링", "파이널 판타지16(파판16)", "발더스 게이트3", "드래곤 퀘스트11(드퀘11)", "스카이림",
      "폴아웃4", "페르소나5", "마블 스파이더맨2(스파이더맨2)", "스타필드", "드래곤즈 도그마2", "디아블로4", "매스 이펙트", "사우스 오브 미드나잇", "파이널 판타지7 리버스(파판7 리버스)",
      "크로노 트리거", "종의 기원", "메탈기어 솔리드 델타", "포켓몬 레전드 ZA", "크로노스 더 뉴돈", "문명7", "에이지 오브 엠파이어4", "스타크래프트2(스타2)",
      "프로스트펑크2", "컴퍼니 오브 히어로즈3", "토탈워 워해머3", "XCOM2(엑스컴2)", "스텔라리스", "크루세이더 킹스3", "시티즈 스카이라인2",
      "시드마이어의 문명(문명)", "배틀테크", "셀레스티얼 엠파이어", "워해머 40000 돈 오브 워", "드릴코어", "아이슬란더스 뉴 쇼어스(아이슬란더스)",
      "호드 오브 헝거", "킹메이커스", "임페리얼", "마운트 앤 블레이드2", "파라독스 인터랙티브(파라독스)", "히어로즈 오브 마이트 앤 매직",
      "신세기 사이버", "니노쿠니2", "옥토패스 트래블러2", "트라이앵글 스트래티지", "파이어 엠블렘", "디비니티 오리지널 신2(디비니티 OS2)",
      "패스파인더", "워프레임", "몬스터 헌터 라이즈(몬헌 라이즈)", "드래곤 에이지", "바이오뮤턴트", "아우터 월드", "토먼트"
    ]},
    {name: "비디오 게임 - 슈터 & 배틀로얄", words: [
      "콜 오브 듀티 모던 워페어3(콜옵 MW3)", "헬다이버스2", "발로란트", "카운터 스트라이크2(카스2)", "마블 라이벌즈", "둠", "헤일로 인피니트",
      "에이펙스 레전드(에이펙스)", "오버워치2", "포트나이트", "레인보우 식스 시즈(레식)", "데스티니2", "배틀필드6", "파이널스", "킬링 플로어3",
      "마인드아이", "ARC 레이더스", "페인킬러", "바이오하자드 빌리지", "콰이어트 플레이스", "콜 오브 듀티 워존(워존)", "PUBG 배틀그라운드(배그)",
      "폴가이즈", "포켓몬 유나이트", "나라카", "슈퍼 애니멀 배틀로얄", "배틀라이트 로얄",
      "헌트 쇼다운", "CRSED", "배틀필드 2042", "킹 오브 더 힐", "스펠브레이크", "프리파이어", "사이클 러너츠",
      "배틀로얄 파이어포스", "토탈리 액큐레이트 배틀그라운드(TABS BR)", "큐비드 배틀로얄", "Z1 배틀로얄", "스플리트게이트", "백4블러드",
      "레프트 4 데드(레포데)", "보더랜드3", "파크라이 뉴 던", "데스루프", "리터널", "오버킬스 워킹데드", "팀 포트리스2(팀포2)",
      "디비전2", "고스트리콘 브레이크포인트", "스나이퍼 엘리트5", "월드 워Z", "퀘이크 챔피언스", "언리얼 토너먼트"
    ]},
    {name: "비디오 게임 - 스포츠 & 퍼즐", words: [
      "FIFA26", "NBA 2K26", "매든 NFL26", "마리오 카트", "토니 호크 프로 스케이터3(토니호크3)", "PGA 투어 2K25", "WWE 2K25", "MLB 더 쇼25",
      "스트리트 파이터6", "럭비25", "모토GP25", "모바일 슈트 건담 씨드", "피파온라인4", "EA 스포츠 FC26", "버추어 파이터5",
      "골든 티 아케이드 클래식", "앰뷸런스 라이프", "카워시 타이쿤", "마리오 테니스", "NHL25", "포탈2", "테트리스 이펙트",
      "더 위트니스", "월드 오브 구", "휴먼 폴 플랫", "고로고아", "러스티 레이크 파라독스", "탈로스 프린시플", "페즈", "앤티챔버",
      "브레이드", "포가틀링스", "트레인 밸리 오리진스", "모뉴먼트 밸리3", "로마산 드리빌드", "비주얼드3", "캔디 크러쉬 사가", "퍼즐앤드래곤",
      "에스케이프 시뮬레이터", "더 룸", "퍼즐 퀘스트", "루미너스", "지오메트리 대시", "스페이스켐",
      "피시 파일럿", "포탈 브릿지 컨스트럭터", "앵그리버드", "컷 더 로프", "플랜츠 vs 좀비", "리모", "리틀 나이트메어",
      "슈퍼 리모 월드", "포르탈 크래프트", "플라이트 컨트롤", "몬스터 퍼즐"
    ]},
    {name:"패션·의류",words:[
      "셔츠","티셔츠","청바지","정장","드레스","치마","반바지","자켓","패딩","코트","후드티","맨투맨","가디건","니트","블라우스","조끼","점퍼","레깅스","운동복","잠옷",
      "속옷","양말","스타킹","모자","야구모","비니","선캡","버킷햇","스카프","목도리","장갑","벨트","넥타이","손목시계","귀걸이","목걸이","팔찌","반지","헤어밴드","헤어핀",
      "샌들","슬리퍼","운동화","구두","부츠","로퍼","하이힐","플랫슈즈","크록스","워커","타이츠","레인코트","풍덩부츠","더플코트","카라티","폴로셔츠","집업","트렌치코트",
      "브라","브래지어","보넷","캐미솔","튜닉","롱코트","롱스커트","미니스커트","멜빵바지","점프수트","트레이닝복","바람막이","야상","치노팬츠","슬랙스","카고팬츠","조거팬츠"
    ]},
    {name:"음악 장르·악기",words:[
      "발라드","팝","록","메탈","재즈","블루스","R&B","힙합","랩","트로트","EDM","하우스","테크노","댄스","포크","컨트리","레게","소울","오페라","클래식",
      "피아노","바이올린","기타","베이스","드럼","플루트","클라리넷","색소폰","트럼펫","트롬본","하프","오보에","튜바","리코더","우쿨렐레","만돌린","아코디언","마림바","탬버린","캐스터네츠",
      "심벌즈","트라이앵글","콘트라베이스","카혼","팀파니","전자키보드","신디사이저","오르간","피콜로","팬플루트","벤조","슬라이드기타","바순","첼로","콘가","봉고","드럼머신","일렉기타","어쿠스틱기타","플랫맨드린",
      "비브라폰","글로켄슈필","크라리넷","플루골혼","나팔","탕고아코디언","모듈신스","웨이브드럼","핸드팬","실로폰"
    ]},
    {name:"과학·기술 용어",words:[
      "원자","분자","전자","양성자","중성자","중력","빛","파동","음파","전류","전압","저항","회로","자석","자기장","화학반응","산소","이산화탄소","질소","수소",
      "행성","위성","혜성","소행성","은하","블랙홀","빅뱅","인공위성","로봇","드론","인공지능","머신러닝","코딩","프로그래밍","알고리즘","데이터","바이러스","박테리아","유전자",
      "DNA","RNA","백신","세포","미토콘드리아","광합성","기후변화","온실가스","재생에너지","태양광","풍력","수력","우주정거장","광속","상대성이론","양자역학","전자기파","마찰력","원심력","중력파",
      "자연선택","진화","멸종","화석","반도체","트랜지스터","집적회로","마이크로칩","슈퍼컴퓨터","클라우드","증강현실","가상현실","블록체인","3D프린팅","유비쿼터스","나노기술","광섬유","전기자동차","배터리","리튬이온"
    ]},
    {name:"취미·여가",words:[
      "등산","낚시","독서","영화감상","음악감상","사진찍기","그림그리기","캘리그라피","자전거타기","조깅","달리기","헬스","요가","필라테스","수영","서핑","스키","보드타기",
      "볼링","당구","배드민턴","탁구","캠핑","차박","여행","맛집탐방","베이킹","요리","뜨개질","재봉","퍼즐맞추기","보드게임","카드게임","비디오게임","드론날리기","원예","식물키우기","도예","레고조립","모형만들기",
      "사격","승마","글라이딩","패러글라이딩","스쿠버다이빙","스노클링","산책","낙하산","암벽등반","서바이벌게임","페인트볼","요트타기","스케이트","인라인","빙상","빙어낚시","사파리","야생동물관찰","철새탐조","천체관측"
    ]},
    {name:"자연·환경",words:[
      "산","강","바다","호수","폭포","동굴","사막","초원","정글","숲","빙하","화산","협곡","섬","반도","대양","바위","계곡","언덕","평야",
      "무지개","태풍","태양","달","별","은하수","구름","비","눈","우박","안개","번개","천둥","태양광","일식","월식","오로라","파도","조류","간조","만조",
      "사계절","봄","여름","가을","겨울","이끼","고사리","야자수","소나무","단풍","벚꽃","매화","해바라기","장미","튤립","코스모스","백합","연꽃","선인장","잡초"
    ]},
    {name:"명절·기념일",words:[
      "설날","추석","크리스마스","한글날","광복절","어린이날","부처님오신날","석가탄신일","개천절","현충일","신정","구정","밸런타인데이","화이트데이","블랙데이","스승의날","어버이날","할로윈","추수감사절","연휴",
      "결혼기념일","생일","돌잔치","졸업식","입학식","환갑","칠순","팔순","퇴임식","입사기념일","성탄절","부활절","종교기념일","국경일","세계환경의날","세계보건의날","지구의날","여성의날","노인의날","스승감사주간",
      "가정의달","문화의날","도서관의날","영웅추모일","독립기념일","해군의날","군인의날","노동절","방학식","개학식","중간고사","기말고사","체육대회","운동회","음력설","정월대보름","삼일절","식목일","방정환탄신일"
    ]},
    {name: "마블 히어로", words: [
      "아이언맨","캡틴 아메리카","토르","블랙 위도우","스파이더맨","헐크","호크아이",
      "닥터 스트레인지","앤트맨","와스프","블랙 팬서","스칼렛 위치","퀵실버","팔콘","윈터 솔져(버키)",
      "스타로드","가모라","드랙스","로켓","그루트","네뷸라","맨티스","닉 퓨리","마리아 힐","워 머신",
      "샹치","캡틴 마블","에인션트 원","발키리","코르그","헤임달","로키","오딘","호건","볼스타그","판드랄",
      "울트론","타노스","에보니 모","프록시마 미드나이트","컬 옵시디언","코르버스 글레이브","모독(M.O.D.O.K)",
      "레드 스컬","제모 남작","고스트","타스크마스터","미즈 마블","문 나이트","에코",
      "데어데블","제시카 존스","루크 케이지","아이언 피스트","퍼니셔","고스트 라이더","블레이드",
      "노바","실버 서퍼","아담 워록","비전","하워드 덕","아마데우스 조","아메리카 차베즈"
    ]},
    {name: "가전제품", words: [
      "냉장고","세탁기","건조기","청소기","전자레인지","오븐","토스터","커피머신","에어컨","선풍기",
      "온풍기","가습기","제습기","공기청정기","믹서기","블렌더","전기밥솥","전기포트","식기세척기","인덕션레인지",
      "가스레인지","전기그릴","전기오븐","에어프라이어","전기난로","스팀다리미","핸드청소기","로봇청소기","전동칫솔","전기면도기",
      "헤어드라이어","고데기","전기히터","전기방석","전기매트","온수매트","비데","정수기","탄산수제조기","빙수기",
      "와플메이커","토스터오븐","전기팬","전기후라이팬","전기냄비","푸드프로세서","전기찜기","에스프레소머신","전기티포트","전자노트",
      "프로젝터","TV","모니터","사운드바","홈시어터","DVD플레이어","블루레이플레이어","라디오","턴테이블","카세트플레이어",
      "MP3플레이어","게임콘솔","VR헤드셋","스마트워치","태블릿","스마트폰","노트북","데스크탑","프린터","스캐너"
    ]},
    {name:"마인크래프트 블록",words:[
      "뒤틀린 뿌리","수련잎","벚나무 묘목","갈색 양털","청록색 색유리","보라색 콘크리트","다이아몬드 광석","불우렁쉥이",
      "파란색 유광 테라코타","독서대","산호","파란색 양털","분홍색 튤립","포자 꽃","밝은 파란색 색유리 판","노란색 양털",
      "아카시아나무","자홍색 유광 테라코타","호박씨","대나무 블록","자홍색 색유리","청록색 콘크리트 가루","수박씨","벚나무 잎",
      "키 큰 잔디","햇빛 감지기","석재 절단기","검은색 양탄자","퇴비통","분홍색 콘크리트","공급기","네더랙","눈망울꽃",
      "참나무","꽃 핀 진달래","마른 잔디","엔드 수정","주황색 테라코타","분홍색 테라코타","흘림잎","주황색 양탄자","소리 블록",
      "뒤틀린 네사체","초록색 콘크리트","자갈","점적석 블록","뜬 눈망울꽃","수레국화","모란","창백한 참나무 묘목","진달래",
      "분홍색 콘크리트 가루","갈색 색유리","빨간색 튤립","비트 씨앗","분홍색 유광 테라코타","작은 흘림잎","전달체",
      "밝은 파란색 양탄자","연두색 유광 테라코타","마른 가스트","보강된 심층암","정글나무 잎","대장장이 작업대","노란색 색유리 판",
      "연두색 테라코타","진흙 벽돌","파란색 콘크리트 가루","초록색 색유리 판","밝은 회색 콘크리트","주황색 콘크리트","켈프",
      "개구리불","흙","갈색 테라코타","자석석","짙은 참나무 잎","짙은 참나무","묘목","선인장","맹그로브나무 주아","하얀색 유광 테라코타",
      "버섯 자루","싹 틔우는 자수정","밝은 회색 양털","철 광석","네더 벽돌","코코아 콩","초록색 유광 테라코타","스컬크 감지체",
      "검은색 색유리 판","횃불꽃","벌레잡이풀","마법 부여대","큰 고사리","영혼 흙","이끼 바닥","자홍색 색유리 판","검은색 콘크리트",
      "노란색 테라코타"
    ]},
  ];

  /** @type {{
    teams: {id:string,name:string,score:number,rounds:number}[],
    activeTeamId: string|null,
    categories: {id:string,name:string,words:string[]}[],
    usedCategoryIds: string[],
    settings: { roundSeconds:number, blockUsedCategoryOnEnd:boolean, hideUsedCategories:boolean, autoScoreOnCorrect:boolean },
    version:number
  }} */
  let state;

  function uid(p='id'){
    return p + '_' + Math.random().toString(36).slice(2,10) + '_' + Date.now().toString(36);
  }

  function loadState(){
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      try {
        const obj = JSON.parse(raw);
        state = obj;
        if(state.settings && typeof state.settings.autoScoreOnCorrect === 'undefined'){
          state.settings.autoScoreOnCorrect = true;
        }
        // ensure rounds property exists for teams loaded from older state
        state.teams?.forEach(t=>{ if(typeof t.rounds !== 'number') t.rounds = 0; });
        return;
      }catch(e){}
    }
    state = {
      teams: [],
      activeTeamId: null,
      categories: DEFAULT_CATEGORIES.map(c=>({id:uid('cat'), name:c.name, words:[...c.words]})),
      usedCategoryIds: [],
      settings: { roundSeconds:60, blockUsedCategoryOnEnd:true, hideUsedCategories:false, autoScoreOnCorrect:true },
      version: 2
    };
    saveState();
  }

  function saveState(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function hardReset(){
    localStorage.removeItem(STORAGE_KEY);
    loadState();
    renderAll();
  }

  // ----- 유틸 -----
  function $(sel){return document.querySelector(sel)}
  function el(tag, attrs={}, ...children){
    const e = document.createElement(tag);
    for(const [k,v] of Object.entries(attrs||{})){
      if(k==='class') e.className = v;
      else if(k==='dataset') { for (const [dk,dv] of Object.entries(v)) e.dataset[dk]=dv; }
      else if(k==='html') e.innerHTML = v;
      else if(k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for(const c of children){
      if (c==null) continue;
      e.appendChild(typeof c==='string'? document.createTextNode(c) : c);
    }
    return e;
  }

  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }

  // ----- 화면 전환 -----
  const screens = {
    catScreen: $('#catScreen'),
    gameScreen: $('#gameScreen'),
    settingsScreen: $('#settingsScreen')
  };
  const tabButtons = document.querySelectorAll('nav.tabs button');
  function showScreen(id){
    Object.values(screens).forEach(s=>s.classList.add('hidden'));
    screens[id]?.classList.remove('hidden');
    tabButtons.forEach(btn=>btn.classList.toggle('active', btn.dataset.screen===id));
  }
  tabButtons.forEach(btn=>btn.addEventListener('click', ()=>showScreen(btn.dataset.screen)));

  // ----- 렌더링: 카테고리 -----
  const catList = $('#catList');
  let selectedCategoryId = null;

  function renderCategories(){
    catList.innerHTML = '';
    const hideUsed = state.settings.hideUsedCategories;
    for(const c of state.categories){
      const used = state.usedCategoryIds.includes(c.id);
      if(hideUsed && used) continue;
      const row = el('div',{class:'cat'+(used?' locked':''), dataset:{cid:c.id}});
      const radio = el('input',{type:'radio', name:'catpick', class:'radio', disabled:used?'':null});
      radio.checked = (selectedCategoryId===c.id) && !used;
      radio.addEventListener('change', ()=>{ selectedCategoryId = c.id; updateStartBtnState(); });
      const name = el('div',{}, el('div',{style:'font-weight:800'}, c.name), el('div',{class:'mutetext small'}, `${c.words.length} 제시어`));
      const right = el('div',{}, used? el('span',{class:'badge'},'사용됨') : el('span',{class:'badge'},'사용 가능'));
      row.appendChild(radio);
      row.appendChild(name);
      row.appendChild(right);
      row.addEventListener('click', (e)=>{
        if(used) return;
        radio.checked = true;
        selectedCategoryId = c.id;
        updateStartBtnState();
        showScreen('gameScreen');
      });
      catList.appendChild(row);
    }
  }

  function resetUsedCategories(){
    state.usedCategoryIds = [];
    saveState();
    renderCategories();
  }

  function resetScores(){
    state.teams.forEach(t=>{
      t.score = 0;
      t.rounds = 0;
    });
    saveState();
    renderTeams();
  }

  // ----- 팀 & 점수 -----
  const board = $('#scoreboard');
  function addTeam(name){
    if(!name) return;
    const t = {id:uid('team'), name, score:0, rounds:0};
    state.teams.push(t);
    if(!state.activeTeamId) state.activeTeamId = t.id;
    saveState();
    renderTeams();
  }
  function setActiveTeam(id){
    if(round.running) return;
    state.activeTeamId = id;
    saveState();
    renderTeams();
  }
  function incScore(id, delta){
    const t = state.teams.find(t=>t.id===id);
    if(!t) return;
    t.score += delta;
    if(t.score<0) t.score=0;
    saveState();
    renderTeams();
  }
  function removeTeam(id){
    const idx = state.teams.findIndex(t=>t.id===id);
    if(idx>=0){
      state.teams.splice(idx,1);
      if(state.activeTeamId===id) state.activeTeamId = state.teams[0]?.id||null;
      saveState(); renderTeams();
    }
  }
  function nextTeam(){
    if(!state.activeTeamId || state.teams.length===0) return;
    const i = state.teams.findIndex(t=>t.id===state.activeTeamId);
    const next = state.teams[(i+1)%state.teams.length];
    if(next) setActiveTeam(next.id);
  }

  function renderTeams(){
    board.innerHTML='';
    for(const t of state.teams){
      const card = el('div',{class:'team'+(t.id===state.activeTeamId?' active':''), dataset:{tid:t.id}});
      const name = el('div',{class:'name'}, t.name);
      const score = el('div',{class:'score'}, String(t.score));
      const rounds = el('div',{class:'rounds'}, `라운드: ${t.rounds||0}`);
      const controls = el('div',{class:'controls'},
        el('button',{onClick:()=>incScore(t.id,-1)},'−1'),
        el('button',{onClick:()=>incScore(t.id,+1)},'+1'),
        el('button',{class:'ghost', onClick:()=>removeTeam(t.id)},'팀 삭제')
      );
      card.appendChild(name);
      card.appendChild(score);
      card.appendChild(rounds);
      card.appendChild(controls);
      card.addEventListener('click', (e)=>{
        if(e.target.tagName==='BUTTON') return;
        setActiveTeam(t.id);
      });
      board.appendChild(card);
    }
    // hide next-team button when not needed
    if(btnNextTeam){
      btnNextTeam.style.display = state.teams.length>1 ? '' : 'none';
    }
    updateStartBtnState();
  }

  // ----- 라운드 진행 -----
  const bigWord = $('#bigWord');
  const timeRemain = $('#timeRemain');
  const btnStart = $('#btnStart');
  const btnPause = $('#btnPause');
  const btnEnd = $('#btnEnd');
  const btnPass = $('#btnPass');
  const btnCorrect = $('#btnCorrect');
  const btnUndo = $('#btnUndo');
  const btnNextTeam = $('#btnNextTeam');
  const roundSecondsInput = $('#roundSeconds');

  function fitBigWord(){
    bigWord.style.fontSize = '';
    const container = bigWord.parentElement;
    const style = getComputedStyle(container);
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const maxWidth = container.clientWidth - padding;
    let size = parseFloat(getComputedStyle(bigWord).fontSize);
    while(bigWord.scrollWidth > maxWidth && size > 16){
      size -= 2;
      bigWord.style.fontSize = size + 'px';
    }
  }

  window.addEventListener('resize', fitBigWord);

  let round = {
    running:false,
    paused:false,
    startAt:0,
    endAt:0,
    leftMs:0,
    timerId:null,
    categoryId:null,
    words:[],
    wordIndex:-1,
    correct:0,
    pass:0,
    correctWords:[],
    passedWords:[],
    actionStack:[]
  };

  function updateStartBtnState(){
    const hasTeam = state.teams.length===0 || !!state.activeTeamId;
    const hasCat = !!selectedCategoryId && !state.usedCategoryIds.includes(selectedCategoryId);
    btnStart.disabled = !(hasTeam && hasCat && !round.running);
  }

  function pickNextWord(){
    if(round.words.length===0){
      bigWord.textContent = '제시어가 없습니다 (카테고리 수정 필요)';
      fitBigWord();
      return;
    }
    round.wordIndex = (round.wordIndex+1) % round.words.length;
    bigWord.textContent = round.words[round.wordIndex];
    fitBigWord();
  }

  function startRound(){
    if(round.running) return;
    if(state.teams.length>0 && !state.activeTeamId){
      alert('활성 팀을 선택하세요.');
      return;
    }
    if(!selectedCategoryId || state.usedCategoryIds.includes(selectedCategoryId)){
      alert('사용 가능한 카테고리를 선택하세요.');
      return;
    }
    showScreen('gameScreen');
    round.categoryId = selectedCategoryId;
    const cat = state.categories.find(c=>c.id===round.categoryId);
    round.words = shuffle([...cat.words]);
    round.wordIndex = -1;
    pickNextWord();
    round.correct = 0; round.pass = 0;
    round.correctWords = [];
    round.passedWords = [];
    round.actionStack = [];
    updateUndoState();

    const secs = clampSeconds(Number(roundSecondsInput.value)||60);
    state.settings.roundSeconds = secs;
    saveState();

    round.running = true; round.paused = false;
    round.startAt = Date.now();
    round.endAt = round.startAt + secs*1000;
    round.leftMs = secs*1000;
    btnStart.disabled = true;
    btnPause.disabled = false;
    btnEnd.disabled = false;
    btnPass.disabled = false;
    btnCorrect.disabled = false;
    btnUndo.disabled = true;
    btnNextTeam.disabled = true;
    tickTimer();
    round.timerId = setInterval(tickTimer, 100);
  }

  function clampSeconds(s){
    if(!Number.isFinite(s) || s<10) return 10;
    if(s>600) return 600;
    return Math.round(s);
  }

  function formatTime(ms){
    const s = Math.max(0, Math.ceil(ms/1000));
    return String(s);
  }

  function tickTimer(){
    if(!round.running || round.paused) return;
    const now = Date.now();
    round.leftMs = Math.max(0, round.endAt - now);
    timeRemain.textContent = formatTime(round.leftMs);
    const ratio = round.leftMs / (state.settings.roundSeconds*1000);
    $('#timerBar').style.background = `linear-gradient(90deg, rgba(96,211,148,.18) ${100-(ratio*100)}%, #12151d ${100-(ratio*100)}%)`;
    if(round.leftMs<=0){
      endRound(true);
    }
  }

  function pauseRound(){
    if(!round.running || round.paused) return;
    round.paused = true;
    clearInterval(round.timerId); round.timerId=null;
    btnPause.textContent = '재개';
  }

  function resumeRound(){
    if(!round.running || !round.paused) return;
    round.paused = false;
    round.endAt = Date.now() + round.leftMs;
    btnPause.textContent = '일시정지';
    round.timerId = setInterval(tickTimer, 100);
  }

  function endRound(timeup=false){
    if(!round.running) return;
    clearInterval(round.timerId); round.timerId=null;
    round.running=false; round.paused=false;
    btnStart.disabled=false; btnPause.disabled=true; btnEnd.disabled=true; btnPass.disabled=true; btnCorrect.disabled=true; btnNextTeam.disabled=false;
    btnUndo.disabled = true;
    round.actionStack = [];
    timeRemain.textContent = String(state.settings.roundSeconds);
    $('#timerBar').style.background='';
    $('#timerBar').style.color='';

    if(timeup){
      beep();
    }
    if(state.settings.blockUsedCategoryOnEnd && round.categoryId){
      if(!state.usedCategoryIds.includes(round.categoryId)){
        state.usedCategoryIds.push(round.categoryId);
        saveState();
        renderCategories();
      }
    }
    // increment round count for current team
    if(state.activeTeamId){
      const t = state.teams.find(t=>t.id===state.activeTeamId);
      if(t){ t.rounds = (t.rounds||0)+1; }
    }
    saveState();
    showSummary(timeup);
    nextTeam();
    showScreen('catScreen');
  }

  function afterAnswer(){
    if(round.correct + round.pass >= round.words.length){
      endRound(false);
    }else{
      pickNextWord();
    }
  }

  function updateUndoState(){
    btnUndo.disabled = round.actionStack.length===0;
  }

  function undoLastAction(){
    if(round.actionStack.length===0) return;
    const act = round.actionStack.pop();
    if(act.type==='pass'){
      if(round.pass>0) round.pass--;
      if(round.passedWords.length>0) round.passedWords.pop();
    }else if(act.type==='correct'){
      if(round.correct>0) round.correct--;
      if(round.correctWords.length>0) round.correctWords.pop();
      if(state.activeTeamId && state.settings.autoScoreOnCorrect){
        incScore(state.activeTeamId, -1);
      }
    }
    round.wordIndex = act.index;
    bigWord.textContent = act.word;
    fitBigWord();
    updateUndoState();
  }

  function onPass(){
    if(!round.running || round.paused) return;
    const w = round.words[round.wordIndex];
    const idx = round.wordIndex;
    round.pass++;
    if(w) round.passedWords.push(w);
    round.actionStack.push({type:'pass', word:w, index:idx});
    updateUndoState();
    afterAnswer();
  }
  function onCorrect(){
    if(!round.running || round.paused) return;
    const w = round.words[round.wordIndex];
    const idx = round.wordIndex;
    round.correct++;
    if(w) round.correctWords.push(w);
    if(state.activeTeamId && state.settings.autoScoreOnCorrect) incScore(state.activeTeamId, +1);
    round.actionStack.push({type:'correct', word:w, index:idx});
    updateUndoState();
    afterAnswer();
  }

  // 단순 비프음 생성
  function beep(){
    try{
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type='sine'; o.frequency.value=880;
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime+0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.4);
      o.start(); o.stop(ctx.currentTime+0.45);
    }catch(e){}
  }

  function showSummary(timeup){
    const dlg = $('#dlgSummary');
    const body = $('#summaryBody');
    const catName = state.categories.find(c=>c.id===round.categoryId)?.name || '(없음)';
    const correctList = round.correctWords.map(w=>escapeHtml(w)).join(', ') || '(없음)';
    const passList = round.passedWords.map(w=>escapeHtml(w)).join(', ') || '(없음)';
    body.innerHTML = `
      <div class="chips">
        <span class="chip">카테고리: ${escapeHtml(catName)}</span>
        <span class="chip">정답: ${round.correct}</span>
        <span class="chip">패스: ${round.pass}</span>
        <span class="chip">${timeup?'시간 종료':'강제 종료'}</span>
      </div>
      <div class="summary-words">
        <div><strong>정답:</strong> ${correctList}</div>
        <div><strong>패스:</strong> ${passList}</div>
      </div>
    `;
    dlg.showModal();
  }

  function escapeHtml(s){
    return (s??'').toString().replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  }

  // ----- 카테고리 편집 모달 -----
  const dlgCats = $('#dlgCats');
  const catEditor = $('#catEditor');

  function openCatEditor(){
    const exportable = state.categories.map(c=>({name:c.name, words:c.words}));
    catEditor.value = JSON.stringify(exportable, null, 2);
    dlgCats.showModal();
  }

  function saveFromEditor(){
    try{
      const parsed = JSON.parse(catEditor.value);
      if(!Array.isArray(parsed)) throw new Error('배열이 아닙니다.');
      const next = [];
      for(const item of parsed){
        if(!item || typeof item.name!=='string' || !Array.isArray(item.words)) throw new Error('형식 오류');
        const words = item.words.map(w=>String(w)).filter(w=>w.trim().length>0);
        if(words.length<50) throw new Error('각 카테고리는 50개 이상이어야 합니다.');
        next.push({id:uid('cat'), name:item.name, words});
      }
      state.categories = next;
      state.usedCategoryIds = [];
      saveState();
      selectedCategoryId = null;
      renderCategories();
      dlgCats.close();
    }catch(e){
      alert('파싱 실패: ' + e.message);
    }
  }

  function exportCats(){
    const data = state.categories.map(c=>({name:c.name, words:c.words}));
    const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download='speedquiz_categories.json'; a.click();
    URL.revokeObjectURL(url);
  }

  function importCats(){
    const inp = document.createElement('input');
    inp.type='file'; inp.accept='.json,application/json';
    inp.addEventListener('change', ()=>{
      const f = inp.files?.[0];
      if(!f) return;
      const r = new FileReader();
      r.onload = ()=>{
        catEditor.value = String(r.result||'');
      };
      r.readAsText(f,'utf-8');
    });
    inp.click();
  }

  // ----- 전체화면 -----
  function toggleFullscreen(){
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen?.();
    }else{
      document.exitFullscreen?.();
    }
  }

  // ----- 이벤트 바인딩 -----
  $('#btnAddTeam').addEventListener('click', ()=>{
    const name = $('#newTeamName').value.trim();
    if(name){ addTeam(name); $('#newTeamName').value=''; }
  });

  btnNextTeam.addEventListener('click', nextTeam);
  $('#btnStart').addEventListener('click', startRound);
  $('#btnPause').addEventListener('click', ()=>{
    if(!round.running) return;
    if(round.paused) resumeRound(); else pauseRound();
  });
  $('#btnEnd').addEventListener('click', ()=>endRound(false));
  $('#btnPass').addEventListener('click', onPass);
  $('#btnCorrect').addEventListener('click', onCorrect);
  $('#btnUndo').addEventListener('click', undoLastAction);
  document.addEventListener('keydown', (e)=>{
    if(e.code==='Space'){ e.preventDefault(); if(round.running){ onPass(); } }
    else if(e.code==='Enter'){ if(round.running){ onCorrect(); } }
    else if(e.key==='s' || e.key==='S'){ if(!round.running) startRound(); else $('#btnPause').click(); }
    else if(e.key==='f' || e.key==='F'){ toggleFullscreen(); }
  });

  $('#roundSeconds').addEventListener('change', ()=>{
    const s = clampSeconds(Number(roundSecondsInput.value)||60);
    roundSecondsInput.value = String(s);
    state.settings.roundSeconds = s; saveState();
    if(!round.running) timeRemain.textContent = String(s);
  });
  document.querySelectorAll('[data-preset]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const v = Number(btn.getAttribute('data-preset'));
      roundSecondsInput.value = v;
      roundSecondsInput.dispatchEvent(new Event('change'));
    });
  });

  $('#toggleHideUsed').addEventListener('change', (e)=>{
    state.settings.hideUsedCategories = e.target.checked; saveState(); renderCategories();
  });
  $('#toggleBlockOnEnd').addEventListener('change', (e)=>{
    state.settings.blockUsedCategoryOnEnd = e.target.checked; saveState();
  });
  $('#toggleAutoScore').addEventListener('change', (e)=>{
    state.settings.autoScoreOnCorrect = e.target.checked; saveState();
  });

  $('#btnResetCats').addEventListener('click', ()=>{
    if(confirm('사용된 카테고리 표시를 모두 해제할까요?')) resetUsedCategories();
  });

  $('#btnResetScores').addEventListener('click', ()=>{
    if(confirm('모든 팀 점수를 초기화할까요?')) resetScores();
  });

  $('#btnHardReset').addEventListener('click', ()=>{
    if(confirm('모든 데이터(팀, 점수, 카테고리 사용 표시, 설정)를 초기화합니다. 계속할까요?')){
      hardReset();
    }
  });

  $('#btnFull').addEventListener('click', toggleFullscreen);

  $('#btnEditCats').addEventListener('click', openCatEditor);
  $('#btnCatsSave').addEventListener('click', saveFromEditor);
  $('#btnCatsCancel').addEventListener('click', ()=>$('#dlgCats').close());
  $('#btnCatsExport').addEventListener('click', exportCats);
  $('#btnCatsImport').addEventListener('click', importCats);

  $('#btnSummaryOk').addEventListener('click', ()=>$('#dlgSummary').close());

  // ----- 초기화 -----
  function renderAll(){
    renderCategories();
    renderTeams();
    $('#toggleHideUsed').checked = state.settings.hideUsedCategories;
    $('#toggleBlockOnEnd').checked = state.settings.blockUsedCategoryOnEnd;
    $('#toggleAutoScore').checked = state.settings.autoScoreOnCorrect;
    roundSecondsInput.value = String(state.settings.roundSeconds);
    timeRemain.textContent = String(state.settings.roundSeconds);
    updateStartBtnState();
  }

  loadState();
  renderAll();
  showScreen('catScreen');
})();

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
    ]}
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
    ]}
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
  const btnNextTeam = $('#btnNextTeam');
  const roundSecondsInput = $('#roundSeconds');

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
    passedWords:[]
  };

  function updateStartBtnState(){
    const hasTeam = !!state.activeTeamId;
    const hasCat = !!selectedCategoryId && !state.usedCategoryIds.includes(selectedCategoryId);
    btnStart.disabled = !(hasTeam && hasCat && !round.running);
  }

  function pickNextWord(){
    if(round.words.length===0){
      bigWord.textContent = '제시어가 없습니다 (카테고리 수정 필요)';
      return;
    }
    round.wordIndex = (round.wordIndex+1) % round.words.length;
    bigWord.textContent = round.words[round.wordIndex];
  }

  function startRound(){
    if(round.running) return;
    if(!state.activeTeamId){ alert('활성 팀을 선택하세요.'); return; }
    if(!selectedCategoryId || state.usedCategoryIds.includes(selectedCategoryId)){ alert('사용 가능한 카테고리를 선택하세요.'); return; }
    showScreen('gameScreen');
    round.categoryId = selectedCategoryId;
    const cat = state.categories.find(c=>c.id===round.categoryId);
    round.words = shuffle([...cat.words]);
    round.wordIndex = -1;
    pickNextWord();
    round.correct = 0; round.pass = 0;
    round.correctWords = [];
    round.passedWords = [];

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
    timeRemain.textContent = String(state.settings.roundSeconds);
    $('#timerBar').style.background='';

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

  function onPass(){
    if(!round.running || round.paused) return;
    const w = round.words[round.wordIndex];
    round.pass++;
    if(w) round.passedWords.push(w);
    pickNextWord();
  }
  function onCorrect(){
    if(!round.running || round.paused) return;
    const w = round.words[round.wordIndex];
    round.correct++;
    if(w) round.correctWords.push(w);
    if(state.activeTeamId && state.settings.autoScoreOnCorrect) incScore(state.activeTeamId, +1);
    pickNextWord();
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

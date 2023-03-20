const about = document.getElementById('about');
about.addEventListener('click', displayAbout);
window.addEventListener('DOMContentLoaded', displayAbout);
function displayAbout () {
    const div = document.createElement('div');
    div.innerHTML = `

    <div class="tile is-child box">
    <ul>
        <li class="has-text-danger has-background-danger-light">
            18歳未満はプレイ禁止です。
        </li>
        <br>
        <li class="has-text-link has-background-link-light">
            使用しているイラストはAI製です。
        </li>
        <br>
        <br>
        <p>真ん中をクリックしてキーを押すと始まります。</p>
        <br>
        <p>よく分からんけど見た目上それらしく動いている気がする状態です。</p>
        <br>
        中原ここあ(<a href="https://twitter.com/tt_cocoan">@tt_cocoan</a>)
    </ul>
    
        <div style="width:60vw;height:60vh;"></div>
    </div>

    <!--難易度対応表 table-->

    `

    let d = document.getElementById('area');
    d.innerHTML = "";
    d.appendChild(div);
}

let timerArray = new Array();

let timer = document.getElementById('timer');
let count = document.getElementById('count');
let kpm = document.getElementById('kpm');


let typeText = "";
let order = [];
let shuffledOrder;
let choosingLevel;


const lv1 = document.getElementById('lv1');
const lv2 = document.getElementById('lv2');
const lv3 = document.getElementById('lv3');
const lv4 = document.getElementById('lv4');
const lv5 = document.getElementById('lv5');
contentList = [lv1,lv2,lv3,lv4,lv5];

for (let i = 0; i < contentList.length; i++) {
    contentList[i].addEventListener('click', () => {
        let d = document.getElementById('area');
        d.innerHTML = '';
        timer.textContent = '';
        count.textContent = '';
        kpm.textContent = '';

        stopInterval();
        choosingLevel = i+1;
        createBlocks(i+1);
    })
}



/*
const wordList = [
'a','ability','able','about','above','abroad','absence','absent','absolute','accept','accident','accord','account','accuse','accustom','across','act','action','active','actor','actual','add','address','admire','admission','admit','adopt','advance','advantage','adventure','advertise','advice','advise','affair','afford','afraid','after','afternoon','again','against','age','agency','agent','ago','agree','agriculture','ahead','aim','air','airplane','alike','alive','all','allow','allowance','almost','alone','along','already','also','although','altogether','always','ambition','ambitious','among','amount','amuse','ancient','and','anger','angle','angry','animal','annoy','another','answer','anxiety','anxious','any','anybody','anyhow','anyone','anything','anyway','anywhere','apart','appear','appearance','application','apply','appoint','approve','arch','argue','arise','arm','army','around','arrange','arrest','arrive','arrow','art','article','artificial','as','ash','ashamed','aside','ask','asleep','association','astonish','at','attack','attempt','attend','attention','attract','attraction','attractive','audience','aunt','autumn','avenue','average','avoid','awake','away','awkward','axe','baby','back','backward','bad','bag','bake','balance','ball','band','bank','bar','bare','bargain','barrel','base','basic','basis','basket','bath','bathe','battle','bay','be','beam','bear','beard','beat','beauty','because','become','bed','bedroom','before','beg','begin','behave','behavior','behind','being','belief','believe','bell','belong','below','belt','bend','beneath','beside','besides','best','better','between','beyond','big','bill','bind','bird','birth','bit','bite','bitter','black','blade','blame','bleed','bless','blind','block','blood','blow','blue','board','boast','boat','body','boil','bold','bone','book','border','borrow','both','bottle','bottom','bound','boundary','bow','bowl','box','boy','brain','branch','brass','brave','bread','break','breakfast','breath','breathe','brick','bridge','bright','bring','broad','broadcast','brother','brown','brush','build','bunch','bundle','burn','burst','bury','bus','bush','business','businessman','busy','but','butter','button','buy','by','cake','calculate','calculation','call','calm','camera','camp','can','cap','cape','capital','captain','car','card','care','carriage','carry','case','cat','catch','cattle','cause','caution','cautious','cave','cent','center','century','ceremony','certain','certainty','chain','chair','chairman','chance','change','character','charge','charm','cheap','check','cheer','chest','chicken','chief','child','childhood','choice','choose','Christmas','church','circle','circular','citizen','city','civilize','claim','class','classification','classify','clay','clean','clear','clerk','clever','climb','clock','close','cloth','clothe','cloud','club','coal','coast','coat','coffee','coin','cold','collar','collect','collection','collector','college','colony','color','combine','come','comfort','command','commerce','commercial','committee','common','companion','company','compare','comparison','compete','competition','complain','complaint','complete','completion','complicate','compose','composition','concern','condition','confess','confession','confidence','confident','confuse','confusion','connect','connection','conscience','conscious','consider','contain','content','continue','control','convenience','convenient','conversation','cook','cool','copy','corn','corner','correct','cost','cottage','cotton','could','council','count','country','courage','course','court','cousin','cover','cow','crack','crash','cream','creature','creep','crime','criminal','critic','crop','cross','crowd','crown','cruel','crush','cry','cultivate','cup','cure','curious','curl','current','curse','curtain','curve','custom','customary','customer','cut','daily','damage','damp','dance','danger','dare','dark','date','daughter','day','daylight','dead','deal','dear','death','debt','decay','decide','decision','decisive','declare','decrease','deed','deep','defeat','defend','defendant','defense','degree','delay','delicate','delight','deliver','delivery','demand','department','depend','dependence','dependent','depth','descend','describe','description','desert','deserve','desire','desk','despair','destroy','destruction','destructive','detail','determine','develop','devil','dictionary','die','difference','different','difficult','difficulty','dig','dine','dinner','dip','direct','direction','director','dirt','disagree','disappear','disappoint','disapprove','discipline','discover','discovery','discuss','discussion','disease','dish','dismiss','distance','distant','distinguish','district','disturb','dive','divide','division','do','doctor','dog','dollar','door','dot','double','doubt','down','dozen','drag','draw','dream','dress','drink','drive','drop','drum','dry','duck','due','dull','during','dust','duty','each','eager','ear','early','earn','earnest','earth','ease','east','eastern','easy','eat','edge','educate','education','educator','effect','effective','efficiency','efficient','effort','egg','either','elder','elect','election','electric','elephant','else','elsewhere','empire','employ','employee','empty','encourage','end','enemy','engine','engineer','English','enjoy','enough','enter','entertain','entire','entrance','envelope','envy','equal','escape','especially','essence','essential','even','evening','event','ever','every','everybody','everyone','everything','everywhere','evil','exact','examine','example','excellent','except','exception','excess','excessive','exchange','excite','excuse','exercise','exist','existence','expect','expense','expensive','experience','experiment','explain','explode','explore','explosion','explosive','express','expression','extend','extension','extensive','extent','extra','extraordinary','extreme','eye','face','fact','factory','fade','fail','failure','faint','fair','faith','fall','FALSE','fame','familiar','family','fan','fancy','far','farm','fashion','fast','fasten','fat','fate','father','fault','favor','favorite','fear','feather','feed','feel','fellow','fellowship','female','fence','fever','few','field','fight','figure','fill','film','find','fine','finger','finish','fire','firm','first','fish','fit','fix','flag','flame','flash','flat','flavor','flesh','float','flood','floor','flow','flower','fly','fold','follow','fond','food','fool','foot','for','forbid','force','foreign','forest','forget','forgive','fork','form','formal','former','forth','fortunate','fortune','forward','frame','free','freedom','freeze','frequency','frequent','fresh','friend','friendly','friendship','frighten','from','front','fruit','full','fun','funeral','funny','fur','furnish','furniture','further','future','gain','game','gap','garage','garden','gas','gate','gather','gay','general','generous','gentle','gentleman','get','gift','girl','give','glad','glass','glory','go','god','gold','golden','good','govern','governor','grace','gradual','grain','grand','grass','grateful','grave','gray','grease','great','green','greet','grind','ground','group','grow','growth','guard','guess','guest','guide','guilt','gun','habit','hair','half','hall','hand','handle','hang','happen','happy','harbor','hard','hardly','harm','harvest','haste','hat','hate','hatred','have','hay','he','head','heal','health','heap','hear','heart','heat','heaven','heavy','height','help','here','hesitate','hide','high','highway','hill','hire','history','hit','hold','hole','holiday','holy','home','honest','honor','hope','horizon','horse','hospital','host','hot','hotel','hour','house','how','however','human','humble','hunger','hunt','hurry','hurt','husband','hut','I','ice','idea','ideal','idle','if','ill','imaginary','imagine','imitation','immediate','immense','importance','important','impossible','improve','in','inch','include','increase','indeed','industry','influence','inform','inquire','inquiry','insect','inside','instant','instead','instrument','insult','insurance','insure','intend','intention','interest','interfere','interference','international','interrupt','into','introduce','introduction','invent','invention','invite','iron','island','it','jaw','join','joint','joke','journey','joy','judge','juice','jump','just','justice','keep','key','kick','kill','kind','king','kingdom','kiss','kitchen','knee','kneel','knife','knock','know','knowledge','lack','ladder','lady','lake','lamp','land','language','large','last','late','latter','laugh','laughter','law','lawyer','lay','lead','leadership','leaf','lean','learn','least','leather','leave','left','leg','lend','length','less','lessen','lesson','let','letter','level','liberty','library','lid','lie','life','lift','light','like','likely','limit','line','lip','liquid','list','listen','literary','literature','little','live','load','loan','local','lock','lodge','log','lonely','long','look','loose','lord','lose','loss','lot','loud','love','lovely','low','loyal','loyalty','luck','lump','lunch','lung','machine','machinery','mad','mail','main','make','male','man','manage','mankind','manner','manufacture','many','map','march','mark','market','marriage','marry','mass','master','match','material','matter','may','maybe','meal','mean','meanwhile','measure','meat','mechanic','mechanism','medical','medicine','meet','melt','member','membership','memory','mention','merchant','mercy','mere','message','metal','middle','might','mild','mile','milk','mill','mind','mine','mineral','minister','minute','miserable','misery','miss','mistake','mix','mixture','model','moderate','modern','modest','moment','money','month','moon','moral','more','moreover','morning','most','mother','motion','motor','mountain','mouse','mouth','move','much','mud','multiply','murder','music','musician','must','mystery','nail','name','narrow','nation','native','nature','near','neat','necessary','necessity','neck','need','needle','neglect','neighbor','neighborhood','neither','nest','net','network','never','new','news','newspaper','next','nice','night','no','noble','nobody','noise','none','noon','nor','north','northern','nose','not','note','nothing','notice','now','nowhere','number','numerous','nurse','nut','obey','object','objection','observe','occasion','ocean','of','off','offer','office','officer','official','often','oil','old','omit','on','once','one','only','onto','open','operate','operation','operator','opinion','opportunity','oppose','opposite','opposition','or','orange','order','ordinary','organ','organize','origin','other','otherwise','ought','out','outline','outside','over','overcome','owe','own','ownership','pack','package','pad','page','pain','paint','pair','pale','pan','paper','parent','park','part','particle','particular','partner','party','pass','passage','passenger','past','paste','path','patience','patient','pattern','pause','pay','peace','peculiar','pen','pencil','people','per','perfect','perform','performance','perhaps','permanent','permission','permit','person','persuade','pet','photograph','pick','picture','piece','pile','pin','pink','pipe','pity','place','plain','plan','plant','plaster','plate','play','pleasant','please','pleasure','plenty','plow','pocket','poem','poet','point','poison','police','polish','polite','political','politician','politics','pool','poor','popular','population','position','possess','possession','possible','post','postpone','pot','pound','pour','poverty','powder','power','practical','practice','praise','pray','preach','precious','prefer','preference','prejudice','prepare','presence','present','preserve','president','press','pressure','pretend','pretty','prevent','prevention','price','pride','priest','print','prison','private','prize','probable','problem','produce','product','production','profession','profit','program','progress','promise','prompt','pronounce','proof','proper','property','proposal','propose','protect','protection','proud','prove','provide','public','pull','pump','punish','pupil','pure','purpose','push','put','puzzle','qualification','qualify','quality','quantity','quarrel','quarter','queen','question','quick','quiet','quite','rabbit','race','radio','rail','railroad','rain','raise','rank','rapid','rare','rate','rather','raw','reach','read','ready','real','realize','reason','reasonable','receive','recent','recognition','recognize','recommend','record','red','reduce','reduction','refer','reference','reflect','reflection','refresh','refuse','regard','regret','regular','relate','relation','relative','relief','relieve','religion','remain','remark','remedy','remember','remind','rent','repair','repeat','repetition','replace','reply','report','represent','representative','reproduce','republic','reputation','request','rescue','reserve','resign','resist','resistance','respect','responsible','rest','restaurant','result','retire','return','review','reward','ribbon','rice','rich','rid','ride','right','ring','rise','risk','rival','river','road','roar','roast','rob','rock','roll','roof','room','root','rope','rough','round','row','royal','rub','rubber','rug','ruin','rule','run','rush','rust','sacred','sacrifice','sad','saddle','safe','safety','sail','sake','salary','sale','salesman','salt','same','sample','sand','satisfaction','satisfactory','satisfy','sauce','save','saw','say','scale','scarce','scatter','scene','scenery','school','science','scientific','scientist','scrape','scratch','screen','screw','sea','search','season','seat','second','secret','secretary','see','seed','seem','seize','seldom','self','sell','send','sense','sensitive','sentence','separate','separation','serious','servant','serve','service','set','settle','several','severe','sew','shade','shadow','shake','shall','shallow','shame','shape','share','sharp','shave','she','sheep','sheet','shelf','shell','shelter','shield','shine','ship','shirt','shock','shoe','shoot','shop','shore','short','should','shoulder','shout','show','shower','shut','sick','side','sight','sign','signal','silence','silent','silver','simple','simplicity','since','sincere','sing','single','sink','sir','sister','sit','situation','size','skill','skin','skirt','sky','slave','slavery','sleep','slide','slight','slip','slope','slow','small','smell','smile','smoke','smooth','snake','snow','so','soap','social','society','soft','soften','soil','soldier','solemn','solid','solution','solve','some','somebody','somehow','someone','something','sometimes','somewhere','son','song','soon','sorry','sort','soul','sound','soup','south','space','spare','speak','special','speech','speed','spell','spend','spin','spirit','spit','spite','splendid','split','sport','spot','spread','spring','square','staff','stage','stain','stair','stamp','stand','standard','star','start','state','station','stay','steady','steam','steel','steep','steer','stem','step','stick','stiff','still','stir','stock','stomach','stone','stop','store','storm','story','stove','straight','straighten','strange','straw','stream','street','strength','strengthen','stretch','strict','strike','string','strip','stroke','strong','struggle','student','study','stuff','stupid','subject','substance','succeed','success','such','suck','sudden','suffer','sugar','suggest','suggestion','suit','summer','sun','supper','supply','support','suppose','sure','surface','surprise','surround','suspect','suspicion','suspicious','swallow','swear','sweat','sweep','sweet','swell','swim','swing','sympathetic','sympathy','system','table','tail','take','talk','tall','tap','taste','tax','taxi','tea','teach','tear','telegraph','telephone','tell','temperature','temple','tempt','tend','tender','tent','term','terrible','test','than','thank','that','the','theater','theatrical','then','there','therefore','these','they','thick','thief','thin','thing','think','this','thorough','those','though','thread','threat','threaten','throat','through','throw','thumb','thunder','thus','ticket','tide','tie','tight','till','time','tip','tire','title','to','tobacco','today','toe','together','tomorrow','ton','tongue','tonight','too','tool','tooth','top','total','touch','tough','tour','toward','towel','tower','town','toy','track','trade','train','translate','translation','trap','travel','tray','treasure','treasury','treat','tree','tremble','trial','tribe','trick','trip','trouble','TRUE','trust','truth','try','tube','tune','turn','twist','type','ugly','uncle','under','understand','union','unit','unite','unity','universal','universe','university','unless','until','up','upon','upper','upset','urge','urgent','use','usual','valley','valuable','value','variety','various','veil','verb','verse','very','vessel','victory','view','village','violence','violent','virtue','visit','visitor','voice','vote','voyage','wage','wait','waiter','wake','walk','wall','wander','want','war','warm','warmth','warn','wash','waste','watch','water','wave','wax','way','we','weak','weaken','wealth','weapon','wear','weather','weave','week','weekend','weigh','weight','welcome','well','west','western','wet','what','whatever','wheel','when','whenever','where','wherever','whether','which','while','whip','whisper','whistle','white','who','whole','why','wide','widow','width','wife','wild','will','win','wind','window','wine','wing','winter','wipe','wire','wisdom','wise','wish','with','within','without','witness','woman','wonder','wood','wooden','word','work','world','worry','worse','worship','worth','would','wound','wrap','wreck','wrist','write','wrong','yard','year','yellow','yes','yesterday','yet','yield','you','young','youth','zero'
];
*/
const wordList = [
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
    'tajitaji','sakusaku','magomago',
];



function firstKeyPressed () {

    timer.textContent = "30.0";
    count.textContent = "0";
    kpm.textContent = "0";

    timerArray.push(setInterval(startTimer, 100));
}


function startTimer () {

    let nowTime = timer.textContent - 0.1;
    nowTime = Number.parseFloat(nowTime).toFixed(1);
    if (nowTime <= 0) {
        stopInterval();
        endTime();
    }
    timer.textContent = nowTime;

}

function stopInterval() {
    if (timerArray.length > 0) {
        clearInterval(timerArray.shift());
    }
}


function endTime() {
    console.log('ended!');
}

function createBlocks(level) {
    const area = document.getElementById('area');



    //レベルに応じてブロック幅を指定。
    let w = 0;
    switch (level) {
        case 1:
            w = 50;
            break;
        case 2:
            w = 25;
            break;
        //...
        default:
            w = 25;
            break;
    }

    let xCount = 500 / w;
    let yCount = 750 / w;

    createInputBox(xCount*yCount);
    
    
    for (let i = 0; i < yCount; i++) {
        for (let j = 0; j < xCount; j++) {
            let [x, y] = [j*w, i*w];
            let block = createImg();
            block.style = `left:${x}px;top:${y}px`;
            area.appendChild(block);
        }
    }

    const girls = document.createElement('img');
    girls.src = "img"+level+".png";
    girls.width = "500";
    girls.height = "750";
    setTimeout(() => {
        area.appendChild(girls);
    }, 300);

    function createImg () {
        const img = document.createElement('img');
        img.src = "block.png";
        img.className = "block is-overlay";
        //x=500,y=750(2:3) w:50 -> 10,15
        img.width= w;
        return img;
    }

    function createInputBox(cnt) {

        let div = document.createElement('div');
        div.id = 'type_area';
        div.className = 'is-overlay';
        div.style = 'top:350px';

        let input = document.createElement('input');
        input.id = 'typing_area';
        input.className = 'input is-danger is-large is-rounded';
        input.type = 'text';

        area.appendChild(div);
        let makedDiv = document.getElementById('type_area');
        makedDiv.appendChild(input);

        setWord(cnt, input);

    }


    function setWord(cnt, typingArea) {

        let shuffledWordList = fisherYatesShuffle(wordList);
        typeText = shuffledWordList.join(' ');
        //valueにする

        typingArea.placeholder = typeText;
        for (let i = 0; i < cnt; i++) {
            order.push(i);
        }
        shuffledOrder = fisherYatesShuffle(order);

        window.addEventListener('keydown', judgeKeys, false);
    }

}

function makeTweet (level) {
    //const playingLevel = level;
    const playingLevel = 'LEVEL 1';
    const tweetButton = document.getElementById('tweet');
    
    const t = String((30 - parseFloat(timer.textContent)).toFixed(1));

    const c = count.textContent;
    const k = kpm.textContent;
    const hashTags = "脱衣タイピング"
    const tweet = `${playingLevel} cleared! ${c}keys in ${t} sec (${k}KPM) ＠脱衣タイピング（α）`;
    const url = 'https://example.com';

    const tweetText = `https://twitter.com/intent/tweet?ref_src=twsrc&text=${tweet}&hashtags=${hashTags}&url=${url}`;
    tweetButton.href = tweetText;
}

function fisherYatesShuffle(arr){
    for(let i = arr.length-1 ; i>0 ;i--) {
        let j = Math.floor( Math.random() * (i + 1) );
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
}

function judgeKeys(e) {

    e.preventDefault();

    console.log(e.key);

    let typedKey = e.key;
    let nextKey = typeText[0];

    if (typedKey === nextKey) {
        if (timer.textContent === '') {
            firstKeyPressed();
        }

        correctType(typedKey);
    } else if (typedKey === 'Escape') {

        contentList[choosingLevel-1].click();

    } else {
        incorrectType(typedKey);
    }


}

function correctType(key) {
    
    typeText = typeText.slice(1);
    let typingArea = document.getElementById('typing_area');
    typingArea.placeholder = typeText;

    deleteBlock();

}

function incorrectType(key) {
    //if (key !== 'Enter') addBlock();
}

function deleteBlock() {
    
    let typedCount = Number(count.textContent);
    count.textContent = String(typedCount + 1);
    let elapsedTime = 30 - Number(timer.textContent);
    let kpmValue = Math.round(typedCount / elapsedTime * 60);

    kpm.textContent = String(kpmValue);

    const blocks = document.getElementsByClassName('block');
    

    
    if (shuffledOrder.length === 0) {

        typeFinish();

    } else {

        let topOrder = shuffledOrder.shift();
        blocks[topOrder].id = 'typedBlock';

    }

}

function addBlock() {

    const blocks = document.getElementsByClassName('block');

    for (let i = blocks.length; i >= 0; i--) {

        if (blocks[i]?.id === 'typedBlock') {
            blocks[i].id = 'missedBlock';
            break;
        }

    }

}

function typeFinish() {
            
    stopInterval();

    let typingArea = document.getElementById('typing_area');
    typingArea.placeholder = 'Press Enter!';

    window.addEventListener('keydown', brokeInputBox, true);

    function brokeInputBox (e) {
        if (e.key === 'Enter') {
            typingArea.id = 'typedBlock';
        };
    }

    makeTweet();

}



/*
https://twitter.com/intent/tweet?
hashtags=%E8%84%B1%E8%A1%A3%E3%82%BF%E3%82%A4%E3%83%94%E3%83%B3%E3%82%B0&

original_referer=http%3A%2F%2F127.0.0.1%3A5500%2F&

ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&

text=%E3%82%81%E3%81%A3%E3%81%9B%E3%83%BC%E3%81%98&

url=http%3A%2F%2F127.0.0.1%3A5500%2Findex.html
*/
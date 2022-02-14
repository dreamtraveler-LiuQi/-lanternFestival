






$(function () {
    //重置数据，随即抽取12题
    (function(){
        const container = new Set()
        const lenIndex = gameData.length-1
        while(container.size<12){
            var index = parseInt(Math.random()*lenIndex)
            container.add(gameData[index])
        }
        gameData.length = 0
        container.forEach(obj=>{
            gameData.push(obj)
        })
    })();
    //游戏开始页面
    (function ($) {
        $('.stage2 .button1').on('click', e => {
            $('.stage2').hide()
            $('.stage3').show()
            gamelogic()
        })
        $('.stage2 .button2').on('click', e => {
            $('.stage1').show()
        })
        $('.stage2 .button3').on('click', e => {
            $('.stage4').show()
        })
        $('.closerank').on('click',e=>{
            $('.stage4').hide()
        })
    })(jQuery);
    //游戏规则页面
    (function ($) {
        $('.stage1 .backbutton').on('click', e => {
            $('.stage1').hide()
        })
    })(jQuery)
})


function gamelogic() {
    let gameIndex = 0
    let isClick = false
    $('.nextbtn1').on('click', e => {
        nextBtn()
        if (gameIndex < gameData.length) {
            if ($.trim($('.stage3 .gameans').val()) == gameData[gameIndex].gameans) {
                showRight()
            } else {
                showWrong()
            }
            isClick = false
        }
    })
    $('.resetbtn').on('click', e => {
        /*
        $('.showelem').hide()
        $('.showelem1').show()
        $('.toptitle1').show()
        $('.toptitle2').hide()
        gameIndex = 0
        gameData.forEach(obj => {
            obj.time = 30
            obj.right = false
        })
        nextBtn()
        */
    })
    $('.nextbtn2').on('click', e => {
        if (isClick) { return }
        gameIndex++
        nextBtn()
        $('.showelem').hide()
        $('.showelem1').show()
        $('.stage3 .gameans').val('')
        isClick = true
        if (!gameData[gameIndex]) showResult()
    })
    $('.nextbtn3').on('click', e => {
        if (isClick) { return }
        gameIndex++
        nextBtn()
        $('.showelem').hide()
        $('.showelem1').show()
        $('.stage3 .gameans').val('')
        isClick = true
        if (!gameData[gameIndex]) showResult()
    })
    $('.rankbtn').on('click',e=>{
        $('.stage4').show()
    })
    var showRight = function () {
        $('.showelem').hide()
        $('.showelem2').show()
        gameData[gameIndex].right = true
    }
    var showWrong = function () {
        $('.showelem').hide()
        $('.showelem3').show()
        gameData[gameIndex].right = false
    }
    var nextBtn = function () {
        if (gameData[gameIndex]) {
            showTime()
            $('.stage3 .gameask').text(gameData[gameIndex].gameask)
            $('.stage3 .gametip').text('（' + gameData[gameIndex].gametip + '）')
        } else {

        }
    }
    var showResult = function () {
        let result = {}
        result.usetime = gameData.
            map(data => 30 - data.time).
            reduce((prev, curr) => prev + curr)
        result.rightcount = gameData.
            map(data => data.right).
            filter(data => data).
            length
        if (window.callback) window.callback(result)
        $('.showelem').hide()
        $('.showelem4').show()
        $('.stage3 .result2 span').text(result.usetime)
        $('.stage3 .result1 span').text(result.rightcount)
        $('.toptitle1').hide()
        $('.toptitle2').show()
    }
    var showTime = (function () {
        var elem = $('.showTime')
        var timmer = null
        var chinaNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
        var indexnumber1 = $('.indexnumber')
        var indexnumber2 = $('.indexnumber2')
        return function () {
            clearInterval(timmer)
            elem.text('30秒')
            if (gameData[gameIndex]) {
                //第几题
                if(gameIndex<10){
                    indexnumber2.hide()
                    indexnumber1.text(chinaNum[gameIndex])
                }else{
                    indexnumber2.show()
                    let _numStr = gameIndex.toString()
                    indexnumber1.text('十')
                    indexnumber2.text(chinaNum[parseInt(_numStr[1])])
                }
                timmer = setInterval(function () {
                    if (gameData[gameIndex] && gameData[gameIndex].time > 0) {
                        elem.text(--gameData[gameIndex].time + '秒')
                    } else {
                        $('.nextbtn1').click()
                        clearInterval(timmer)
                    }
                }, 1000)
            }
        }
    })()
    showTime()
    $('.stage3 .gameask').text(gameData[gameIndex].gameask)
    $('.stage3 .gametip').text('（' + gameData[gameIndex].gametip + '）')
}




const gameData = [
    {
        gameask: '皇帝从不上早朝',
        gametip: '打一三国名仕的号',
        gameans: '卧龙',
        time: 30,
        right: false
    },
    {
        gameask: '圆圆的月亮高高挂',
        gametip: '打一电影明星',
        gameans: '高圆圆',
        time: 30,
        right: false
    },
    {
        gameask: '暗访山东',
        gametip: '打二字国家名',
        gameans: '秘鲁',
        time: 30,
        right: false
    },
    {
        gameask: '上诉无果',
        gametip: '打一字',
        gameans: '皓',
        time: 30,
        right: false
    },
    {
        gameask: '拒赴鸿门宴',
        gametip: '打五字口语',
        gameans: '不吃这一套',
        time: 30,
        right: false
    },
    {
        gameask: '七夕相会抛媚眼',
        gametip: '打四字标语',
        gameans: '节约用电',
        time: 30,
        right: false
    },
    {
        gameask: '广西面貌',
        gametip: '打二字中药',
        gameans: '桂皮',
        time: 30,
        right: false
    },
    {
        gameask: '情不自禁',
        gametip: '打二字疾病',
        gameans: '流感',
        time: 30,
        right: false
    },
    {
        gameask: '姑娘十八出洋去',
        gametip: '打五字成语',
        gameans: '女大不中留',
        time: 30,
        right: false
    },
    {
        gameask: '万般皆下品',
        gametip: '打二字古官职',
        gameans: '尚书',
        time: 30,
        right: false
    },
    {
        gameask: '姑娘不轻浮',
        gametip: '打四字体育项目',
        gameans: '女子举重',
        time: 30,
        right: false
    },
    {
        gameask: '好吃，又好玩',
        gametip: '四字饮料品牌',
        gameans: '可口可乐',
        time: 30,
        right: false
    },
    {
        gameask: '实习烫发',
        gametip: '打二字教育名词',
        gameans: '试卷',
        time: 30,
        right: false
    },
    {
        gameask: '从头到尾没去过重庆',
        gametip: '打一成语',
        gameans: '始终不渝',
        time: 30,
        right: false
    },
    {
        gameask: '口齿清楚',
        gametip: '打一影视演员',
        gameans: '陈道明',
        time: 30,
        right: false
    },
    {
        gameask: '长得漂亮',
        gametip: '打一汽车品牌',
        gameans: '标致',
        time: 30,
        right: false
    },
    {
        gameask: '笑口常开',
        gametip: '打一首都名',
        gameans: '多哈',
        time: 30,
        right: false
    },
    {
        gameask: '山东省、河南省',
        gametip: '打四字电视栏目',
        gameans: '鲁豫有约',
        time: 30,
        right: false
    },
    {
        gameask: '女儿们总要回娘家',
        gametip: '打一李白诗句',
        gameans: '千金散尽还复来',
        time: 30,
        right: false
    },
    {
        gameask: '喋喋不休',
        gametip: '打三字电影名',
        gameans: '无间道',
        time: 30,
        right: false
    },
    {
        gameask: '反扣菜盘',
        gametip: '打三字中药名',
        gameans: '覆盆子',
        time: 30,
        right: false
    }
]
























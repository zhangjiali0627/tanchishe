$(function() {
    // 场景及规划坐标：
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            $("<div>").addClass("block")
                .attr("id", i + "-" + j)
                .css({
                    backgroundColor: "rgba(" + r + "," + g + "," + b + ",0.9)",
                })
                .appendTo(".changjing");
        }
    }
    var dict = {
        '0-0': true,
        '0-1': true,
        '0-2': true
    };
    //数据  画蛇：
    var she = [{
        x: 0,
        y: 0
    }, {
        x: 0,
        y: 1
    }, {
        x: 0,
        y: 2
    }];


    //初始化：
    for (var i = 0; i < she.length; i++) {
        $('#' + she[i].x + '-' + she[i].y).addClass("she");
    }
    var fangshiwu = function() {
        var a = Math.floor(Math.random() * 20);
        var b = Math.floor(Math.random() * 20);
        $('#' + a + '-' + b).addClass('shiwu');
        return {
            x: a,
            y: b
        };
    };
    var shiwu = fangshiwu();

    //动起来
    var fangxiang = 'xia';
    move = function() {
        var jiutou = she[she.length - 1];
        if (fangxiang === 'you') {
            var xintou = {
                x: jiutou.x,
                y: jiutou.y + 1
            };
        } else if (fangxiang === 'zuo') {
            var xintou = {
                x: jiutou.x,
                y: jiutou.y - 1
            };
        } else if (fangxiang === 'xia') {
            var xintou = {
                x: jiutou.x + 1,
                y: jiutou.y
            };
        } else if (fangxiang === 'shang') {
            var xintou = {
                x: jiutou.x - 1,
                y: jiutou.y
            };
        }


        if (xintou.x < 0 || xintou.x > 19 || xintou.y < 0 || xintou.y > 19) {
            $('.changjing').addClass("fail");
            jieshu();
            return;
        }
        if (dict[xintou.x + '-' + xintou.y]) {
            $('.changjing').addClass("wan");
            jieshu();
            return;
        }

        //吃到食物
        she.push(xintou);
        dict[xintou.x + '-' + xintou.y] = true;
        $('#' + xintou.x + '-' + xintou.y).addClass('she');
        if (xintou.x === shiwu.x && xintou.y === shiwu.y) {
            $('#' + shiwu.x + '-' + shiwu.y).removeClass('shiwu');
            shiwu = fangshiwu();
        } else {
            var weiba = she.shift();
            delete dict[weiba.x + '-' + weiba.y];
            $('#' + weiba.x + '-' + weiba.y).removeClass('she');
        }
    };

    var t = setInterval(move, 500);
    var jieshu = function() {
        clearInterval(t);
    };
    $(document).on('keyup', function(e) {
        e.preventDefault();
        var biao = {
            'zuo': 37,
            'you': 39,
            'shang': 38,
            'xia': 40
        };
        if (Math.abs(e.keyCode - biao[fangxiang]) == 2) {
            return;
        }
        if (e.keyCode === 37) {
            fangxiang = 'zuo';
        }
        if (e.keyCode === 39) {
            fangxiang = 'you';
        }
        if (e.keyCode === 38) {
            fangxiang = 'shang';
        }
        if (e.keyCode === 40) {
            fangxiang = 'xia';
        }
    });
    jieshu();
    $(document).on("click", function() {
         jieshu();
        $(".changjing").addClass("animate");
        t = setInterval(move, 200);
         $(this).off("click");  
    });
});

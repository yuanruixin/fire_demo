// 图表一： 温度模块
(function () {
    var myChart = echarts.init(document.querySelector(".temperature .chart "));
    var data = [
        { 'title': '温度', 'sub_title': '21℃', value: "21", 'min': 0, 'max': 50 },
        { 'title': '湿度', 'sub_title': '50%', value: "50", 'min': 0, 'max': 100 }
    ];

    // 不同数据长度，圆心位置
    var pos_cfg = {
        '1': [['50%', '50%']],
        '2': [['25%', '50%'], ['75%', '50%']],
    };
    var data_len = data.length;

    // 获取位置信息
    var pos_info = pos_cfg[data_len];

    // 圆环颜色配置
    var color_cfg = [
        [
            { offset: 0, color: 'rgba(90, 255, 163, 1)', },
            { offset: 0.5, color: 'rgba(80, 192, 255, 1)', },
            { offset: 1, color: 'rgba(102, 255, 255, 1)', }
        ],
        [
            { offset: 0, color: 'rgba(50, 197, 255, 1)', },
            { offset: 0.5, color: 'rgba(254, 219, 101, 1)', },
            { offset: 1, color: 'rgba(250, 100, 0, 1)', }
        ]
    ];

    // 渲染数据
    var series = [], item = null;
    for (var i in data) {
        item = data[i];

        // 处理最大值及最小值
        if (!item.min) item.min = 0;
        if (!item.max) item.max = item.value / 0.8 + Math.random(0, parseInt(item.value * 0.2)) + 1;

        // 获取比率
        item.rate = Math.round(item.value / item.max * 10000) / 100;

        // 如果最大值大于100，则转换为百分比
        if (item.max > 100) {
            item.max = 100;
            item.min = 0;
        }

        // 拼接图表参数
        series.push({
            name: '最外层',
            type: 'gauge',
            center: pos_info[i],
            radius: '75%',
            startAngle: 150,
            endAngle: -209.999,
            axisLine: {
                show: true,
                lineStyle: { width: 2, color: [[1, "rgba(25, 235, 255,1)"]] },
            },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            detail: { show: false },
            pointer: { show: false }
        }, {
            name: '内层渐变区',
            type: 'gauge',
            radius: '55%',
            splitNumber: 10,            // 刻度数量
            center: pos_info[i],
            startAngle: 150,
            endAngle: -209.999,
            axisLine: {
                lineStyle: {
                    color: [[
                        1, {
                            type: 'radial',
                            colorStops: [
                                { offset: 0.72, color: '#0320462e' },
                                { offset: 0.84, color: '#08698961' },
                                { offset: 0.98, color: '#0FAFCBa6' },
                                { offset: 1, color: '#0EA4C1f0' }
                            ]
                        }]
                    ],
                    width: 1000
                }
            },
            splitLine: { show: false },   // 分隔线
            axisTick: { show: false },   // 刻度线
            axisLabel: { show: false },   // 刻度标签
            pointer: { show: false },   // 仪表盘指针
            detail: { show: false }
        }, {
            name: "中间层",
            type: 'gauge',
            center: pos_info[i],
            radius: '67%',
            min: item.min,                 // 最小刻度
            max: item.max,                 // 最大刻度
            splitNumber: 10,                       // 刻度数量
            startAngle: 245,
            endAngle: -65,
            data: [{ value: item.rate }],
            axisLine: {
                show: true,
                lineStyle: { width: 1, color: [[1, '#42B3D0']], }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 10,
                    color: [
                        [
                            item.rate / 100,
                            new echarts.graphic.LinearGradient(0, 1, 1, 0, color_cfg[i]),
                        ],
                        [1, 'rgba(50, 197, 255,.1)']
                    ],
                },
            },
            axisLabel: { show: true, color: '#fff', distance: 32, textStyle: { fontSize: 10 } },
            axisTick: { show: true, length: -5, distance: -10, lineStyle: { color: 'rgba(25, 235, 255, 1)', } },
            splitLine: { show: true, length: -10, distance: -10, lineStyle: { width: 1, color: 'rgba(25, 235, 255, 1)', }, },
            detail: {
                offsetCenter: [0, '-5%'],
                textStyle: { fontSize: 14, color: '#fff', },
                formatter: [item.title, '{name|' + item.sub_title + '}'].join('\n'),
                rich: { name: { fontSize: 18, lineHeight: 18, color: '#fff', fontWeight: '600', }, },

            },
            title: { color: '#fff', },
            pointer: { show: false }
        });
    }

    var option = {
        series: series,
    };

    // 3. 把配置项给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });

})();


// 图表二： 空气分析
(function () {
    var myChart = echarts.init(document.querySelector(".air .chart"))
    var option = {
        // backgroundColor: '#030d22',
        "normal": {
            "top": 200,
            "left": 300,
            "width": 500,
            "height": 400,
            "zIndex": 6,
            "backgroundColor": ""
        },
        "color": ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)"],
        "tooltip": {
            "show": true,
            // "trigger": "item"
        },
        "legend": {
            "show": true,
            "icon": "circle",
            "left": "20%",
            "top": "90%",
            "orient": "horizontal",
            "textStyle": {
                "fontSize": 16,
                "color": "#fff"
            },
            "data": ["正常指标", "实际指标"]
        },
        "radar": {
            "center": ["50%", "48%"],
            "radius": "70%",
            "startAngle": 90,
            "splitNumber": 4,
            "shape": "polygon",
            name: {
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                }
            },
            //  坐标轴文字与图表的距离
            nameGap: 4,
            splitArea: {
                show: true,
                areaStyle: {
                    color: '#0d6dba',
                    opacity: 0.1
                }
            },
            "axisLabel": {
                "show": false,
                "fontSize": 16,
                "color": "#fff",
                "fontWeight": "normal"
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4f8bbe',
                    opacity: 1
                }
            },
            splitLine: {

                lineStyle: {
                    color: '#4f8bbe',
                    opacity: 0.5
                }
            },
            "indicator": [{
                "name": "CO",
                "max": 88
            }, {
                "name": "CO₂",
                "max": 88
            }, {
                "name": "NO",
                "max": 88
            }, {
                "name": "O₂",
                "max": 88
            }, {
                "name": "烟雾",
                "max": 88
            }]
        },
        "series": [{
            "name": "正常指标",
            "type": "radar",
            "symbol": "circle",
            "symbolSize": 10,
            "areaStyle": {
                "normal": {
                    "color": "rgba(245, 166, 35, 0.4)"
                }
            },
            itemStyle: {
                color: 'rgba(245, 166, 35, 1)',
                borderColor: 'rgba(245, 166, 35, 0.3)',
                borderWidth: 10,
            },
            "lineStyle": {
                "normal": {
                    "type": "dashed",

                    "color": "rgba(245, 166, 35, 1)",
                    "width": 2
                }
            },
            "data": [
                [80, 50, 55, 80, 55]
            ]
        }, {
            "name": "实际指标",
            "type": "radar",
            "symbol": "circle",
            "symbolSize": 10,
            "itemStyle": {
                "normal": {
                    color: 'rgba(19, 173, 255, 1)',
                    "borderColor": "rgba(19, 173, 255, 0.4)",
                    "borderWidth": 10
                }
            },
            "areaStyle": {
                "normal": {
                    "color": "rgba(19, 173, 255, 0.5)"
                }
            },
            "lineStyle": {
                "normal": {
                    "color": "rgba(19, 173, 255, 1)",
                    "width": 2,
                    "type": "dashed"
                }
            },
            "data": [
                [60, 60, 65, 60, 70]
            ]
        }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();

// 左图三 近期数据
(function () {
    var myChart = echarts.init(document.querySelector(".pastData"));


    option = {
        backgroundColor: '#0e1c47',
        legend: {
            // align: "left",
            // right: '5%',
            // top:'15%',
            textStyle: {
                color: '#fff',
                fontSize: 16
            },
            icon: 'rect',
            itemGap: 10,
            itemWidth: 30,
            itemHeight: 5,
            data: [
                '数据一', '数据二', '数据三'
            ]
        },
        tooltip: {
            show: true,
            trigger:'axis',
        },
        grid: {
            // top: '18%',
            // left: '5%',
            // right: '5%',
            // bottom: '25%',
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                },
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    // padding: 0,
                    fontSize: 14,

                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            data: ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7',]
        },
        ],
        yAxis: [{
            name: '℃',
            nameTextStyle: {
                color: "#fff",
                fontSize: 12,
                padding: [0, 40, 20, 0]
            },
            min: 0,
            nameGap: 0,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#7c9bb7',
                    type: 'dashed'
                },
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    // padding: 16,
                },
            },
            axisTick: {
                show: false,
            },
        },
        {
            type: 'value',
            name: '%',
            nameGap: 0,
            nameTextStyle: {
                color: '#fff',
                fontSize: 12,
                padding: [0, 0, 20, 20]
            },
            axisLine: { show: false },
            axisTick: { show: true,color:'#fff' },
            axisLabel: {
                show: true,
                color: '#fff',
                fontSize: 12,
                padding: [10, 0, 0, 0],
            },
            splitLine: { show: false }
        }
        ],
        series: [{
            name: '数据一',
            type: 'line',
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 3,
                    color: "#ffbc46",
                },
                borderColor: 'rgba(0,0,0,.4)',
            },
            itemStyle: {
                color: "#ffbc46",
            },
            tooltip: {
                show: true
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(255, 188, 70, 0.5)'
                    }, {
                        offset: 1, color: 'rgba(255, 188, 70, 0)'
                    }],
                    global: false
                }
            },
            data: ["35", "36", "38", "35", "37", "38", "38"]
        }, {
            name: '数据二',
            type: 'line',
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 3,
                    color: "#52fdeb",
                },
            },
            itemStyle: {
                color: "#52fdeb",
            },
            tooltip: {
                show: true
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(82, 253, 235, 0.5)'
                    }, {
                        offset: 1, color: 'rgba(82, 253, 235, 0)'
                    }],
                    global: false
                }
            },
            data: ["23", "25", "24", "26", "23", "25", "38"]
        },
        {
            name: '数据三',
            type: 'line',
            yAxisIndex: 1,
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 3,
                    color: "#8ed1fb",
                },
            },
            itemStyle: {
                color: "#8ed1fb",
            },
            tooltip: {
                show: true
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(142, 209, 251, 0.5)'
                    }, {
                        offset: 1, color: 'rgba(142, 209, 251, 0)'
                    }],
                    global: false
                }
            },
            data: ["54", "55", "62", "53", "56", "57", "38"]
        }
        ]
    }
    // 3. 把配置项给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });

})();

// 右一进度图
(function(){
    var myChart = echarts.init(document.querySelector("#chart-device"))
    var data = [11, 1, 0 ] 
    var titlename = ['正常运行', '故障设备', '报警设备', ];
    var valdata = data
    var myColor = [ '#56D0E3','#1089E7', '#F57474'];
    option = {
        // backgroundColor: '#0e2147',
        xAxis: {
            show: false
        },
        grid: {
            left: 0,
            top: 15,//拉伸距离顶部高度
            bottom: 0,//拉伸距离底部高度
            containLabel: true
        },
        yAxis: [{
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: function(value, index) {
                        var num = myColor.length;
                        return myColor[index % num]
                    }
                },
                formatter: function(value, index) {
                    return [
                        '{title|' + value + '} '
                    ].join('\n')
                },
                rich: {}
            },
    
        }, {
            show: true,
            inverse: true,
            data: valdata,
            axisLabel: {
                textStyle: {
                    color: function(value, index) {
                        var num = myColor.length;
                        return myColor[index % num]
                    }
                }
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
    
        }],
        series: [{
            name: '数量',
            type: 'bar',
            yAxisIndex: 0,
            data: data,
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 30,
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                }
            },
           
        },],
        "tooltip": {
            "show": true,
        },
    };
myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})()
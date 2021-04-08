import { default } from '../home/home.vue';
<template>
    <div style="width:100%;">
        <!-- <div id="pickerBox">
            <el-input
                id="pickerInput"
                placeholder="输入关键字选取地点"
                prefix-icon="el-icon-search"
                v-model="address">
            </el-input>
            <div id="poiInfo"></div>
        </div> -->
        <div id="container" style="width:auto; height:500px">
            
        </div>
        <!-- <div class="weather">
            <iframe allowtransparency="true" frameborder="0" width="140" height="128" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=1&v=1&d=1&bd=0&k=00ffff&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=140&h=128&align=center"></iframe>
        </div> -->
    </div>
</template>
<script>
var map
export default {
    data(){
        return{
            address:'',
            storefrontList: [],
        };
    },
    mounted: function () {
        this.init();
        // this.initSelect();
        this.getStorefront();
    },
    methods: {
        init(){
            var layer = new AMap.TileLayer({
                zooms:[3,20],    //可见级别
                visible:true,    //是否可见
                opacity:1,       //透明度
                zIndex:0         //叠加层级
            })
            
            map = new AMap.Map('container', {
                resizeEnable: true,
                zoom: 5,
                mapStyle: 'amap://styles/normal',
                layers:[layer]
            })
            map.setFeatures(['road','point','building','bg']);
            // AMap.plugin(['AMap.Scale'],function(){//异步同时加载多个插件
            //     var scale = new AMap.Scale();
            //     map.addControl(scale);
            // });
            // map.on('click', function(ev) {
            // });
        },
        initSelect(){
            AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
                var poiPicker = new PoiPicker({
                    //city:'北京',
                    input: 'pickerInput'
                });
                //初始化poiPicker
                poiPickerReady(poiPicker);
            });
            function poiPickerReady(poiPicker) {
                window.poiPicker = poiPicker;
                var marker = new AMap.Marker();
                var infoWindow = new AMap.InfoWindow({
                    offset: new AMap.Pixel(0, -20)
                });
                //选取了某个POI
                poiPicker.on('poiPicked', function(poiResult) {
                    var source = poiResult.source,
                        poi = poiResult.item,
                        info = {
                            source: source,
                            id: poi.id,
                            name: poi.name,
                            location: poi.location.toString(),
                            address: poi.address
                        };
                    marker.setMap(map);
                    infoWindow.setMap(map);
                    marker.setPosition(poi.location);
                    infoWindow.setPosition(poi.location);
                    infoWindow.setContent('<pre>' + JSON.stringify(info, null, 2) + '</pre>');
                    infoWindow.open(map, marker.getPosition());
                    map.setCenter(marker.getPosition());
                });
                poiPicker.onCityReady(function() {
                    poiPicker.suggest('美食');
                });
            }
        },
        getStorefront(){
            var path = [];
            var title = [];
            this.$axios.get('http://10.6.11.82:3000/meigang/storefront/getStorefront').then((result) => {
                if (result.data == null) {
                    this.$router.push({name:'error_404'})
                }else{
                    this.storefrontList = result.data;
                    this.storefrontList.forEach(element => {
                        if(element.longitude != null && element.latitude != null){
                            path.push(new AMap.LngLat(element.longitude,element.latitude))
                            title.push(element.storefrontName);
                        }
                    });
                    var markers = [];
                    var markerList = [];
                    var circleList = [];
                    for (let index = 0; index < path.length; index++) {
                        var marker = new AMap.Marker({
                            position: path[index],   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
                            title: title[index],
                        })
                        markerList.push(marker)
                        markers.push(marker)
                        var circle = new AMap.Circle({
                            center: path[index], // 圆心位置
                            radius: 800,  //半径
                            strokeColor: "#F33",  //线颜色
                            strokeOpacity: 1,  //线透明度
                            strokeWeight: 1,  //线粗细度
                            fillColor: "#ee2200",  //填充颜色
                            fillOpacity: 0.35 //填充透明度
                        })
                        circleList.push(circle)
                    }
                    map.add(circleList);
                    map.add(markerList);
                    map.setFitView(markers);             
                }
            }).catch((result) => {
                this.$router.push({name:'error_404'})
            });
        }
    }
}
</script>
<style>
    #pickerBox {
        position: absolute;
        z-index: 9999;
        top: 80px;
        right: 30px;
        width: 300px;
    }

    #pickerInput {
        width: 230px;
    }
    
    .amap_lib_placeSearch .poibox.highlight {
        background-color: #CAE1FF;
    }
    
    .amap_lib_placeSearch .poi-more {
        display: none!important;
    }

    /* .weather{
        position: absolute;
        z-index: 9999;
        top: 150px;
        left: 20%;
    } */
</style>
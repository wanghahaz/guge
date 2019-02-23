<template>
	<div style="width:100%;height:70%;margin: 0 auto;" id="data_source_con">
	    
   </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    props:['Company'],
    data () {
        return {
            //
        };
    },
    mounted () {
//      this.$nextTick(() => {
//          
//      });
//      this.init();
        
    },
    watch:{
    	Company(news,old){
    		if(news){
    			this.init();
    		}
    	}
    },
    methods:{
    	init(){
    		//totalNumberRights,授出未行权总数
    		//totalNumPool,期权池总数
    		//exerciseEarnings,授出已行权总数
    		//totalNumberOptions,尚未发放期权总数
    		//impowerSharesNum,获受总数
    		var totalNumberRights,exerciseEarnings,totalNumberOptions = 0;
    		if(this.Company.totalNumPool == 0){
    			totalNumberRights = '0%';
    			exerciseEarnings = '0%';
    			totalNumberOptions = '0%';
    		}else{
    			//获受总数
    			totalNumberRights = this.Company.totalNumberRights / this.Company.totalNumPool * 100;
    			//期权池总数
	    		exerciseEarnings = this.Company.exerciseEarnings / this.Company.totalNumPool * 100;
	    		//获受总数
	    		totalNumberOptions = this.Company.totalNumberOptions / this.Company.totalNumPool * 100;
	    		
	    		
	    		totalNumberRights = parseFloat(totalNumberRights.toFixed(2)) + '%';
	    		exerciseEarnings = parseFloat(exerciseEarnings.toFixed(2)) + '%';
	    		totalNumberOptions = parseFloat(totalNumberOptions.toFixed(2)) + '%';
    		}
    		var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            const option = {
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['60%','80%'],
                        center: ['50%', '50%'],
                        data: [
                        	{value: this.Company.exerciseEarnings, name: '授出已行权总数'+this.Company.exerciseEarnings+'('+exerciseEarnings+')', itemStyle: {normal: {color: '#ffd58f'}}},
                            {value:	this.Company.totalNumberRights, name: '授出未行权总数'+this.Company.totalNumberRights+'('+totalNumberRights+')', itemStyle: {normal: {color: '#9bd598'}}},
                            {value: this.Company.totalNumberOptions, name: '尚未发放期权总数'+this.Company.totalNumberOptions+'('+totalNumberOptions+')', itemStyle: {normal: {color: '#abd5f2'}}}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            dataSourcePie.setOption(option);
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
    	},
    	
    }
};
</script>

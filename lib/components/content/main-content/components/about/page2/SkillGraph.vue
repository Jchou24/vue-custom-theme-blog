<template>
    <IEcharts
        class="pie-chart"
        :option="option"
        :loading="false"
        :styles="styles"
        
        ref="chart"
        />
</template>

<script>
    import IEcharts from 'vue-echarts-v3/dist/VueECharts.min.js'

    export default {
        name: "SkillGraph",
        components:{ 
            IEcharts,
        },
        data(){
            let data = [
                {
                    name: "Front-End",
                    children:[
                        "Javascript",
                        "Vue",
                        "NPM", 
                        "WebPack",
                        "Jquery",
                        "Html",
                        "Css",
                        "Bootstrap",
                    ]   
                },{
                    name: "Backend-End",
                    children:[
                        "IIS",
                        "C#",
                        "Python",
                        "Django",
                        "Flask",
                        "PostgreSQL",
                        "MongoDB",
                        "MSSQL",
                        "Linux",
                        "Windows",
                        "Microsoft Azure",
                    ]   
                },{
                    name: "Analytics",
                    children:[
                        "Data Mining",
                        "Topic Modeling",
                        "Deep Learning",
                    ]   
                },{
                    name: "Data Collection",
                    children:[
                        "Crawler",
                    ]   
                },{
                    name: "Others",
                    children:[
                        "TFS",
                        "Git(Bitbucket,Github)",
                        "Unit Test",
                    ]   
                }
            ]

            

            function BuildGraph(data){
                function GetLink(source,target){
                    return {
                        source: parseInt(source),
                        target: parseInt(target),
                    }
                }

                function GetNode(id,category,name,symbolSize){
                    return {
                        id: parseInt(id),
                        category: parseInt(category),
                        name: name,
                        symbolSize: symbolSize,
                        label: {show: true}
                    }
                }

                let id = 0
                let categories = [];
                let links = []
                let nodes = []
                let category_size = 30
                let subcategory_size = 20

                for( let i in data ){
                    let category = data[i]
                    categories[i] = {
                        name: category.name
                    };

                    category.id = id++
                    nodes.push(GetNode(category.id, i, category.name, category_size))
                    for( let child_name of category.children ){
                        let node_id = id++
                        nodes.push(GetNode(node_id, i, child_name, subcategory_size))
                        links.push(GetLink(node_id, category.id))
                    }                    
                }

                for (let i = 0; i < data.length-1; i++) {
                    links.push(GetLink(data[i].id, data[i+1].id))                    
                }

                return {
                    categories,
                    links,
                    nodes,
                }
            }

            let graph_data = BuildGraph(data)
            console.log(graph_data)

            return {
                option:{
                    legend: [{
                        // selectedMode: 'single',
                        data: []
                    }],
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series : [
                        {
                            name: 'Les Miserables',
                            type: 'graph',
                            layout: 'force',
                            data: graph_data.nodes,
                            links: graph_data.links,
                            categories: graph_data.categories,
                            roam: true,
                            focusNodeAdjacency: true,
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 5,
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            },
                            label: {
                                position: 'right',
                                formatter: '{b}',
                                fontWeight: "bold",
                                color: '#777',
                            },
                            lineStyle: {
                                color: 'source',
                                width: 3,
                                curveness: 0. // 線的歪曲程度
                            },
                            force: {
                                repulsion: 700 // node 的擴散程度
                            },
                            silent: true, // disable mouse event of node
                        }
                    ],
                },
                styles:{
                    // width: "100%",
                    // height: "100%",
                    width: "100vw",
                    height: "100vh",
                    // "min-height": "100vh",
                    // "min-height": "180px",
                }
            }
        },
    }
</script>

<style lang="scss">
    
</style>

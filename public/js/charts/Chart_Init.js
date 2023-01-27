export class Chart {
    constructor(node, option) {
        this.chart = echarts.init(
            node, 
            'dark', 
            {
                renderer:'svg'
            }
        );
        this.option = option;

        // Funciones al crear el gráfico
        this.chart.setOption(option);
        window.addEventListener('resize', () => {
            this.chart.resize();
        })
    };
};

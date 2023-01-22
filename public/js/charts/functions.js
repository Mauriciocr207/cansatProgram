
export function pushDataBarChart(chart = {}, newData) {
    const option = chart.getOption();
    option.series[0].data.push(newData);
    console.log(option);
}
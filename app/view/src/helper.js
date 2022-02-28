export const is_logged_in = () => {
    if (sessionStorage.getItem('access-token') != null && sessionStorage.getItem('access-token') != undefined) {
        return true
    }
    return false
}
export const colors=[
    '#FFFF00','#00FF00'
]
export const generate_graph_data = (data) => {
    console.log('devices length',data.length)
    let result=[]
    Array.from(data).forEach((item, idx) => {
        let temp_data = {
            ph_temp: (canvas) => {
                let ctx = canvas.getContext("2d");
                let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

                return {
                    labels: item.time,
                    datasets: [
                        {
                            label: "pH",
                            fill: true,
                            backgroundColor: gradientStroke,
                            borderColor: "#B21F1F",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: "#B21F1F",
                            pointBorderColor: "rgba(255,255,255,0)",
                            pointHoverBackgroundColor: "#B21F1F",
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: item.ph,
                        },
                        {
                            label: "Temp",
                            fill: true,
                            backgroundColor: gradientStroke,
                            borderColor: "#F6C81D",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: "#F6C81D",
                            pointBorderColor: "rgba(255,255,255,0)",
                            pointHoverBackgroundColor: "#F6C81D",
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: item.temp,
                        },
                        // {
                        //     label: "TDS",
                        //     fill: true,
                        //     backgroundColor: gradientStroke,
                        //     borderColor: "#296330",
                        //     borderWidth: 2,
                        //     borderDash: [],
                        //     borderDashOffset: 0.0,
                        //     pointBackgroundColor: "#296330",
                        //     pointBorderColor: "rgba(255,255,255,0)",
                        //     pointHoverBackgroundColor: "#296330",
                        //     pointBorderWidth: 20,
                        //     pointHoverRadius: 4,
                        //     pointHoverBorderWidth: 15,
                        //     pointRadius: 4,
                        //     data: item.tds,
                        // },
                    ],
                };
            },
            tds:(canvas) =>{
                let ctx = canvas.getContext("2d");
                let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                gradientStroke.addColorStop(0, "rgba(29,140,248,0)");
                return {
                    labels: item.time,
                    datasets: [
                        {
                            label: "TDS",
                            fill: true,
                            backgroundColor: gradientStroke,
                            borderColor: "#F6C81D",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: "#F6C81D",
                            pointBorderColor: "rgba(255,255,255,0)",
                            pointHoverBackgroundColor: "#F6C81D",
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: item.tds,
                        },
                    ],
                };
            },
            ph_temp_options: {
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    backgroundColor: "#f5f5f5",
                    titleFontColor: "#333",
                    bodyFontColor: "#666",
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
                },
                responsive: true,
                scales: {
                    yAxes: [
                        {

                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(29,140,248,0.0)",
                                zeroLineColor: "transparent",
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'pH & Temp'
                            },
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100,
                                padding: 20,
                                fontColor: "#9a9a9a",
                            },

                        },
                    ],
                    xAxes: [
                        {
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(29,140,248,0.1)",
                                zeroLineColor: "transparent",
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Time'
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "#9a9a9a",
                            },
                        },
                    ],
                },
            },
            tds_options: {
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    backgroundColor: "#f5f5f5",
                    titleFontColor: "#333",
                    bodyFontColor: "#666",
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
                },
                responsive: true,
                scales: {
                    yAxes: [
                        {
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(29,140,248,0.0)",
                                zeroLineColor: "transparent",
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'TDS'
                            },
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100,
                                padding: 20,
                                fontColor: "#9a9a9a",
                            },

                        },
                    ],
                    xAxes: [
                        {
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(29,140,248,0.1)",
                                zeroLineColor: "transparent",
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Time'
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "#9a9a9a",
                            },
                        },
                    ],
                },
            },
        };
        result.push(temp_data)
    })
    console.log(result)
    return result
}

export const generate_graph_data_new = (data) => {
    console.log('data',data)
    var ph_labels=[]
    var ph_datasets=[]
    var temp_labels=[]
    var temp_datasets=[]
    var tds_labels=[]
    var tds_datasets=[]
    let result={}
    for (const property in data) {
        // console.log(`${property}: ${data[property]}`);
        if(property == 'PH'){
            ph_labels=data[property][0]?.time
            Array.from(data[property]).forEach((element,idx) => {
                // console.log('okk',property,element.device_name)
                ph_datasets.push({
                    label: element.device_name,
                    fill: true,
                    // backgroundColor: gradientStroke,
                    borderColor: "#F6C81D",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#F6C81D",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#F6C81D",
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: element.ph,
                })
            });
        }
        else if(property=='TEMP'){
            temp_labels=data[property][0]?.time
            Array.from(data[property]).forEach((element,idx) => {
                console.log('okk',property,element.device_name)
                temp_datasets.push({
                    label: element.device_name,
                    fill: true,
                    // backgroundColor: gradientStroke,
                    borderColor: "#F6C81D",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#F6C81D",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#F6C81D",
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: element.temp,
                })
            });
        }
        else if(property=='TDS'){
            tds_labels=data[property][0]?.time
            Array.from(data[property]).forEach((element,idx) => {
                tds_datasets.push({
                    label: element.device_name,
                    fill: true,
                    // backgroundColor: gradientStroke,
                    borderColor: "#F6C81D",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#F6C81D",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#F6C81D",
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: element.tds,
                })
            });
        }
    }
    let temp_data = {
        ph: (canvas) => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

            return {
                labels: ph_labels,
                datasets: ph_datasets,
            };
        },
        temp: (canvas) => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

            return {
                labels: temp_labels,
                datasets: temp_datasets,
            };
        },
        tds:(canvas) =>{
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)");
            return {
                labels: tds_labels,
                datasets: tds_datasets,
            };
        },
        ph_options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                backgroundColor: "#f5f5f5",
                titleFontColor: "#333",
                bodyFontColor: "#666",
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
            },
            responsive: true,
            scales: {
                yAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.0)",
                            zeroLineColor: "transparent",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'pH'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            padding: 20,
                            fontColor: "#9a9a9a",
                        },

                    },
                ],
                xAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.1)",
                            zeroLineColor: "transparent",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9a9a9a",
                        },
                    },
                ],
            },
        },
        temp_options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                backgroundColor: "#f5f5f5",
                titleFontColor: "#333",
                bodyFontColor: "#666",
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
            },
            responsive: true,
            scales: {
                yAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.0)",
                            zeroLineColor: "transparent",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Temp'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            padding: 20,
                            fontColor: "#9a9a9a",
                        },

                    },
                ],
                xAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.1)",
                            zeroLineColor: "transparent",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9a9a9a",
                        },
                    },
                ],
            },
        },
        tds_options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                backgroundColor: "#f5f5f5",
                titleFontColor: "#333",
                bodyFontColor: "#666",
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
            },
            responsive: true,
            scales: {
                yAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.0)",
                            zeroLineColor: "transparent",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'TDS'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            padding: 20,
                            fontColor: "#9a9a9a",
                        },

                    },
                ],
                xAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.1)",
                            zeroLineColor: "transparent",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9a9a9a",
                        },
                    },
                ],
            },
        },  
    };
    result=temp_data
    console.log(result)
    return result
}
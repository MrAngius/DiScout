// COLORS
const COLORS = ['#f5b041','#f4d03f','#58d68d','#52be80','#45b39d','#48c9b0','#2874a6','#1f618d','#6c3483'];
const COLORS2 = ['#aed6f1','#a9cce3','#d2b4de','#d7bde2','#f5b7b1','#e6b0aa','#fad7a0','#f9e79f','#abebc6'];
const COLORS3 = ['#a9dfbf','#a2d9ce','#a3e4d7','#5dade2','#5499c7','#a569bd','#af7ac5','#ec7063','#cd6155'];

// ######## GRAPH ##########
function addTrace(fileID, name){

    Plotly.d3.csv("./data_graphs_production/data_products/data_" + fileID +".csv", function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        let traceAdd = {
            type: "scatter",
            name: name,
            showlegend: true,
            mode: "lines",
            x: unpack(rows, 'date'),
            y: unpack(rows, 'value'),
            line: {color: COLORS[countTraces]}
        };
        countTraces ++;
        Plotly.addTraces(graph, traceAdd);


    });
}

function removeTrace(flush) {

    if (!flush){
        Plotly.deleteTraces(graph, -1);
        countTraces --;
    } else {
        while (countTraces !== 0){
            Plotly.deleteTraces(graph, -1);
            countTraces --;
        }
    }
}

function showHideRangeSlider(){

    let update = {
        'xaxis.rangeslider.visible': sliderHide
    };

    sliderHide = !sliderHide;

    Plotly.relayout(graph, update);
}

// IMPROVEMENT: improve the graph style
function updateGraph(fileID, mode) {
    // I need to retrieve the file from the fileID
    // TODO: take the id passed to the function and then update the graph

    // now if there is already a second trace we need to remove it first and then
    // get the data associated with the graph
    // IMPROVEMENT: possible to add multiple objects comparison

    if (mode === "comparison"){
        if (countTraces > 1){
            removeTrace(false)
        }
        addTrace(fileID, "Compared");

    } else {
        removeTrace(true);
        addTrace(fileID, "Tracked")
    }

    if (sliderHide) {
        showHideRangeSlider();
    }

}

function setHistory(month) {
    let update;

    console.log(month);

    switch (month){
        case 1:
            update = {
                'xaxis.range': ['2017-12-01 00:00:00', '2017-12-31 23:59:59']
            };
            break;
        case 3:
            update = {
                'xaxis.range': ['2017-10-01 00:00:00', '2017-12-31 23:59:59']
            };
            break;
        case 6:
            update = {
                'xaxis.range': ['2017-7-01 00:00:00', '2017-12-31 23:59:59']
            };
            break;
        default:
            update = {
                'xaxis.range': ['2017-12-01 00:00:00', '2017-12-31 23:59:59']
            };
            break;
    }
    Plotly.relayout(graph, update);
}

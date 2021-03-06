// Made with template from https://codepen.io/bcd/pen/BdJXpP by Branden for inital
// There is a bug where the slider and the buttons work independently from each other
Plotly.d3.csv("nicCage.csv", function (rows) {
    // animationSpeed applied to duration and transition values 
    var animationSpeed = 350

    // This helper unpacks data from csv
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
    var x = unpack(rows, 'title')
    var y = unpack(rows, 'averageRating')
    var year = unpack(rows, 'year')

    // create frames to allow animation
    var frames = []
    for (i=0; i<x.length; i++) {
        frames[i] = { data: [{ x: [], y: [] }] }
        frames[i].data[0].x = x.slice(0, i + 1);
        frames[i].data[0].y = y.slice(0, i + 1);
    }

    // create slider ticks for slider
    var sliderSteps = []
    for (i = 0; i < frames.length; i++) {
        sliderSteps.push({
            method: 'animate',
            label: year[i],
            args: [[frames[i]], {
                mode: 'immediate',
                fromcurrent: true,
                transition: { duration: animationSpeed },
                frame: { duration: animationSpeed, redraw: true }
            }]
        })
    }


    var data = [{
        type: "scatter",
        mode: "lines+markers",
        x: frames[0].data[0].x,
        y: frames[0].data[0].y,
        line: { 
            color: 'steelblue' 
        },
        marker: { 
            size: 6 
        },
        text: year,
        hovertemplate: "Title: <b>%{x}</b>" + "<br>Year: <b>%{text}</b>" + "<br>Rating: <b>%{y}</b><extra></extra>"
    }]

    
    var layout = {
        //hardcoded the size to make sure it's in the correct proportion
        autosize: false,
        width: 1920,
        height: 900,
        title: "Nicolas Cage's Inconsistent Acting Career",
        titlefont: {
            size: 45,
            family: "serif"
        },
        font: {
            size: 12
        },
        xaxis: {
            title: "",
            rangemode: "tozero",
            // -1 to range to make sure first marker is not clipped
            range: [-1, 84],
            tickangle: 45
        },
        yaxis: {
            title: "Average Rating",
            range: [0, 10],
            rangemode: "tozero"
        },
        showlegend: false,
        annotations: [
            {
                text: "Hold down left-click on graph to zoom in on an area",
                showarrow: false,
                xanchor: "right",
                x: 84,
                y: 0.5,
                font: {
                    size: 10
                }
            },
            {
                text: "Hold down left-click on an axis to pan",
                showarrow: false,
                xanchor: "right",
                x: 84,
                y: 0.2,
                font: {
                    size: 10
                }
            },
            {
                text: "Source from IMDB at https://www.imdb.com/interfaces/",
                showarrow: false,
                xanchor: "left",
                x: 0,
                y: 0.2,
                font: {
                    size: 10
                }
            }
        ],
        updatemenus: [{
            x: 0,
            y: 0,
            yanchor: "top",
            xanchor: "center",
            showactive: false,
            direction: "left",
            type: "buttons",
            pad: { 
                "t": 237, "r": 10 
            },
            buttons: [{
                method: "animate",
                args: [null, {
                    mode: 'immediate',
                    fromcurrent: true,
                    transition: {
                        duration: animationSpeed,
                    },
                    frame: {
                        duration: animationSpeed,
                        redraw: true
                    }
                }],
                label: "Play"
            }, {
                method: 'animate',
                args: [[null], {
                  mode: 'immediate',
                  transition: {duration: 0},
                  frame: {duration: 0, redraw: false}
                }],
                label: 'Pause'
            }]
        }],
        // Add slider
        sliders: [{
            pad: { 
                l: 60, t: 200 
            },
            currentvalue: {
                visible: true,
                prefix: '',
                xanchor: 'center',
                font: { size: 20, color: 'black' }
            },
            steps: sliderSteps
        }]
    };

    Plotly.newPlot('datavis', data, layout, {displayModeBar: false}).then(function () {
        Plotly.addFrames('datavis', frames);
    });
    
})

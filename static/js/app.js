// store the url as a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// fetch the json data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });

// display the default (first sample) plots
function init() {

    // use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // use D3 to get sample names and populate the dropdown options
    d3.json(url).then((data) => {

        // set up an array of id names
        let names = data.names;

        // iterate through the array
        names.forEach((id) => {
            // the following appends each subject's name as an option to the dropdown in the html file
            dropdownMenu.append('option').text(id).property('value', id);
        });

        // assign the first id name to a variable called name
        let name = names[0];

        // console log the first sample id name
        console.log(name);

        // introduce the bar chart, bubble chart, and demographic metadata panel with the first sample's data (ID=940)
        bar(name);
        bubble(name);
        demo(name);

    });
}

// make the bar chart
function bar(selectedID) {

    d3.json(url).then((data) => {

        // access the sample data
        let samples = data.samples;

        // create a filter that retrieves the microbial data of a selected sample
        let values = samples.filter(id => id.id == selectedID);
        
        // retrieve the first entry data
        let first_values = values[0];

        // console log the first entry data
        console.log(first_values);

        // store the first 10 observations of the retrieved microbial data
        let sample_values = first_values.sample_values.slice(0,10);
        let otu_ids = first_values.otu_ids.slice(0,10);
        let otu_labels = first_values.otu_labels.slice(0,10);

        // console log the first 10 observations
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        // trace for a bar chart
        let bar_trace = {
            x: sample_values.reverse(),
            y: otu_ids.map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: otu_labels.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        // turn the trace data into an array
        let bar_data = [bar_trace]
        
        // layout for the bar chart
        let layout = {
            title: "Top Ten OTUs",
            xaxis: {title: 'Microbial Count'},
            yaxis: {title: 'OTU ID'}
        };

        // plot the chart
        Plotly.newPlot('bar', bar_data, layout);
    });

}

// make the bubble chart
function bubble(selectedID) {

    d3.json(url).then((data) => {

        // access the sample data
        let samples = data.samples;

        // create a filter that retrieves the microbial data of a selected sample
        let values = samples.filter(id => id.id == selectedID);
        
        // retrieve the first entry data
        let first_values = values[0];

        // console log the first entry data
        console.log(first_values);

        // store the filtered data
        let sample_values = first_values.sample_values;
        let otu_ids = first_values.otu_ids;
        let otu_labels = first_values.otu_labels;

        // console log the filtered values
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        // trace for a bubble chart
        let bubble_trace = {
            x: otu_ids.reverse(),
            y: sample_values.reverse(),
            text: otu_labels.reverse(),
            mode: 'markers',
            marker: {size: sample_values, color: otu_ids}
        };

        // layout for the chart
        let layout = {
            title: "Microbial Makeup of the Selected Subject",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Microbial Count'}
        };

        // plot the chart
        Plotly.newPlot('bubble', [bubble_trace], layout);
    });    
}

// make the demographic information panel
function demo(selectedID) {

    d3.json(url).then((data) => {

        // access the meta data
        let meta = data.metadata;

        // create a filter that retrieves the demographic data
        let values = meta.filter(id => id.id == selectedID);

        // store the first entry data
        let first_values = values[0];

        // console log the first entry data
        console.log(first_values);

        // (if selected a sample previously) reset the demographic information panel with an empty string
        d3.select('#sample-metadata').html('');
  
        // add each key-value pair to the panel
        Object.entries(first_values).forEach(([key,value]) => {
            // select the demographic info section of the html file and append each key-value pair
            d3.select('#sample-metadata').append('h3').text(`${key}: ${value}`);
        });
    });
}

// define a function that updates the charts when the dropdown option changes
function optionChanged(selectedID) {
    bar(selectedID);
    bubble(selectedID);
    demo(selectedID)
}

init();
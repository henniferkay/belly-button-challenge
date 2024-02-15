# belly-button-challenge

## Background
The aim of this project was to build an interactive online dashboard that explores the human navel (belly button) microbiome.

## Methods
The webpage was designed and laid out in HTML (open `index.html`). 

The interactive dashboard was programmed in JavaScript (see `app.js` within `static/js` to see how we coded) and consisted of:

1. a dropdown menu with all the test subjects to select from (showing data for one unique individual at a time)

2. a horizontal bar chart showing the top 10 OTUs (operational taxonomic units) of a particular individual

3. a bubble chart showing a selected subject's microbial species and counts

4. a panel displaying a selected subject's metadata, i.e., an individual's demographic information

The microbial and demographic data of the study subjects were fetched from a JSON file using the D3 class of JavaScript. The dropdown menu, bar chart, bubble chart, and demographic panel were all set up using the first sample (subject)'s data before adding a function at the end of the code where the dashboard is refreshed when the user selects a different subject.  

The bar and bubble charts were plotted via the Plotly library, while the metadata were organized using the Object.entries() static method that returns an array of a given object's own enumerable string-keyed property key-value pairs. 
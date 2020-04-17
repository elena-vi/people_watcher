var peopleChart = {
  interval: 0, // 1000 = 1 second, 3000 = 3 seconds
  labels: [],
  femaleData: [],
  maleData: [],
  totalData: [],
  chart: '',
  init: function(ctx) {
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Female',
          data: this.femaleData,
          fill: false,
          backgroundColor: '#A52A2A',
          borderColor:'#A52A2A',
        }, {
          label: 'Male',
          data: this.maleData,
          fill: false,
          backgroundColor: '#4169E1',
          borderColor: '#4169E1',
        }, {
          label: 'Total',
          data: this.totalData,
          fill: false,
          backgroundColor: '#006400',
          borderColor: '#006400',
        }
      ]
    },
  });
  this.getData()
},
getData: function() {
  var parent = this;
  $.ajax({
    type: 'GET',
    url: '/data',
    data: $(this).serialize(),
    dataType: 'json',
    success: function (people) {
      $('#hidden').val(JSON.stringify(people));// first set the value
      peopleChart.updateData(people)
      peopleChart.redrawChart()
    },
    complete: function (data) {
      setTimeout(peopleChart.getData, peopleChart.interval);
    }
  });
},
updateData: function(people) {
  // if (this.femaleData[this.femaleData.length - 1] != people.total_female) {
  //   peopleChart.femaleData.push(people.total_female)
  // }
  // if (this.maleData[this.maleData.length - 1] != people.total_male) {
  //   peopleChart.maleData.push(people.total_male)
  // }
  if (this.totalData[this.totalData.length - 1] != people.total) {
    this.totalData.push(people.total)
    this.chart.data.labels = this.incrementLabels();
  }
},
incrementLabels: function() {
  var dt = new Date();
  this.labels.push(`${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`);
  return this.labels
},

redrawChart: function(dataPoint) {
  this.chart.update({easing: 'easeInOutBack'});
}
};

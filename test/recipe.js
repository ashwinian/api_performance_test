var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
const { PerformanceObserver, performance, PerformanceEntry } = require('perf_hooks');


var baseUrl = "https://www.themealdb.com/api/json/v1/1/search.php?";


function displayTime(numInms) {
    perfTime = (numInms>=1000)?((Math.floor(numInms/1000)>=60)?roundTonearestdec(numInms/1000/60)+"m":roundTonearestdec(numInms/1000)+'s'):roundTonearestdec(numInms)+'ms';
    return perfTime;
}

function roundTonearestdec(num, x=2) {
    return num.toFixed(x);
}


describe("performance and rest API test",function(){
	this.timeout(20000);

	const obs = new PerformanceObserver((items, observer) => {
        console.log('Performance Observer')
        console.log("items:"+items.getEntries()[0].name)
        //console.log('Duration:'+displayTime(items.getEntries()[0].duration));
        let getDuration = items.getEntries()[0].duration;
        console.log('api response time:'+displayTime(getDuration));
         });
    obs.observe({ entryTypes: ['measure'], buffered: true });

  it("performance test",function(done){
  	performance.mark('A');
    request.get(
      {
        url : baseUrl + "s=souffle"
      },
      function(error, response, body){

        performance.mark('B');
        performance.measure('recipeGet', 'A', 'B');

        expect(response.statusCode).to.equal(200);

        done(); 
      }
    );
  });

 
});
xlsxj = require("xlsx-to-json");
  xlsxj({
    input: "urbanspatial-hist-urban-pop-3700bc-ad2000-xlsx.xlsx",
    output: "output.json",
    sheet: "Historical Urban Population"
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      console.log(result);
    }
  });

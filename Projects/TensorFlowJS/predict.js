// This code performs the image classification by loading MobileNet model at client-end
// Paltform used: Tensorflow.js, jquery, HTML
// Referred: https://deeplizard.com/, https://www.tensorflow.org/


$("#image-selector").change(function () {
	$("#selected-image").css("display", "block");
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop("files")[0];
    reader.readAsDataURL(file);
    
}); 


$("#model-selector").change(function () {
    loadModel($("#model-selector").val());
});

let model;
async function loadModel(name) {
    $(".progress-bar").show();
    model = undefined;
    model = await mobilenet.load();
    $(".progress-bar").hide();
}

$("#predict-button").click(async function () {
    let image = $("#selected-image").get(0);
    let modelName = $("#model-selector").val();
	let predictions = await model.classify(image);
	console.log(predictions);
	let top5 = Array.from(predictions)
	    .map(function (p, i) {
	        return {
	            probability: p.probability,
	            className: p.className
	        };
	    });
	$("#prediction-list").empty();
	top5.forEach(function (p) {
	    $("#prediction-list").append(`<li>${p.className}: ${p.probability}</li>`);
	});
});


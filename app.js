var g = G$("Minh", "Vu");

$("#login").click(function() {
    var loginGrtr = G$("John", "Doe");

    loginGrtr.setLang($("#lang").val()).HTMLGreeting("#greeting", true).log();
});
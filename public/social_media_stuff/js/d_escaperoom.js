$(function () {

   

    $(".banana").on("click", function () {
        console.log("banana");
        $("#twitterFeed").addClass("hide");
        $("#banana").removeClass("hide");
    })

    $(".orange").on("click", function () {
        console.log("orange");
        $("#twitterFeed").addClass("hide");
        $("#orange").removeClass("hide");
    })

    $(".meloni").on("click", function () {
        console.log("meloni");
        $("#twitterFeed").addClass("hide");
        $("#meloni").removeClass("hide");
    })


    $(".twitterProfiiliNavi .palaa").on("click", function () {
        console.log("palaa");
        $("#twitterFeed").removeClass("hide");
        $(".profiili").addClass("hide");
    })

    ////// TEKEE FACEBOOKIN ILMOITUKSEN TEKSTIN JA NAPPIEN TOIMINNALLISUUDET 

    $(".facebookMeta").on("click", function () {

        $(".facebookPost").addClass("hide");
        $(".facebookMessage").removeClass("hide");
        $(".facebookMessage").html('<div class="linkkiotsikko">Kiitos ilmoituksesta</div><p>Suhtaudumme vakavasti valeuutisiin. Hieoa, että autat meitä jaada jaada jaa.. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p><p>Ilmoituksesi arkistointikoodi on <b>' + $(this).data("id") + '</b>.     Ota koodi talteen, saatat tarvita sitä.</p><div class="messageNapit"><div class="facebookButton peliin">Palaa huoneeseen</div><div class="facebookButton facebookiin">Palaa Facebookiin</div></div>');

        $(".peliin").one("click", function () {
            // DO STUFF
            console.log("## peliin ##");
        });

        $(".facebookiin").one("click", function () {
            $(".facebookPost").removeClass("hide");
            $(".facebookMessage").addClass("hide");
            console.log("## facebookiin ##");
        });
    })

    ////// DEMON NAPIT, EI LIITY VARSINAISEEN PELIIN 

    $("#twit").on("click", function () {
        console.log("twitter");
        $("#parentTwitterWrapper").removeClass("hide");
        $("#parentCameraWrapper").addClass("hide");
        $("#parentFacebookWrapper").addClass("hide");
    })

    $("#kamera").on("click", function () {
        console.log("kamera");
        $("#parentCameraWrapper").removeClass("hide");
        $("#parentTwitterWrapper").addClass("hide");
        $("#parentFacebookWrapper").addClass("hide");
    })

    $("#facebook").on("click", function () {
        console.log("kamera");
        $("#parentFacebookWrapper").removeClass("hide");
        $("#parentTwitterWrapper").addClass("hide");
        $("#parentCameraWrapper").addClass("hide");
    })

});
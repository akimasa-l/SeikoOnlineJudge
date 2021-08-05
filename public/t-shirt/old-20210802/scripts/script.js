const student_council = /^student_council@seiko.ac.jp$/;
const parent = /^p\d{5}[a-zA-Z]+@seiko.ac.jp$/;
const student = /^\d{5}[a-zA-Z]+@seiko.ac.jp$/;
const teacher = /^.*@seiko.ac.jp$/;
function accountCategory(email) {
    if (student_council.test(email)) {
        return "生徒会";
    }
    if (parent.test(email)) {
        return "保護者";
    }
    if (student.test(email)) {
        return "生徒";
    }
    if (teacher.test(email)) {
        return "教師";
    }
}
function number(email) {
    if (parent.test(email)) {
        return email.substring(1, 6);
    }
    if (student.test(email)) {
        return email.substring(0, 5);
    }
    return "0";
}
const spreadsheetId = "1ZIm52Zxw7279DpDCT4TqPSG3T6_6mokVgK6y2xaS4C8";
const range = "'A.全校名簿'!$A$1:$E$1156";
const apiURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=AIzaSyCdPSh0oLF96YaVxrA_2qhNszC7wd_FtTg"`;
const method = "GET";
$(
    function () {
        $("p#continue a").on("click", () => {
            $("div#warning").fadeOut("slow");
        });
    }
);
$(
    () => {
        $("a#logout").on("click", () => {
            firebase.auth().signOut()
        });
    }
)
$(() => {
    firebase.auth().onAuthStateChanged(user => {

        if (user) {
            user.getIdTokenResult(true).then(function(idTokenResult) {
                console.log("idTokenResult:"+JSON.stringify(idTokenResult,undefined,4));
                const accesstoken=idTokenResult.token;
                $.ajax({
                    url: apiURL,
                    type: method,
                    headers: {
                        "Authorization": `Bearer ${accesstoken}`,
                    },
                    error: (xhr, textStatus, errorThrown) => {
                        console.log(xhr.responseText);
                        console.log(xhr.getAllResponseHeaders());
                        $("p#error").text(errorThrown);
                        $("div#loading").fadeOut("slow");
                    },
                    success: (data, dataType) => {
                        console.log(data);
                        $("div#loading").fadeOut("slow");
                    },
                });
              });
            const userJson = user.toJSON();
            const text = JSON.stringify(userJson, undefined, 4);
            console.log(text);
            if (user.email[0] != "p") {// if student or teacher
                const category = accountCategory(user.email);
                $("#waring-title").html(`現在、<wbr>${category}<wbr>アカウント<wbr>で<wbr>ログイン<wbr>して<wbr>います。`)
                $("p#waring-message").html("残念ながら、<wbr>この<wbr>サイトは<wbr>保護者<wbr>アカウント<wbr>のみ<wbr>ご利用<wbr>いただけます。<wbr>送信<wbr>したい<wbr>場合は、<wbr>保護者<wbr>アカウント<wbr>で<wbr>ログイン<wbr>して<wbr>ください。");
                // $("p#waring-message").text("保護者アカウントでこいよ～～～～");
                $("div#links").show();
            } else {
                $("div#warning").hide();
            }
            /* gapi.client.init({
                apiKey: "AIzaSyCdPSh0oLF96YaVxrA_2qhNszC7wd_FtTg",
                clientId: "826450531725-7li2vbpd3bpu3b5lr3bpcbidsdpmqhtk.apps.googleusercontent.com",
                discoveryDocs: "https://sheets.googleapis.com/$discovery/rest?version=v4",
                scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
            }).then() */
            $("a#email").text(user.email);
            $("a#email").attr("href", `mailto:${user.email}`);
            const n = number(user.email);
            const accesstoken = userJson.stsTokenManager.accessToken;
            console.log("accesstoken: " + accesstoken)
            /* $.ajax({
                url: URL,
                type: method,
                headers: {
                    "Authorization": `Bearer ${accesstoken}`,
                },
                error: (xhr, textStatus, errorThrown) => {
                    console.log(xhr.responseText);
                    console.log(xhr.getAllResponseHeaders());
                    $("p#error").text(errorThrown);
                    $("div#loading").fadeOut("slow");
                },
                success: (data, dataType) => {
                    console.log(data);
                    $("div#loading").fadeOut("slow");
                },
            }); */
            $("a#number").text(n);
            $("a#name").text(user.displayName);
        } else {
            $("#waring-title").html("ログイン<wbr>されて<wbr>いません。");
            $("p#waring-message").text("保護者アカウントでこいよ～～～～");
            $("div#links").show();
            $("p#continue").hide();
            $("div#loading").fadeOut("slow");
        };
    });
});
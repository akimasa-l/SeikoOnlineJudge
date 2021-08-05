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
const range = "'A.全校名簿'!$A$1:$E$1161";
const apiURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=AIzaSyCdPSh0oLF96YaVxrA_2qhNszC7wd_FtTg"`;
const method = "GET";
$(
    function () {
        $("p#continue a").on("click", () => {
            $("div#warning").fadeOut("slow");
        });
    }
);

const getValue = (response, n) => {
    const result = response.result;
    const sheetValues = result.values;
    sheetValues.shift();
    console.log("const sheetValues=\n" + JSON.stringify(sheetValues, undefined, 4))
    var ok = 0, ng = sheetValues.length;
    while (ok + 1 < ng) {//にぶたん！！！！！！うおおおおおおおおおおおおおおおおおおおお
        const h = Math.floor((ok + ng) / 2);
        if (Number(sheetValues[h][0]) <= n) {
            ok = h;
        } else {
            ng = h;
        }
    }
    return [sheetValues, ok]
}

const getValues = () => {
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    }).then(response => {
        // console.log(JSON.stringify(response, undefined, 4));
        return response;
    });
};

const makeTableRow = array => array?array.map(ele => "<td>" + ele + "</td>").join(""):[0,1,2,3,4].map(()=>"<td>undefined</td>").join("");

const displayTShirtAndFadeOut = n => {
    const sheetValues = getValues();
    sheetValues.then(response => {
        const [sheetsdata, ok] = getValue(response, n);
        console.log(sheetsdata[ok], ok);
        /* for (var i = ok - 2; i < ok + 3; i++) {

        } */
        var i = ok - 2
        $("table#t-shirt tbody tr:has(td)").each((index, element) => {
            $(element).html(makeTableRow(sheetsdata[i]))
            i++;
        })
    }).then(() => $("div#loading").css("cursor","progress").fadeOut("slow")
    )
}

const logout = () => {
    gapi.auth2.getAuthInstance().signOut().then(firebase.auth().signOut)
}
$(
    () => {
        $("a#logout").on("click", () => {
            logout();
        });
    }
)
const show = (email, name) => {
    if (email[0] != "p") {// if student or teacher
        const category = accountCategory(email);
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
    $("#email").text(email);
    // $("#email").attr("href", `mailto:${email}`);
    const n = number(email);

    $("a#number").text(n);
    $("a#name").text(name);
    displayTShirtAndFadeOut(n);
}
const logined = () => {
    console.log("login!")
}
const unlogined = () => {
    $("#waring-title").html("ログイン<wbr>されて<wbr>いません。");
    $("p#waring-message").text("保護者アカウントでこいよ～～～～");
    $("div#links").show();
    $("p#continue").hide();
    $("div#loading").css("cursor","progress").fadeOut("slow");
}

function initClient() {
    console.log("function initClient was called.");
    gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: discoveryDocs,
        clientId: clientId,
        scope: scopes,
    })
        .then(() => {
            const GoogleAuth = gapi.auth2.getAuthInstance();
            if (GoogleAuth) {
                if (GoogleAuth.isSignedIn.get()) {
                    const GoogleUser = GoogleAuth.currentUser.get()
                    const BasicProfile = GoogleUser.getBasicProfile();
                    const email = BasicProfile.getEmail();
                    const name = BasicProfile.getName();
                    // console.log("email: " + email);
                    logined();
                    show(email, name);
                }
                else {
                    unlogined()
                }
            }
        })
}
gapi.load('client:auth2', initClient);
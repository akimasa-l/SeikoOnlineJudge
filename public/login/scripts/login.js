$(function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    /* provider.setCustomParameters({
        "hd": "seiko.ac.jp",
    }); */
    firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function ({ user }) {
            $("#status")
                .text(`ログイン済 (${user.email})`);
        })
        .catch(function (error) {
            $("#status")
                .text(`ログインエラー (${error.message})`);
        });
}
);
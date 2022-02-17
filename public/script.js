// fetch("/bye").then((resp) => resp.json()).then((resp) => {
//     console.log(resp.name);
// });

fetch("/hi", {
    method: "post",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        name: "Mike",
    })
}).then((resp) => resp.json()).then((resp) => {
    console.log(resp.name);
});
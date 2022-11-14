document.getElementById("button").onclick = () => {
    fetchData("saveData", { age: 21, name: "John Doe" }).then((res) => {
        if (!res) return;

        console.log(res);
    });
};

const fetchData = (action, data) => {
    if (!action || !data) return;

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
    };

    const resourceName = window.GetParentResourceName ? window.GetParentResourceName() : "lb-phone-app-template"; //INSERT YOUR RESOURCE NAME HERE

    return new Promise((resolve, reject) => {
        fetch(`https://${resourceName}/${action}`, options)
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((e) => {
                return reject("Failed to fetch server (IS THE RESOURCE NAME SET CORRECTLY IN 'script.js'?)");
            });
    });
};

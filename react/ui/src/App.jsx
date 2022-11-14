import "./App.css";

const App = () => {
    return (
        <div className="app">
            <button onClick={() => fetchData("saveData", { age: 20, name: "John Doe" })}>Press to fetch?</button>
        </div>
    );
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

    const resourceName = window.GetParentResourceName ? window.GetParentResourceName() : "lb-phone-app-template-react"; //INSERT THE APP RESOURCE NAME HERE

    return new Promise((resolve, reject) => {
        fetch(`https://${resourceName}/${action}`, options)
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((e) => {
                return reject("Failed to fetch server (IS THE RESOURCE NAME SET CORRECTLY?)");
            });
    });
};

export default App;

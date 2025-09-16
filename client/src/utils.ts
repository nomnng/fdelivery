function fetchJson(url: string, json: any, onData: (data: any) => void) {
	fetch(url, {method: "POST", body: JSON.stringify(json), headers: {"Content-Type": "application/json"}})
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			return res.json();
		})
		.then(onData)
		.catch((err) => {
			console.log("Caught error:", err);
		});
}

export {
	fetchJson,
};
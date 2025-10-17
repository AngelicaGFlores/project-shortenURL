// Access token: 0233e996c6c7d9a40cbbf0d8c56c53fe4485f01b for bitly

//Access token: c67b160bd075d24a8f3c97d05f58cf8ef9019ef0
const longURLinput = document.getElementById(`usertextURL`);
const submitInput = document.getElementById(`submit`);
const listLinksUL = document.getElementById(`section-list`);
//array of links
const arrayLinks = [];

// after user submit
submitInput.addEventListener("click", async () => {
	console.log(`This is the URL : ${longURLinput.value}`);
	const longURL = longURLinput.value;
	// try catch...
	try {
		const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
			method: "POST",
			headers: {
				Authorization: `Bearer c67b160bd075d24a8f3c97d05f58cf8ef9019ef0`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				long_url: longURL,
				domain: "bit.ly",
			}),
		});

		const data = await response.json();
		console.log(data.link);
		// lets add to the array
		arrayLinks.push({
			link: data.link,
			long: data.long_url,
		});
		arrayLinks.forEach((link) => {
			//display that current array in html/css
			let listItem = document.createElement("li");
			//add a button, that button needs to copy short link
			listItem.innerHTML = `<li>${link.long} ${link.link}</li>`;
			//create copy button
			const button = document.createElement("button");
			button.textContent = "copy";
			listItem.appendChild(button);
			listLinksUL.appendChild(listItem);

			//when user taps copy
			button.addEventListener("click", () => {
				//copy the short url link to clipboard
				navigator.clipboard.writeText(link.link);
				console.log(link.link + " this is the new update");
				button.textContent = "done!";
			});
		});
	} catch (error) {
		console.error(error);
	}
});

//how to use copy to clip board search it up
// be able to copy the short link to the clip board when you click copy button

//save to local storage using dom

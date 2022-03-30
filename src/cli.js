import readline from "readline";
import fs from "fs";

export function cli(args) {
	console.log("Jack Humphries Blog Article Generator");

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const curDate = new Date();

	let answers = {
		title: "",
		slug: "",
		excerpt: "[REPLACE ME]",
		coverImage: "/images/default.jpg",
		date: curDate.toISOString(),
	};

	rl.question("Title: ", (answer) => {
		answers.title = answer;

		rl.question("URL Slug: ", (answer) => {
			answers.slug = answer;

			rl.question("Cover Image URL: ", (answer) => {
				if (answer.length >= 1) {
					answers.coverImage = answer;
				}

				const fContents = `---
title: "${answers.title}"
excerpt: "${answers.excerpt}"
coverImage: "${answers.coverImage}"
date: "${answers.date}"
ogImage:
    url: "${answers.coverImage}"
---

Write your article here
                `;

				fs.writeFileSync(`./${answers.slug}.md`, fContents);

				process.exit();
			});
		});
	});
}

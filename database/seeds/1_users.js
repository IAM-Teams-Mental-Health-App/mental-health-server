exports.seed = async function (knex) {
	await knex("users").insert([
		{
			email: "test1@test.com",
			username: "tester1",
			//bananas12!@
			password:
				"$2a$14$GpiQEHMfxhOIUSlOa9Bmu.Pp3mR93DK01VjZCQkLeQGDhwkqxKGM.",
		},
		{
			username: "tester2",
			//bananas12!@
			password:
				"$2a$14$GpiQEHMfxhOIUSlOa9Bmu.Pp3mR93DK01VjZCQkLeQGDhwkqxKGM.",
			email: "test2@test.com",
		},
	]);
};

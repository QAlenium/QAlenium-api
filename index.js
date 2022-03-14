const axios = require('axios');
const express = require("express");
const { Client } = require('pg');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8147;
const token = new Buffer("4da7c74aa1ff200588c80a5dd253c0e6258ff5a1:").toString('base64');

const client = new Client({
  connectionString: "postgres://yhtyldtgvzumzf:f4871ba25accfa2325581643bd5884791b4ef7bfc5e8d684afb32ee2b9d7c09c@ec2-34-231-183-74.compute-1.amazonaws.com:5432/d74vgtoqchbta2",
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(bodyParser.json());

client.connect();

app.listen(PORT, () => {
    console.log("Server running on port ${PORT}");
});

app.get("/listMethods", (req, res, next) => {
    res.json([
        "GET /owner",
        "GET /qalenium",
        "GET /sonarCloud/QAlenium",
        "GET /sonarCloud/gabs",
	    "GET /company/getCompanyByDeviceId",
	    "GET /company/getCompanyList",
	    "POST /company/createCompany",
        "POST /user/signin",
        "POST /user/signup",
	    "PUT /user/updateUser/user_id",
        "PUT /company/updateCompany/company_id"
        ]
    );
});

app.get("/owner", (req, res, next) => {
    res.json(
        {
            "name":"Gabriel Aguido Fraga",
            "gitHub":"https://github.com/kaapiel",
            "linkedIn":"https://www.linkedin.com/in/gabriel-aguido-fraga/",
            "instagram":"https://www.instagram.com/gabrielaguidofraga/",
            "sonarCloud":"https://sonarcloud.io/organizations/gabs",
            "cirlceCI":"https://circleci.com/gh/kaapiel/<PROJECT>",
            "slack":"to be created",
            "phoneNumber":"+1(514)621-2440"
        }
    );
});

app.get("/qalenium", (req, res, next) => {
    res.json(
        {
            "community":"QAlenium",
            "gitHub":"https://github.com/QAlenium",
            "linkedIn":"https://www.linkedin.com/company/qalenium",
            "instagram":"to be created",
            "sonarCloud":"https://sonarcloud.io/organizations/qalenium",
            "cirlceCI":"https://circleci.com/gh/QAlenium/<PROJECT>",
            "slack":"https://join.slack.com/t/qalenium/shared_invite/enQtOTU5MDY2MTQwOTY3LWYzNGFkMTU5MTFjMmMxYmUyNjkzY2RhYjViZDcxNWVmMzUyNjgxZWJmMGNjYTQ1MGRmMTQ2MGM4NDc5Y2E4MmQ",
            "phoneNumber":"to be created"
        }
    );
});

app.get("/sonarCloud/QAlenium", (req, res, next) => {

    //retrieve all projects as (List<String> "key")
    //
    //make another call for each project found using:
    //https://sonarcloud.io/api/issues/search?organization=qalenium&componentKeys=<KEY>
    //
    // Retrieve an object for each project containing:
    // - String project_name
    // - List<Issue> issues
    // - String language
    //
    // The issue must contain:
    // - String message
    // - String status
    // - String component (file)
    // - String severity
    // - String creation_date
    // - String type
    //
    //Append all projects as a json array (List<Project> projects)
    //return a json containing all projects information

    axios.get('https://sonarcloud.io/api/projects/search?organization=qalenium', {
        headers: {
            'Authorization':`Basic ${token}`
        }
    })
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.set(error)
        });

});

app.get("/sonarCloud/gabs", (req, res, next) => {

    //retrieve all projects as (List<String> "key")
    //
    //make another call for each project found using:
    //https://sonarcloud.io/api/issues/search?organization=gabs&componentKeys=<KEY>
    //
    // Retrieve an object for each project containing:
    // - String project_name
    // - List<Issue> issues
    // - String language
    //
    // The issue must contain:
    // - String message
    // - String status
    // - String component (file)
    // - String severity
    // - String creation_date
    // - String type
    //
    //Append all projects as a json array (List<Project> projects)
    //return a json containing all projects information

    axios.get('https://sonarcloud.io/api/projects/search?organization=gabs', {
        headers: {
            'Authorization':`Basic ${token}`
        }
    })
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.set(error)
        });
});

app.get("/company/getCompanyByDeviceId/:id", async (req, res, next) => {
    let response_text;
    let select_company_query = 'SELECT * FROM "companies" WHERE "company_id" = ' + req.params.id + ';';
    
    try {
        const select_company_query_result = await client.query(select_company_query);
        let results = select_company_query_result.rows;
        res.status(200).json(JSON.stringify(results));
        console.log(JSON.stringify(results));
    } catch (e) {
        res.status(500).json(e.detail);
        console.error(e.detail);
    }
});

app.get("/company/getCompanyList", async (req, res, next) => {
    let response_text;
    let select_company_query = 'SELECT * from "companies";';

    try {
        const select_company_query_result = await client.query(select_company_query);
        let results = select_company_query_result.rows;
        res.status(200).json(results);
        console.log(JSON.stringify(results));
    } catch (e) {
        res.status(500).json(e.detail);
        console.error(e.detail);
    }
});

app.post("/company/createCompany", async (req, res, next) => {
    let text = 'Request: ' + JSON.stringify(req.body);
    let insert_company_query = 'INSERT INTO "companies" (name, logo, flavour_color, login_git, login_apple, login_facebook, login_email) VALUES (\'' + req.body.name + '\', \'' + req.body.logo + '\', \'' + req.body.flavour_color + '\', \'' + req.body.login_git + '\', \'' + req.body.login_apple + '\', \'' + req.body.login_facebook + '\', \'' + req.body.login_email + '\');';
    let response_text;
    console.log(text);

    try {
        const insert_company_query_result = await client.query(insert_company_query);
        let results = insert_company_query_result.rows;
        res.status(200).json(JSON.stringify(results));
        console.log(JSON.stringify(results));
    } catch (e) {
        res.status(500).json(e.detail);
        console.error(e.detail);
    }
});

app.put("/company/updateCompany/:id", async (req, res, next) => {
    let text = 'Request: ' + JSON.stringify(req.body);
    let update_company_query = 'UPDATE "companies" SET name = \'' + req.body.name + '\', logo = \'' + req.body.logo + '\', flavour_color = \'' + req.body.flavour_color + '\', login_git = \'' + req.body.login_git + '\', login_apple = \'' + req.body.login_apple + '\', login_facebook = \'' + req.body.login_facebook + '\', login_email = \'' + req.body.login_email + '\' WHERE "company_id" = \'' + req.params.id + '\';';
    let response_text;
    console.log(text);
    
    try {
        const update_company_query_result = await client.query(update_company_query);
        response_text = 'Company updated.';
        res.status(200).json(response_text);
        console.log(JSON.stringify(response_text));
    } catch (e) {
        res.status(500).json(e.detail);
        console.error(e.detail);
    }
});

app.put("/user/updateUser/:id", async (req, res, next) => {
    let text = 'Request: ' + JSON.stringify(req.body);
    let update_user_query = 'UPDATE "users" SET auth = \'' + req.body.auth + '\', email = \'' + req.body.email + '\', company = \'' + req.body.company + '\', device_id = \'' + req.body.device_id + '\' WHERE "user_id" = \'' + req.params.id + '\';';
    let response_text;
    console.log(text);
    
    try {
        const update_user_query_result = await client.query(update_user_query);
        response_text = 'User updated.';
        res.status(200).json(response_text);
        console.log(JSON.stringify(response_text));
    } catch (e) {
        res.status(500).json(e.detail);
        console.error(e.detail);
    }
});

app.post("/user/signin", async (req, res, next) => {
    let select_user_query = 'SELECT * from "users" where "email" = \'' + req.body.email + '\';';
    let select_auth_query = 'SELECT "auth" from "users" where "email" = \'' + req.body.email + '\';';
    let response_text;

    try {
        const select_user_query_result = await client.query(select_user_query);
        if (select_user_query_result.rows == 0) {
            response_text = 'Error: Email not registered';
            console.log(response_text);
            res.status(500).json(response_text);
            return;
        } else {
            console.log("Email exists. Proceeding to login.");
        }
    } catch (e) {
        res.status(500).json(e.detail);
        console.error(e.detail);
    }
    
    try {
        const select_auth_query_result = await client.query(select_auth_query);

        if (select_auth_query_result.rows <= 0) {
            response_text = 'Error: No results for query -> ' + select_auth_query;
            res.status(500).json(response_text);
            console.log(response_text);
            return;
        }

        if (select_auth_query_result.rows[0].auth == new Buffer(req.body.email + ':' + req.body.auth).toString('base64')) {
            response_text = "User authenticated successfully."
            res.status(200).json(response_text);
            console.log(JSON.stringify(response_text));
        } else {
            response_text = 'Error: Invalid credentials';
            res.status(500).json(response_text);
            console.log(response_text);
        }
    } catch (e) {
        res.status(500).json(e.detail);
        console.error(e.detail);
    }

});

app.post("/user/signup", async (req, res, next) => {
    let select_user_query = 'SELECT * from "users" where "email" = \'' + req.body.email + '\';';
    let insert_user_query = 'INSERT INTO "users" (auth, email, company, device_id) VALUES (\'' + new Buffer(req.body.email + ':' + req.body.auth).toString('base64') + '\', \'' + req.body.email + '\', \'' + req.body.company + '\', \'' + req.body.device_id + '\');';
    let response_text;

    try {
        const select_user_query_result = await client.query(select_user_query);
        if (select_user_query_result.rows > 0) {
            response_text = 'Error: email already taken';
            res.status(500).json(response_text);
            console.log(response_text);
        } else {
            // validate valid email
            // validate valid json
            // validate all mandatory fields
            const insert_user_query_result = await client.query(insert_user_query);
            response_text = 'User created successfully';
            res.status(200).json(response_text);
            console.log(response_text);
        }
    } catch (e) {
        res.status(500).json(e.detail);
        console.error(e.detail);
    }
});

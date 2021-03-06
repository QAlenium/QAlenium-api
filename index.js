const axios = require('axios');
const express = require("express");
const { Client } = require('pg');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8147;
const token = new Buffer("4da7c74aa1ff200588c80a5dd253c0e6258ff5a1:").toString('base64');

const client = new Client({
  connectionString: "postgres://mblpsprusrumzx:757c99be78da1f86a65f3d1aba2d1cb90c93e493c41efd148809c9630873b972@ec2-3-209-61-239.compute-1.amazonaws.com:5432/dfocse6bo2u09p",
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
	    "PUT /user/updateUser/userId",
        "PUT /company/updateCompany/companyId"
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
    let select_user_query = 'SELECT * FROM "users" WHERE "deviceId" = ' + '\'' + req.params.id + '\'' + ';';

    try {
        const select_user_query_result = await client.query(select_user_query);
        let results = select_user_query_result.rows;
        let companies = [];

        if (results == 0) {
            res.status(200).json(JSON.stringify(results));
            console.log(JSON.stringify(results));
            return;
        } else {
            console.log('Starting companies queries series');
            
            for (user of results) {
                let select_companies_query = 'SELECT * FROM "companies" WHERE "companyId" = ' + user.companyId + ';';
                let select_companies_query_results = await client.query(select_companies_query);
                companies.push(select_companies_query_results.rows[0]);
            }
        }

        res.status(200).json(companies);
        console.log(JSON.stringify(companies));

    } catch (e) {
        res.status(500).json(e);
        console.error(e);
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
        res.status(500).json(e);
        console.error(e);
    }
});

app.get("/company/getCompanyByName/:name", async (req, res, next) => {
    let response_text;
    let select_company_query = 'SELECT * from "companies" WHERE "name" = \'' + req.params.name + '\';';

    try {
        const select_company_query_result = await client.query(select_company_query);
        let results = select_company_query_result.rows;
        res.status(200).json(results);
        console.log(JSON.stringify(results));
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
});

app.post("/company/createCompany", async (req, res, next) => {
    let text = 'Request: ' + JSON.stringify(req.body);
    let insert_company_query = 'INSERT INTO "companies" (' +
        '"name", "logo", "loginGit", "loginApple", "loginFacebook",' +
        ' "loginEmail", "primaryLightColor", "primaryLightVariantColor", "secondaryLightColor",' +
        ' "secondaryLightVariantColor", "primaryDarkColor",' +
        ' "primaryDarkVariantColor",' +
        ' "secondaryDarkColor", "secondaryDarkVariantColor",' +
        ' "continuousQualityUrl", "ciCdUrl",' +
        ' "boardKanbanUrl", "testingUrl",' +
        ' "messagingUrl") VALUES (\'' + req.body.name + '\', \'' + req.body.logo + '\', ' +
        '\'' + req.body.loginGit + '\', \'' + req.body.loginApple + '\', \'' + req.body.loginFacebook + '\', ' +
        '\'' + req.body.loginEmail + '\', \'' + req.body.primaryLightColor + '\', \'' + req.body.primaryLightVariantColor + '\', ' +
        '\'' + req.body.secondaryLightColor + '\', \'' + req.body.secondaryLightVariantColor + '\', \'' + req.body.primaryDarkColor + '\', ' +
        '\'' + req.body.primaryDarkVariantColor + '\', \'' + req.body.secondaryDarkColor + '\', \'' + req.body.secondaryDarkVariantColor + '\', ' +
        '\'' + req.body.continuousQualityUrl + '\', \'' + req.body.ciCdUrl + '\', \'' + req.body.boardKanbanUrl + '\', ' +
        '\'' + req.body.testingUrl + '\', \'' + req.body.messagingUrl + '\');';
    let response_text;
    console.log(text);

    try {
        const insert_company_query_result = await client.query(insert_company_query);
        let results = insert_company_query_result.rows;
        res.status(200).json(JSON.stringify(results));
        console.log(JSON.stringify(results));
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
});

app.put("/company/updateCompany/:id", async (req, res, next) => {
    let text = 'Request: ' + JSON.stringify(req.body);
    let update_company_query = 'UPDATE "companies"' +
        ' SET "name" = \'' + req.body.name + '\', "logo" = \'' + req.body.logo + '\', "loginGit" = \'' + req.body.loginGit + '\', "loginApple" = \'' + req.body.loginApple + '\',' +
        ' "loginFacebook" = \'' + req.body.loginFacebook + '\',' +
        ' "loginEmail" = \'' + req.body.loginEmail + '\', "primaryLightColor" = \'' + req.body.primaryLightColor + '\', "primaryLightVariantColor" = \'' + req.body.primaryLightVariantColor + '\',' +
        ' "secondaryLightColor" = \'' + req.body.secondaryLightColor + '\',' +
        ' "secondaryLightVariantColor" = \'' + req.body.secondaryLightVariantColor + '\', "primaryDarkColor" = \'' + req.body.primaryDarkColor + '\',' +
        ' "primaryDarkVariantColor" = \'' + req.body.primaryDarkVariantColor + '\',' +
        ' "secondaryDarkColor" = \'' + req.body.secondaryDarkColor + '\', "secondaryDarkVariantColor" = \'' + req.body.secondaryDarkVariantColor + '\',' +
        ' "continuousQualityUrl" = \'' + req.body.continuousQualityUrl + '\', "ciCdUrl" = \'' + req.body.ciCdUrl + '\',' +
        ' "boardKanbanUrl" = \'' + req.body.boardKanbanUrl + '\', "testingUrl" = \'' + req.body.testingUrl + '\',' +
        ' "messagingUrl" = \'' + req.body.messagingUrl + '\' WHERE "companyId" = \'' + req.params.id + '\';';
    let response_text;
    console.log(text);
    
    try {
        const update_company_query_result = await client.query(update_company_query);
        response_text = 'Company updated.';
        res.status(200).json(response_text);
        console.log(JSON.stringify(response_text));
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
});

app.put("/user/updateUser/:id", async (req, res, next) => {
    let text = 'Request: ' + JSON.stringify(req.body);
    let update_user_query = 'UPDATE "users" SET auth = \'' + req.body.auth + '\', email = \'' + req.body.email + '\', companyId = \'' + req.body.companyId + '\', deviceId = \'' + req.body.deviceId + '\' WHERE "userId" = \'' + req.params.id + '\';';
    let response_text;
    console.log(text);
    
    try {
        const update_user_query_result = await client.query(update_user_query);
        response_text = 'User updated.';
        res.status(200).json(response_text);
        console.log(JSON.stringify(response_text));
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
});

app.post("/user/signin", async (req, res, next) => {
    let select_user_query = 'SELECT * from "users" where "email" = \'' + req.body.email + '\' AND "companyId" = \'' + req.body.companyId + '\';';
    let select_auth_query = 'SELECT "auth" from "users" where "email" = \'' + req.body.email + '\';';
    let response_text;
    let select_user_query_result;

    try {
        select_user_query_result = await client.query(select_user_query);
        if (select_user_query_result.rows == 0) {
            response_text = 'Error: Email not registered into this company';
            console.log(response_text);
            res.status(500).json(response_text);
            return;
        } else {
            console.log("Email exists. Proceeding to login.");
        }
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
    
    try {
        const select_auth_query_result = await client.query(select_auth_query);

        if (select_auth_query_result.rows <= 0) {
            response_text = 'Error: No results for query -> ' + select_auth_query;
            res.status(500).json(response_text);
            console.log(response_text);
            return;
        }

        if (select_auth_query_result.rows[0].auth == req.body.auth) {
            response_text = "User authenticated successfully."
            //return the user without password to not expose it
            var userJson = select_user_query_result.rows[0];
            userJson.auth = '*****';
            res.status(200).json(userJson);
            console.log(JSON.stringify(response_text));
        } else {
            response_text = 'Error: Invalid credentials';
            res.status(500).json(response_text);
            console.log(response_text);
        }
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }

});

app.post("/user/signup/:companyId", async (req, res, next) => {
    let select_user_query = 'SELECT * from "users" where "email" = \'' + req.body.email + '\' AND "companyId" = \'' + req.params.companyId + '\';';
    let insert_user_query = 'INSERT INTO "users" ("auth", "email", "companyId", "deviceId", "isAdmin") VALUES (\'' + req.body.auth + '\', \'' + req.body.email + '\', \'' + req.body.companyId + '\', \'' + req.body.deviceId + '\', \'' + req.body.isAdmin + '\');';
    let response_text;

    try {
        const select_user_query_result = await client.query(select_user_query);
        if (select_user_query_result.rows.length > 0) {
            response_text = 'Error: email already taken for this company';
            res.status(500).json(response_text);
            console.log(response_text);
        } else {
            const insert_user_query_result = await client.query(insert_user_query);
            response_text = 'User created successfully';
            res.status(200).json(response_text);
            console.log(insert_user_query_result);
        }
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
});

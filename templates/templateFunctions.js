
function manageHtml({name, id, email, officeNumber}) {
    return `<div class="card" style="max-width: 14rem;">
        <div class="card-header bg-primary text-light">
            <h4>${name}</h4>
            <h5><i class="fa fa-car mr-2"></i>Manager</h5>
        </div>
        <div class="card p-1">
            <ul class="list-group p-2 m-2">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: ${email}</li>
                <li class="list-group-item">Office #: ${officeNumber}</li>
            </ul>
        </div>
    </div>`}

function internHtml({name, id, email, school}) {
    return `<div class="card margin" style="max-width: 14rem;">
        <div class="card-header bg-primary text-light">
            <h4>${name}</h4>
            <h5><i class="fa fa-car mr-2"></i>Intern</h5>
        </div>
        <div class="card p-1">
            <ul class="list-group p-2 m-2">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
        </div>
    </div>
    `
}

function engineerHtml({name, id, email, github}) {
    return `<div class="card" style="max-width: 14rem;">
        <div class="card-header bg-primary text-light">
            <h4>${name}</h4>
            <h5><i class="fa fa-car mr-2"></i>Engineer</h5>
        </div>
        <div class="card p-1">
            <ul class="list-group p-2 m-2">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: ${email}</li>
                <li class="list-group-item">GitHub: ${github}</li>
            </ul>
        </div>
    </div>`
}

function teamHtml(cards) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team Players</title>
    <link  rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <style>
    li {
        font-size: x-small;
    }
    </style>
</head>
<body>
    <div class="container">
        <div class="jumbotron text-center bg-danger text-light">
            <h1>Team Players</h1>
        </div>
        <div class="card-group">
            ${cards} 
            
        </div>
    </div>
</body>
</html>`
}

module.exports = {
    manageHtml: manageHtml,
    internHtml: internHtml,
    teamHtml: teamHtml,
    engineerHtml: engineerHtml
  };
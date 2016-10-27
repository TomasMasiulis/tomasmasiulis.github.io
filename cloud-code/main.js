

Parse.Cloud.afterSave(Parse.User, function(request, response) {
    var user = request.object;
    if (user.existed()) { 

        console.log('User saved, but it was already created before');
        return; 
    }

    var roleName = user.id;
    var companyRole = new Parse.Role(roleName, new Parse.ACL(user));

    return companyRole.save().then(function(companyRole) {

        console.log(roleName + ' saved');

        var acl = new Parse.ACL();
        acl.setReadAccess(companyRole, true);
        acl.setReadAccess(user, true);
        acl.setWriteAccess(user, true);
    });
});
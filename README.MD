Summary: Design a basic Role-based access control system

Details:


Terminology:
User: End user of the system
Role: The role of the User which specifies actions that he is allowed to take
Details:
There are two roles: admin and non-admin
Admin role has all read-write access to all pages
Non-admin roles have restricted access (defined below)
You are required to design a page where a user can be created with any of the above two scopes and viewed
Admin user can create and view all users
Admin user can delete any non-admin user
Non-admin users can only view their OWN profile


Expectations:
Database definition and modelling for the users
A very basic web page to create a user and view users, with restrictions as mentioned in details above (UI does not matter)
Backend API that is able to create users in the Database and view users in the Database
Design should be scalable for multiple roles to the same user/multiple actions allowed for a role
Code pushed on git/bitbucket public repo and shared.
Backend is also able to handle Role-based access control based on the logged-in user roles at the API level
Take care and mandatorily make use of OOPS concepts and other best practices like DRY
Good to have - cache handling
What is not expected:
Code Deployment
Test cases
Any other statement not mentioned in the expectations


Data Model:


USER:
userName
name
DOB
Role_id

ROLE:
roleName

ACCESS:
accessName

ROLEACCESS:
roleName
accessName
![img.png](img.png)
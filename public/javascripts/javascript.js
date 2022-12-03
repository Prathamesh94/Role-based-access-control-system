function deleteUser(email){
    console.log("userdelete",email)

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            location.reload();
        }
    });
    xhr.open("DELETE", "http://localhost:3000/users/"+email);
   // xhr.setRequestHeader("Authorization", "Token "+token);
    xhr.send();
}

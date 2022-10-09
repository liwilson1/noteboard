var Form = (function(){
    var pub = {};
    var noteHtml = ({id, title
        , body}) => `<li><div class="note"><p>Note id: <span id="id">${id}</span></p><p>${title}</p><p>${body}</p>
        <button type="button" class="deleteBtn">Delete</button></div></li>`;
    var deleteApi = ({id}) => `/api/posts/${id}`
    function postNote(){
        var title = $("#title").val()
        var body = $("#body").val()
        console.log(title);
        console.log(body);
        axios.post('/api/posts/', {
            title,
            body

          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    function deleteNote(id){
        var value = $(id.target).siblings()[0]
        var x = $(value).find("span:first-of-type").text();

        axios.delete(deleteApi({"id": x}))
        .then(()=>{
            console.log("Note " + id + " has been deleted")
            window.location = 'index.html';
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    pub.setup = function(){
        axios.get('/api/posts', {})
        .then(function(response){
            response.data.forEach((a)=>{
                var id = a.id;
                var title = a.title;
                var body = a.body;
                $("#notes").append(noteHtml({
                    'id': id, 
                    'title': title,
                    'body':body
                }));
            })
        })
        .catch(function (error){
            console.log(error)
        })
        $("#newNote").submit(postNote);
        $(document).on("click", ".deleteBtn", deleteNote);
    }
    return pub;
}());

$(document).ready(Form.setup)
var Form = (function(){
    var pub = {};
    var noteHtml = ({id, title
        , body}) => `<li><div class="note"><p>Note id: <span id="id">${id}</span></p><p>${title}</p><p>${body}</p>
        <button type="button" class="redBtn deleteBtn">Delete</button><button type="button" class="editBtn">Edit note</button>
        <div class="editPopup" ><p>Edit Note<form class="editNote"><input type="text" value="${title}"><textarea>${body}
        </textarea><button type="button" class="updateBtn">Update</button></form><button class="cancelEditBtn redBtn">Cancel</button></div></div>
        </li>`; 
    var deleteApi = ({id}) => `/api/posts/${id}`
    var updateApi = ({id}) => `/api/posts/${id}`
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
            window.location = 'index.html';
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

    function editNote(event){
        var id = $(event.target).parent().parent().parent().find("#id").text();
        console.log(id)
        var title = $(event.target).parent().find("input[type='text']").val();
        var body = $(event.target).parent().find("textarea").val();
        console.log(title)
        console.log(body)
        
        axios.put(updateApi({"id": id}), {
            title,
            body
        })
        .then(()=>{
            console.log("note"+  id + " has been updated");
            window.location = 'index.html'
        })
        .catch((error)=>{
            console.log(error)
        })
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
        $(document).on("click", "#submit", postNote);
        $(document).on("click", ".deleteBtn", deleteNote);
        $(document).on("click", ".editBtn", (event)=>{
            $(event.target).parent().children().hide()
            $(event.target).parent().find(".editPopup").show()

        })
        $(document).on("click", ".cancelEditBtn", (event)=>{
            console.log($(event.target).parent().parent())
            $(event.target).parent().parent().children().show()
            $(event.target).parent().hide()
        })
        $(document).on("click", ".updateBtn", editNote)
    }
    return pub;
}());

$(document).ready(Form.setup)
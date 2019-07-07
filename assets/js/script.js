$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
})

$("ul").on("click", ".fixed", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    })
    event.stopPropagation();
});


//GET
fetch(`http://localhost:3000/`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach((tarefa) => {

            const containerTodo = document.querySelector('.container-todo')

            const ul = document.createElement('ul');
            const li = document.createElement('li');
            const btn = document.createElement('button');
            const i = document.createElement('i');

            containerTodo.appendChild(ul)
            ul.appendChild(li);
            li.innerHTML = `${tarefa.tarefa}`
            li.appendChild(btn);
            btn.appendChild(i);
            i.classList.add('fa');
            i.classList.add('fa-trash')

            $("ul").on("click", "li", function () {
                $(this).toggleClass("completed");
            })

            btn.setAttribute('data-id', tarefa._id);
            btn.addEventListener('click', () => {
                console.log('clicou')
                fetch(`http://localhost:3000/${tarefa._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                    .then(() => {
                        ul.removeChild(li);
                    })

                    .catch(function (erro) {
                        console.log(erro);
                    })

            })
        })
    })
    .catch(function (erro) {
        console.log(erro);
    })


//POST

$("#tarefa").keydown(function (event) {

    if (event.which === 13) {
        const tarefa = event.target.value;
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Accept': 'applicarion/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                'tarefa': tarefa
            })
        })
        $(this).val("")
        location.reload();
    }
})


$(".btn-input").click(function () {
    let textInput = $("input[type='text']").val()

    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Accept': 'applicarion/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            'tarefa': textInput
        }) 
    })

    let previous = this.previousElementSibling;
    previous.value = "";
    location.reload()
})




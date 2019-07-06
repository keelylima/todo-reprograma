$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
})

$("ul").on("click", "button", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    })
    event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        let todoText = $(this).val();
        $(this).val(""); //clear input
        $("ul").append(`<li><button><i class="fa fa-trash"></i></button> ${todoText}</li>`)
    }
});

$(".btn-input").click(function() {
    let todoTextClick = $("#tarefa").val();
    $("ul").append(`<li><button><i class="fa fa-trash"></i></button> ${todoTextClick}</li>`);
})


//GET
fetch(`http://localhost:3000/`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach((tarefa) => {
            const ul = document.querySelector('ul');
            const li = document.createElement('li');
            const btn = document.createElement('button');
            const i = document.createElement('i');

            li.innerHTML = `${tarefa.tarefa}`
            li.appendChild(btn);
            btn.appendChild(i);
            i.classList.add('fa');
            i.classList.add('fa-trash');
            ul.appendChild(li);

            btn.setAttribute('data-id', tarefa._id);
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                fetch(`http://localhost:3000/${tarefa._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                .then(() => {
                    li.remove();
                })
            })
        })
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
    }
})


$(".btn-input").click(function() {
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
})




$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
})

$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    })
    event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        let todoText = $(this).val();
        $(this).val(""); //clear input
        $("ul").append(`<li><span><i class="fa fa-trash"></i></span> ${todoText}</li>`)
    }
});

$(".fa-plus").click(function () {
    $("input[type='text']").fadeToggle();
});


//GET
const li = document.querySelectorAll('li');

fetch(`http://localhost:3000/`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach((tarefa) => {
            const ul = document.querySelector('ul');
            const li = document.createElement('li');

            li.innerHTML = `<span><i class="fa fa-trash"></i></span> ${tarefa.tarefa}`
            ul.appendChild(li);


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


const botao = document.querySelector('.enviar');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const form = document.getElementById('form');
const checkbox = document.getElementsByName('motivo');
const radio = document.getElementsByName('sexo');
const botaoReset = document.querySelector('.resetar');
const mostrar = document.querySelector('#dados');

botao.addEventListener('click', (e) => {
    console.log('atualizei no githubpages');

    e.preventDefault();

    if(!verificaNome(inputNome)) return false;
    if(!verificaEmail(inputEmail)) return false;
    if(!verificaRadio(radio)) return false;
    if(!verificaCheckbox(checkbox)) return false;

    mostrarDados();

    const limparForm = document.querySelector('.limpar-form');
    limparForm.addEventListener('click', (e) => {
        e.preventDefault();
        mostrar.style.display = 'none';
        limparInputs();
        liberarInputs();
    });

    const alterarForm = document.querySelector('.alterar-form');
    alterarForm.addEventListener('click', (e) => {
        e.preventDefault();
        mostrar.style.display = 'none';
        liberarInputs();
    })

    const confirmarForm = document.querySelector('.confirmar-form');
    confirmarForm.addEventListener('click', (e) => {
        e.preventDefault();
        if(!verificaNome(inputNome)) return false;
        if(!verificaEmail(inputEmail)) return false;
        if(!verificaRadio(radio)) return false;
        if(!verificaCheckbox(checkbox)) return false;
        form.submit();
    });


});

botaoReset.addEventListener('click', () => {
    mostrar.style.display = 'none';
})

function verificaNome(inputNome) {
    const nome = inputNome.value;
    const nomeSplited = nome.split(' ');
    if (nomeSplited.length < 2 || nomeSplited[1].length === 0) {
        alterarElementoErro(inputNome, 'Escreva seu nome e sobrenome');
        return false;
    }
    alterarElementoOk(inputNome);
    return true;
}

function verificaEmail(inputEmail) {
    const email = inputEmail.value;
    const emailSplited = email.split('@');
    if (emailSplited.length < 2 || (!emailSplited[1].includes('.com'))) {
        alterarElementoErro(inputEmail, `Email precisa conter @ e .com`);
        return false;
    }
    alterarElementoOk(inputEmail);
    return true;
}

function alterarElementoErro(input, msg) {
    input.style.border = '2px solid red';
    input.style.boxShadow = '0 0 2px 2px red';
    input.nextElementSibling.innerHTML = msg;
}

function alterarElementoOk(input) {
    input.style.border = '';
    input.style.boxShadow = '';
    input.nextElementSibling.innerHTML = '';
}

function verificaRadio(radio){
    let verificacao = false;
    radio.forEach( (item) => {
        if(item.checked) verificacao = true;
    });

    if(!verificacao){
        alterarElementoErroFieldset(radio, 'Informe o seu genero');
        return verificacao;
    }

    alterarElementoOkFieldset(radio);
    return verificacao;
}

function verificaCheckbox(checkbox) {
    let verificacao = false;
    checkbox.forEach((check) => {
        if (check.checked) {
            verificacao = true;
        }
    });

    if (!verificacao) {
        alterarElementoErroFieldset(checkbox, 'Informe um motivo de contato');
        return verificacao
    }

    alterarElementoOkFieldset(checkbox);
    return verificacao;
}

function alterarElementoErroFieldset(check, msg) {
    const fieldset = check[0].parentNode;
    fieldset.style.border = '1px solid red';
    fieldset.style.color = 'red';
    const span = fieldset.nextElementSibling;
    span.innerHTML = msg;
}

function alterarElementoOkFieldset(check) {
    const fieldset = check[0].parentNode;
    fieldset.style.border = '';
    fieldset.style.color = '';
    const span = fieldset.nextElementSibling;
    span.innerHTML = '';
}

function mostrarDados() {
    mostrar.style.display = 'block'
    mostrar.innerHTML = `<p>nome: ${inputNome.value}</p>`;
    inputNome.disabled= true;
    mostrar.innerHTML += `<p>email: ${inputEmail.value}</p>`;
    inputEmail.disabled = true;

    let sexoInformado = false;
    radio.forEach((item) => {
        item.disabled = true;
        if (item.checked) {
            if (item.id === 'outro') {
                const labelOutro = item.nextElementSibling
                const inputOutro = labelOutro.nextElementSibling
                if (inputOutro.value) {
                    mostrar.innerHTML += `<p>genero: ${inputOutro.value}</p>`;
                    sexoInformado = true;
                }
            } else {
                mostrar.innerHTML += `<p>genero: ${item.id}</p>`;
                sexoInformado = true;
            }
        }
    });
    if(!sexoInformado) mostrar.innerHTML += `<p>genero: não informado</p>`;
    
    checkbox.forEach( (item) => {
        item.disabled = true;
        if(item.checked) mostrar.innerHTML += `<p>motivo do contato: ${item.id}</p>`;
    });

    botao.style.display = 'none';
    botaoReset.style.display = 'none';
    
    
    const divBotoes = document.createElement('div');
    divBotoes.classList.add('div-botoes');
    divBotoes.appendChild( criaBotao('limpar', 'limpar-form') );
    divBotoes.appendChild( criaBotao('alterar', 'alterar-form') );
    divBotoes.appendChild( criaBotao('enviar', 'confirmar-form') );

    mostrar.appendChild(divBotoes);

}

function criaBotao(name, className){
    const botao = document.createElement('button');
    botao.classList.add('botoes');
    botao.classList.add(className);
    botao.innerHTML = name;
    return botao;
}

function liberarInputs(){
    inputNome.disabled = false;
    inputEmail.disabled = false;
    radio.forEach( (item) => {
        item.disabled = false;
    } );
    checkbox.forEach( (item) => {
        item.disabled = false;
    } );
    botao.style.display = 'inline-block';
    botaoReset.style.display = 'inline-block';
}

function limparInputs(){
    inputNome.value = '';
    inputEmail.value = '';
    radio.forEach( (item) => {
        item.checked = false;
    } );
    checkbox.forEach( (item) => {
        item.checked = false;
    } )
}
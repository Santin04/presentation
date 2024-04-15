//selecionando os elementos html que vão ser alterados
const content_text_top = document.querySelector("#content_text_top");
const image_graphic_center = document.querySelector("#image_graphic_center");
const content_text_button = document.querySelector("#content_text_button");
const image_graphic_buttom = document.querySelector("#image_graphic_buttom");

//criando as listas dos elementos que vão se alterar
const texts_top = [
    'Projeto 01',
    'Projeto 02',
    'Projeto 03',
    'Projeto 04',
];

const texts_buttom = [
    'Texto do projeto 01',
    'Texto do projeto 02',
    'Texto do projeto 03',
    'Texto do projeto 04',
];

const images_center = [
    'images/teste01.png',
    '',
    'images/teste01.png',
    '',
];

const images_buttom = [
    'images/teste02.png',
    '',
    'images/teste02.png',
    '',
];

let indice = 0;

//função que troca os conteudo dos elementos
function edit_items() {
    content_text_top.innerText = texts_top[indice];
    content_text_button.innerText = texts_buttom[indice];
    image_graphic_center.src = images_center[indice];
    image_graphic_buttom.src = images_buttom[indice];

    indice = (indice + 1) % texts_top.length;
}

//chamando a função pela primeira vez
edit_items();

//chamando a função toda vez que passar o intervalo, para deixar dinamico o conteudo
setInterval(edit_items, 2000);
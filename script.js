import { Components, SimpleScene, SimpleRenderer, OrthoPerspectiveCamera, FragmentIfcLoader } from "openbim-components";

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
    'images/teste01.png',
    'images/teste01.png',
    'images/teste01.png',
];

const images_buttom = [
    'images/teste02.png',
    'images/teste02.png',
    'images/teste02.png',
    'images/teste02.png',
];

const arquivo_ifc = [
    'files/file01.ifc',
    'files/file02.ifc',
    'files/file03.ifc',
    'files/file04.ifc',
]

//função que limpa a div viewer
function limpar_viewer(){
    const viewerContainer = document.querySelector("#viewer_container")
    viewerContainer.innerHTML = ``
}

//função que exibe os arquivos ifc
async function exibir_ifc(numero){
    limpar_viewer()
    const viewer = new Components()

    const sceneComponent = new SimpleScene(viewer)
    sceneComponent.setup()
    viewer.scene = sceneComponent
    const scene = sceneComponent.get()
    scene.background = null

    const viewerContainer = document.querySelector("#viewer_container")
    const rendererComponent = new SimpleRenderer(viewer, viewerContainer)
    viewer.renderer = rendererComponent

    const cameraComponent = new OrthoPerspectiveCamera(viewer)
    viewer.camera = cameraComponent

    viewer.init()
    cameraComponent.updateAspect()

    const ifcLoader = new FragmentIfcLoader(viewer)
    ifcLoader.settings.wasm = {
        path: "https://unpkg.com/web-ifc@0.0.43/",
        absolute: true,
    }

    const arquivo = await fetch(arquivo_ifc[numero])
    const data = await arquivo.arrayBuffer()
    const buffer = new Uint8Array(data)
    const model = await ifcLoader.load(buffer, "example")
    scene.add(model)

    animate(model)
}

let indice = 0;

//função que troca os conteudo dos elementos
function edit_items() {
    content_text_top.innerText = texts_top[indice];
    content_text_button.innerText = texts_buttom[indice];
    image_graphic_center.src = images_center[indice];
    image_graphic_buttom.src = images_buttom[indice];

    exibir_ifc(indice)

    indice = (indice + 1) % texts_top.length;
}

function animate(model) {
    requestAnimationFrame(() => animate(model));
    model.rotation.y += 0.005;
    viewer.renderer.render(viewer.scene, viewer.camera);
}

//chamando a função pela primeira vez
edit_items();

//chamando a função toda vez que passar o intervalo, para deixar dinamico o conteudo
setInterval(edit_items, 10000);